import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import Portal from 'components/portal'
import { HorizontalPlacement, VerticalPlacement } from 'utils/portal'

const PopoverPlacements: {
  [key: string]: [VerticalPlacement, HorizontalPlacement]
} = {
  topLeft: [VerticalPlacement.top, HorizontalPlacement.leftAlign],
  top: [VerticalPlacement.top, HorizontalPlacement.center],
  topRight: [VerticalPlacement.top, HorizontalPlacement.rightAlign],
  left: [VerticalPlacement.center, HorizontalPlacement.left],
  right: [VerticalPlacement.center, HorizontalPlacement.right],
  bottomLeft: [VerticalPlacement.bottom, HorizontalPlacement.leftAlign],
  bottom: [VerticalPlacement.bottom, HorizontalPlacement.center],
  bottomRight: [VerticalPlacement.bottom, HorizontalPlacement.rightAlign],
}

type OnVisibilityChange = (visible: boolean) => void

export type PopoverProps = {
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
  tooltipCloseDelay?: number
  /**
   * Whether the popover is visible or not. If visible, it set the Popover component
   * would be a controlled component, and the visibility state can be updated using
   * `onVisiblityChange` prop.
   */
  visible?: boolean
  /** Handler function called when the visibility state is updated */
  onVisibilityChange?: OnVisibilityChange
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
export function Popover({
  title,
  content,
  placement = 'top',
  tooltipCloseDelay = 100,
  visible,
  onVisibilityChange,
  children,
  portalParent,
}: PopoverProps) {
  const isControlledComponent = typeof visible !== 'undefined'

  const [popoverVisible, setPopoverVisible] = useState(false)
  const onVisibilityChangeRef = useRef<OnVisibilityChange | undefined>(
    undefined,
  )
  onVisibilityChangeRef.current = isControlledComponent
    ? onVisibilityChange
    : setPopoverVisible

  const isVisible = (isControlledComponent
    ? visible
    : popoverVisible) as boolean

  const timeout = useRef<number | undefined>()

  function handleMouseEnter() {
    if (timeout.current) {
      clearTimeout(timeout.current)
      timeout.current = undefined
    }
    onVisibilityChangeRef.current?.(true)
  }

  function handleMouseLeave() {
    // @ts-ignore
    timeout.current = setTimeout(() => {
      onVisibilityChangeRef.current?.(false)
    }, tooltipCloseDelay)
  }

  const trigger = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <div
        ref={trigger}
        className="inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      <Portal
        triggerRef={trigger}
        visible={isVisible}
        allowedPlacements={[
          [VerticalPlacement.top, HorizontalPlacement.leftAlign],
          [VerticalPlacement.top, HorizontalPlacement.center],
          [VerticalPlacement.top, HorizontalPlacement.rightAlign],

          [VerticalPlacement.center, HorizontalPlacement.right],
          [VerticalPlacement.center, HorizontalPlacement.left],

          [VerticalPlacement.bottom, HorizontalPlacement.leftAlign],
          [VerticalPlacement.bottom, HorizontalPlacement.center],
          [VerticalPlacement.bottom, HorizontalPlacement.rightAlign],
        ]}
        defaultPlacement={PopoverPlacements[placement]}
        portalParent={portalParent}
      >
        {({ containerPlacement }) => {
          const [verticalPlacement, horizontalPlacement] = containerPlacement
          return (
            <div className="relative rounded-md shadow">
              <div
                className={clsx(
                  'absolute w-3 h-3 transform rotate-45 shadow rounded-sm bg-white',
                  verticalPlacement === VerticalPlacement.center
                    ? 'top-1/2 -translate-y-1/2'
                    : verticalPlacement === VerticalPlacement.top
                    ? 'bottom-0 translate-y-1/2 mb-px'
                    : verticalPlacement === VerticalPlacement.bottom
                    ? 'top-0 -translate-y-1/2 mt-px'
                    : undefined,
                  horizontalPlacement === HorizontalPlacement.left
                    ? 'right-0 translate-x-1/2 mr-px'
                    : horizontalPlacement === HorizontalPlacement.right
                    ? 'left-0 -translate-x-1/2 ml-px'
                    : horizontalPlacement === HorizontalPlacement.leftAlign
                    ? 'left-0 ml-4'
                    : horizontalPlacement === HorizontalPlacement.rightAlign
                    ? 'right-0 mr-4'
                    : horizontalPlacement === HorizontalPlacement.center
                    ? 'left-1/2 -translate-x-1/2'
                    : undefined,
                )}
              />
              <div
                className={clsx(
                  'relative z-10 inline-flex items-center rounded-md font-medium bg-white text-gray-800',
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {title ? (
                  <div className="px-4 py-3 border-b">{title}</div>
                ) : null}
                <div className="px-4 py-3">{content}</div>
              </div>
            </div>
          )
        }}
      </Portal>
    </>
  )
}
