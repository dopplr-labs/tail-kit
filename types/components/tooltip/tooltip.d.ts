import React from 'react'
import { HorizontalPlacement, VerticalPlacement } from 'utils/portal'
declare const TooltipPlacements: {
  [key: string]: [VerticalPlacement, HorizontalPlacement]
}
export declare type TooltipProps = {
  /** Title shown in the tooltip */
  title: React.ReactNode
  /** Title shown in the tooltip  */
  icon?: JSX.Element
  /**
   * The default placement of the tooltip. If the default placement cannot be
   * used because of constraints, the tooltip placement would be computed automatically.
   */
  placement?: keyof typeof TooltipPlacements
  /** Tooltip theme. When inverted, the tooltip contnt would be shown in dark background */
  inverted?: boolean
  /**
   * The delay in closing the tooltip on mouse leave.
   * A delay is added so that the user can move over the tooltip content before being closed.
   * If the delay is set to 0, it would close as soon as the mouse leaves, but the user
   * cannot select the content present inside tooltip.
   */
  tooltipCloseDelay?: number
  /** Whether a arrow pointing towards the trigger would be shown or not  */
  pointingArrow?: boolean
  /** Content for which the tooltip is to be shown */
  children: React.ReactElement
}
/**
 * Component to show **tooltip**.
 *
 * ### When To Use
 *
 * * The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.
 * * To provide an explanation of a button/text/operation. It's often used instead of the html title attribute.
 */
export declare function Tooltip({
  title,
  icon,
  placement,
  inverted,
  tooltipCloseDelay,
  pointingArrow,
  children,
}: TooltipProps): JSX.Element
export declare namespace Tooltip {
  var Placements: {
    [key: string]: [VerticalPlacement, HorizontalPlacement]
  }
}
export {}
