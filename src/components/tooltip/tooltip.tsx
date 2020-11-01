import clsx from 'clsx'
import Portal from 'components/portal'
import React, { useRef, useState } from 'react'
import { HorizontalPlacement, VerticalPlacement } from 'utils/portal'

const TooltipPlacements: {
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

export type TooltipProps = {
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
export function Tooltip({
  title,
  icon,
  placement = 'right',
  inverted = true,
  tooltipCloseDelay = 100,
  pointingArrow = true,
  children,
}: TooltipProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false)

  const timeout = useRef<number | undefined>()

  function handleMouseEnter() {
    if (timeout.current) {
      clearTimeout(timeout.current)
      timeout.current = undefined
    }
    setTooltipVisible(true)
  }

  function handleMouseLeave(delay = tooltipCloseDelay) {
    return function () {
      // @ts-ignore
      timeout.current = setTimeout(() => {
        setTooltipVisible(false)
      }, delay)
    }
  }

  const trigger = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <div
        ref={trigger}
        className="inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave()}
      >
        {children}
      </div>
      <Portal
        triggerRef={trigger}
        visible={tooltipVisible}
        allowedPlacements={[
          [VerticalPlacement.top, HorizontalPlacement.leftAlign],
          [VerticalPlacement.top, HorizontalPlacement.center],
          [VerticalPlacement.top, HorizontalPlacement.rightAlign],

          [VerticalPlacement.center, HorizontalPlacement.left],
          [VerticalPlacement.center, HorizontalPlacement.right],

          [VerticalPlacement.bottom, HorizontalPlacement.leftAlign],
          [VerticalPlacement.bottom, HorizontalPlacement.center],
          [VerticalPlacement.bottom, HorizontalPlacement.rightAlign],
        ]}
        defaultPlacement={TooltipPlacements[placement]}
      >
        {({ containerPlacement }) => {
          const [verticalPlacement, horizontalPlacement] = containerPlacement
          return (
            <div className="relative rounded-md shadow">
              {pointingArrow ? (
                <div
                  className={clsx(
                    'absolute w-2 h-2 transform rotate-45 shadow rounded-sm',
                    inverted ? 'bg-gray-700' : 'bg-white',
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
              ) : null}
              <div
                className={clsx(
                  'relative z-10 inline-flex items-center px-4 py-2 space-x-3 text-sm rounded-md',
                  inverted
                    ? 'text-white bg-gray-700 '
                    : 'bg-white text-gray-800',
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave(0)}
              >
                {icon}
                <span>{title}</span>
              </div>
            </div>
          )
        }}
      </Portal>
    </>
  )
}

Tooltip.Placements = TooltipPlacements
