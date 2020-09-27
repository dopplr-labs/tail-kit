import { useEffect, useMemo, useRef } from 'react'

const containerIds: string[] = []

type ContainerRef = React.RefObject<HTMLElement | null>

type HookProps = {
  /**
   * Array of containers to be whitelisted. If any click event is triggered outside these containers,
   * then the handler owuld be called
   */
  containers: ContainerRef[]
  /** Whether to listen for outside click or not */
  active: boolean
  /** Handler function called on outside click */
  onClick: (event: MouseEvent) => void
}

/**
 * Hook for handling click outside a parent container.
 * This hooks is useful while building elements like select and modal
 * where we need to close them on clicking outside the parent element.
 *
 * This poses an interesting challenge while nesting components that want to change their
 * state on outside click. For example, what would happen
 * when a select menu is present inside a modal. When the user clicks on outside,
 * we should close the select menu, rather than the modal. As the menu is *top most*
 * element present. So we need to maintain some kind of order, to save the top element
 * and the outside click handler should only call the handler for it.
 *
 * To do it
 * 1. we generate a containerId for each of the outside click handler hoook
 * 2. if the hook is active we push the containerId to the list of container ids, and remove on deactive
 * 3. when a click is triggered, we check if the containerId for a hook correspond to the top containerId
 * 4. if step 3 is correct, then check if the element is triggered out the list of containers passed
 * 5. if step 4 is incorrect, then call the outside click handler
 *
 * NOTE: Right now, we are starting with the assumption that the element rendered last would
 * be the top most element, which helds true for all the edge cases (atleast for now).
 */
export function useOutsideClick(
  { containers, active, onClick }: HookProps,
  /**
   * array of container ids
   * by default it points to a global array, which need to be passed everytime,
   * this explict passing is done to make the hook testable
   */
  elements: string[] = containerIds,
) {
  // generate a random container id
  const containerId = useMemo(() => Math.random().toString(36).substring(7), [])

  const callback = useRef<(event: MouseEvent) => void>()
  callback.current = onClick

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      function elementInsideContainer(element: Node, container: ContainerRef) {
        if (
          container.current &&
          (container.current === element || container.current.contains(element))
        ) {
          return true
        }
        return false
      }

      if (
        // check if the current element is the top most element
        containerId === elements[0] &&
        !containers.some((container) =>
          elementInsideContainer(event.target as Node, container),
        )
      ) {
        callback.current?.(event)
      }
    }

    if (active) {
      elements.unshift(containerId)
      window.addEventListener('mousedown', handleClick)
    }

    return () => {
      if (active) {
        elements.shift()
        window.removeEventListener('mousedown', handleClick)
      }
    }
  }, [containers, active, elements, containerId])
}
