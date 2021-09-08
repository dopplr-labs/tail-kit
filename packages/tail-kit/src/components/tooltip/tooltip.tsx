import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import { HorizontalPlacement, VerticalPlacement } from '../../utils/portal'
import Portal from '../portal'

const TooltipPlacements: {
  [key: string]: [VerticalPlacement, HorizontalPlacement]
} = {
  topLeft: ['top', 'leftAlign'],
  top: ['top', 'center'],
  topRight: ['top', 'rightAlign'],
  left: ['center', 'left'],
  right: ['center', 'right'],
  bottomLeft: ['bottom', 'leftAlign'],
  bottom: ['bottom', 'center'],
  bottomRight: ['bottom', 'rightAlign'],
}

export type TooltipProps = {
  /** Title shown in the tooltip */
  title: React.ReactNode
  /** Title shown in the tooltip  */
  icon?: JSX.Element
  /**
   * The default placement of the tooltip. If the default placement cannot be
   * used because of constraints, the tooltip placement would be computed automatically.
   * It can be one of `topLeft`, `top`, `topRight`, `left`, `right`, `bottomLeft`, `bottom` and `bottomRight`
   */
  placement?: string
  /** Tooltip theme. When inverted, the tooltip content would be shown in dark background */
  inverted?: boolean
  /**
   * The delay in closing the tooltip on mouse leave.
   * A delay is added so that the user can move over the tooltip content before being closed.
   * If the delay is set to 0, it would close as soon as the mouse leaves, but the user
   * cannot select the content present inside tooltip.
   */
  tooltipCloseDelay?: number
  /** Whether a arrow pointing towards the trigger would be shown or not  */
  hideArrow?: boolean
  /** Content for which the tooltip is to be shown */
  children: React.ReactElement
  /** parent of the portal container */
  portalParent?: HTMLElement
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
  inverted = false,
  tooltipCloseDelay = 100,
  hideArrow = false,
  children,
  portalParent = typeof window !== 'undefined' ? document.body : undefined,
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

  function handleMouseLeave() {
    // @ts-ignore
    timeout.current = setTimeout(() => {
      setTooltipVisible(false)
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
        visible={tooltipVisible}
        allowedPlacements={[
          ['top', 'leftAlign'],
          ['top', 'center'],
          ['top', 'rightAlign'],

          ['center', 'left'],
          ['center', 'right'],

          ['bottom', 'leftAlign'],
          ['bottom', 'center'],
          ['bottom', 'rightAlign'],
        ]}
        defaultPlacement={TooltipPlacements[placement]}
        portalParent={portalParent}
      >
        {({ containerPlacement }) => {
          const [verticalPlacement, horizontalPlacement] = containerPlacement
          return (
            <div className="relative rounded-md shadow">
              {!hideArrow ? (
                <div
                  className={clsx(
                    'absolute w-2 h-2 transform rotate-45 shadow rounded-sm',
                    inverted ? 'bg-gray-700' : 'bg-white',
                    verticalPlacement === 'center'
                      ? 'top-1/2 -translate-y-1/2'
                      : verticalPlacement === 'top'
                      ? 'bottom-0 translate-y-1/2 mb-px'
                      : verticalPlacement === 'bottom'
                      ? 'top-0 -translate-y-1/2 mt-px'
                      : undefined,
                    horizontalPlacement === 'left'
                      ? 'right-0 translate-x-1/2 mr-px'
                      : horizontalPlacement === 'right'
                      ? 'left-0 -translate-x-1/2 ml-px'
                      : horizontalPlacement === 'leftAlign'
                      ? 'left-0 ml-4'
                      : horizontalPlacement === 'rightAlign'
                      ? 'right-0 mr-4'
                      : horizontalPlacement === 'center'
                      ? 'left-1/2 -translate-x-1/2'
                      : undefined,
                  )}
                  data-testid="tooltip-arrow"
                />
              ) : null}
              <div
                className={clsx(
                  'relative z-10 inline-flex items-center p-2 space-x-2 text-xs rounded-md font-medium',
                  inverted
                    ? 'text-white bg-gray-700 '
                    : 'bg-white text-gray-700',
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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
