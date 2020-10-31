import Portal from 'components/portal'
import React, { useRef, useState } from 'react'
import { HorizontalPlacement, VerticalPlacement } from 'utils/portal'

export type TooltipProps = {
  /** Title shown in the tooltip */
  title: React.ReactNode
  /** Title shown in the tooltip  */
  icon?: JSX.Element
  /** Content for which the tooltip is to be shown */
  children: React.ReactElement
}

/**
 * Component to show **tooltip**
 */
export function Tooltip({ title, icon, children }: TooltipProps) {
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
        // visible
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
        defaultPlacement={[VerticalPlacement.center, HorizontalPlacement.right]}
      >
        {() => (
          <div className="relative rounded-md shadow">
            <div className="absolute left-0 w-2.5 h-2.5 transform rotate-45 -translate-x-1/2 -translate-y-1/2 bg-white shadow top-1/2" />
            <div className="relative z-10 inline-flex px-4 py-2 space-x-3 text-sm text-gray-800 bg-white rounded-md">
              {icon}
              <span>{title}</span>
            </div>
          </div>
        )}
      </Portal>
    </>
  )
}
