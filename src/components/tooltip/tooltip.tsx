import Portal from 'components/portal'
import React, { useRef, useState } from 'react'

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
      <Portal triggerRef={trigger} visible={tooltipVisible}>
        <div className="inline-flex px-4 py-2 space-x-3 text-sm text-gray-800 bg-white rounded-md shadow">
          {icon}
          <span>{title}</span>
        </div>
      </Portal>
    </>
  )
}
