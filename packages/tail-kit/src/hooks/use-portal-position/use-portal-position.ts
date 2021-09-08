import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  getPlacement,
  getTopPosition,
  getLeftPosition,
  HorizontalPlacement,
  VerticalPlacement,
  Placement,
} from '../../utils/portal'

export enum ContentVisibility {
  HIDDEN = 'HIDDEN',
  INVISIBLE = 'INVISIBLE',
  SHOWN = 'SHOWN',
}

type ContentContainerPosition = {
  top: number
  left: number
  placement: [VerticalPlacement, HorizontalPlacement]
}

type UsePortalProps = {
  /** Visibility of the portal content */
  visible: boolean
  /**
   * Ref of the trigger element. The content container would render
   * according the placement of the trigger
   * */
  trigger: React.RefObject<HTMLElement | null>
  /**
   * Ref of the content container. The content container would be rendered
   * according to the position of the trigger.
   */
  contentContainer: React.RefObject<HTMLElement | null>
  defaultPlacement: Placement
  allowedPlacements: Placement[]
  offsetHorizontal?: number
  offsetVertical?: number
}

/**
 * Hook for computing the portal position.
 *
 * Portals are primarily used to render floating components like
 * select, dropdown, etc. In that case, the content for the portal should
 * be rendered in accordance to the position of the trigger component.
 */
export function usePortalPosition({
  visible,
  trigger,
  contentContainer,
  defaultPlacement,
  allowedPlacements,
  offsetHorizontal = 12,
  offsetVertical = 12,
}: UsePortalProps): {
  contentVisibility: ContentVisibility
  contentStyle: React.CSSProperties
  containerPlacement?: [VerticalPlacement, HorizontalPlacement]
  contentContainerPosition?: ContentContainerPosition
  setContentContainerPosition: React.Dispatch<
    React.SetStateAction<ContentContainerPosition | undefined>
  >
} {
  /**
   * Before showing the children, we need to find the size of trigger and children content
   * to compute the placement automatically.
   *
   * To do this
   * 1. First render the content with visiblity: hidden
   *    (https://codesandbox.io/s/goofy-torvalds-15wuc?file=/src/App.tsx to see why
   *    used visiblity hidden instead of display none)
   * 2. Get the children content BCR and trigger BCR
   * 3. Compute the placement depending on trigger BCR and content BCR
   * 4. Set the placement and render the content
   *
   * State
   * contentVisibility = 'HIDDEN' | 'INVISIBLE' | 'SHOWN'
   * HIDDEN -> won't render the content
   * INVISIBLE -> render content with visiblity: hidden
   * SHOWN -> render content at correct position
   */

  const [contentVisibility, setContentVisibility] = useState<ContentVisibility>(
    ContentVisibility.HIDDEN,
  )

  const [contentContainerPosition, setContentContainerPosition] = useState<
    ContentContainerPosition | undefined
  >(undefined)

  useLayoutEffect(() => {
    if (visible) {
      setContentVisibility(ContentVisibility.INVISIBLE)
    } else {
      setContentVisibility(ContentVisibility.HIDDEN)
    }
  }, [visible])

  useEffect(() => {
    function setPortalPosition() {
      const contentContainerBCR = contentContainer.current?.getBoundingClientRect()
      const triggerBCR = trigger.current?.getBoundingClientRect()
      if (contentContainerBCR && triggerBCR) {
        const placement = getPlacement({
          triggerBCR,
          contentContainerBCR,
          allowedPlacements,
          defaultPlacement,
          offsetHorizontal,
          offsetVertical,
        })
        const [verticalPlacement, horizontalPlacement] = placement
        const top = getTopPosition({
          triggerBCR,
          contentContainerBCR,
          verticalPlacement,
          offsetVertical,
        })
        const left = getLeftPosition({
          triggerBCR,
          contentContainerBCR,
          horizontalPlacement,
          offsetHorizontal,
        })
        setContentVisibility(ContentVisibility.SHOWN)
        setContentContainerPosition({
          top:
            top +
            // take scrollY position into consideration as the BCR is with respect to viewport
            window.scrollY,
          left:
            left +
            // take scrollX position into consideration as the BCR is with respecdt to viewport
            window.scrollX,
          placement,
        })
      }
    }

    if (contentVisibility === ContentVisibility.INVISIBLE) {
      setPortalPosition()
    }

    if (contentVisibility === ContentVisibility.SHOWN) {
      window.addEventListener('resize', setPortalPosition)
    }

    return () => {
      window.removeEventListener('resize', setPortalPosition)
    }
  }, [
    contentVisibility,
    contentContainer,
    trigger,
    offsetHorizontal,
    offsetVertical,
    allowedPlacements,
    defaultPlacement,
  ])

  return {
    contentVisibility,
    contentStyle:
      contentVisibility === ContentVisibility.INVISIBLE
        ? {
            visibility: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'inline-block',
          }
        : {
            top: contentContainerPosition?.top ?? 0,
            left: contentContainerPosition?.left ?? 0,
            position: 'absolute',
            zIndex: 20,
          },
    containerPlacement: contentContainerPosition?.placement,
    contentContainerPosition,
    setContentContainerPosition,
  }
}
