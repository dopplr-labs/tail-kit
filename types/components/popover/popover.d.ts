import React from 'react'
declare type OnVisibilityChange = (visible: boolean) => void
export declare enum PopoverTriggerEvent {
  click = 'CLICK',
  hover = 'HOVER',
}
export declare type PopoverProps = {
  /** Title shown in the popover */
  title?: React.ReactNode
  /** Content of the popover */
  content: React.ReactNode
  /**
   * The default placement of the tooltip. If the default placement cannot be
   * used because of constraints, the tooltip placement would be computed automatically.
   * It can be one of `topLeft`, `top`, `topRight`, `left`, `right`, `bottomLeft`, `bottom` and `bottomRight`
   */
  placement?: string
  /**
   * The delay in closing the tooltip on mouse leave.
   * A delay is added so that the user can move over the tooltip content before being closed.
   * If the delay is set to 0, it would close as soon as the mouse leaves, but the user
   * cannot select the content present inside tooltip.
   */
  closeDelay?: number
  /**
   * Whether the popover is visible or not. If visible, it set the Popover component
   * would be a controlled component, and the visibility state can be updated using
   * `onVisiblityChange` prop.
   */
  visible?: boolean
  /** Handler function called when the visibility state is updated */
  onVisibilityChange?: OnVisibilityChange
  /**
   * Event triggering the visiblity of popover. Whether is should be visible on hover or click
   */
  triggerEvent?: PopoverTriggerEvent
  /** parent of the portal container */
  portalParent?: HTMLElement
  /** Content for which the tooltip is to be shown */
  children: React.ReactElement
}
/**
 * Component for rendering *floating card* popped by hovering.
 *
 * ### When To Use
 * * A simple popup menu to provide extra information or operations.
 * * Comparing with Tooltip, besides information Popover card can also provide action elements like links and buttons.
 */
export declare function Popover({
  title,
  content,
  placement,
  closeDelay,
  visible,
  onVisibilityChange,
  triggerEvent,
  children,
  portalParent,
}: PopoverProps): JSX.Element
export declare namespace Popover {
  var PopoverTriggerEvent: typeof import('./popover').PopoverTriggerEvent
}
export {}
