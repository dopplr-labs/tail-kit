import React from 'react'
import { HorizontalPlacement, VerticalPlacement } from './utils'
declare type PortalProps = {
  triggerRef: React.RefObject<HTMLElement | null>
  visible: boolean
  children: React.ReactElement
  verticalPlacement?: VerticalPlacement
  horizontalPlacement?: HorizontalPlacement
  /** parent of the portal container rendering the menu */
  portalParent?: HTMLElement
}
export declare function Portal({
  triggerRef,
  visible,
  children,
  verticalPlacement,
  horizontalPlacement,
  portalParent,
}: PortalProps): JSX.Element
export {}
