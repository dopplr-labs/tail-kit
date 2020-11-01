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
  /** Content for which the tooltip is to be shown */
  children: React.ReactElement
  defaultPlacement?: keyof typeof TooltipPlacements
}

/**
 * Component to show **tooltip**
 */
export function Tooltip({
  title,
  icon,
  children,
  defaultPlacement = 'right',
}: TooltipProps) {
  const trigger = useRef<HTMLDivElement | null>(null)

  const [tooltipVisible, setTooltipVisible] = useState(false)

  function handleMouseEnter() {
    setTooltipVisible(true)
  }

  function handleMouseLeave() {
    setTooltipVisible(false)
  }

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
          [VerticalPlacement.top, HorizontalPlacement.leftAlign],
          [VerticalPlacement.top, HorizontalPlacement.center],
          [VerticalPlacement.top, HorizontalPlacement.rightAlign],
          [VerticalPlacement.center, HorizontalPlacement.left],
          [VerticalPlacement.center, HorizontalPlacement.right],
          [VerticalPlacement.bottom, HorizontalPlacement.leftAlign],
          [VerticalPlacement.bottom, HorizontalPlacement.center],
          [VerticalPlacement.bottom, HorizontalPlacement.rightAlign],
        ]}
        defaultPlacement={TooltipPlacements[defaultPlacement]}
      >
        {({ containerPlacement }) => {
          const [verticalPlacement, horizontalPlacement] = containerPlacement
          return (
            <div className="relative rounded-md shadow">
              <div
                className={clsx(
                  'absolute w-2 h-2 transform rotate-45 bg-gray-700 shadow rounded-sm',
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
              <div className="relative z-10 inline-flex items-center px-4 py-2 space-x-3 text-sm text-white bg-gray-700 rounded-md">
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
