import { useEffect, useRef } from 'react'

type ContainerRef = React.RefObject<HTMLElement | null>

const containerElements: ContainerRef[] = []

type HookProps = {
  container: ContainerRef
  whitelistContainers?: ContainerRef[]
  activate: boolean
  onClick: (event: MouseEvent) => void
}

/**
 * Hook for handling click outside a parent container.
 * This hooks is useful while building elements like select and modal
 * where we need to close them on clicking outside the parent element.
 *
 * There are some edge cases we need to handle, like what would happen
 * when a select menu is present inside a modal. When a user clicks on outside,
 * we should close the select menu, rather than the modal. As the menu is *top most*
 * element present. So we need to maintain some kind of order, to save the top element
 * and the outside click handler should only call the handler for it
 *
 * Right now, we are starting with the assumption that the element rendered last would
 * be the top most element, which helds true for all the edge cases (atleat for now).
 */
export function useOutsideClick(
  { container, whitelistContainers, activate, onClick }: HookProps,
  elements: ContainerRef[] = containerElements,
) {
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
        container === elements[0] &&
        ![container, ...(whitelistContainers ?? [])].some((container) =>
          elementInsideContainer(event.target as Node, container),
        )
      ) {
        callback.current?.(event)
      }
    }

    if (activate) {
      elements.unshift(container)
      window.addEventListener('mousedown', handleClick)
    }

    return () => {
      if (activate) {
        elements.shift()
        window.removeEventListener('mousedown', handleClick)
      }
    }
  }, [container, whitelistContainers, activate, elements])
}
