import React from 'react'
import { HorizontalPlacement, VerticalPlacement } from 'utils/portal'
export declare enum ContentVisibility {
  HIDDEN = 'HIDDEN',
  INVISIBLE = 'INVISIBLE',
  SHOWN = 'SHOWN',
}
declare type ContentContainerPosition = {
  top: number
  left: number
  placement: [VerticalPlacement, HorizontalPlacement]
}
declare type UsePortalProps = {
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
  /** Default vertical placement. If provided, the portal won't calculate the vertical position */
  verticalPlacement?: VerticalPlacement
  /** parent of the portal container rendering the menu */
  horizontalPlacement?: HorizontalPlacement
}
/**
 * Hook for computing the portal position.
 *
 * Portals are primarily used to render floating components like
 * select, dropdown, etc. In that case, the content for the portal should
 * be rendered in accordance to the position of the trigger component.
 */
export declare function usePortalPosition({
  visible,
  trigger,
  contentContainer,
  verticalPlacement,
  horizontalPlacement,
}: UsePortalProps): {
  contentVisibility: ContentVisibility
  contentStyle: React.CSSProperties
  containerPlacement?: [VerticalPlacement, HorizontalPlacement]
  contentContainerPosition?: ContentContainerPosition
  setContentContainerPosition: React.Dispatch<
    React.SetStateAction<ContentContainerPosition | undefined>
  >
}
export {}
