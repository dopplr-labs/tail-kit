import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import Portal from 'components/portal'
import { HorizontalPlacement, VerticalPlacement } from 'utils/portal'
import useOutsideClick from 'hooks/use-outside-click'
import { useMemoOne } from 'use-memo-one'

const PopoverPlacements: {
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
  triggerEvent?: 'click' | 'hover'
  /** Hide Arrow pointer of Popover */
  hideArrow?: boolean
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
  closeDelay = 100,
  visible,
  onVisibilityChange,
  triggerEvent = 'hover',
  hideArrow = false,
  children,
  portalParent,
}: PopoverProps) {
  const isControlledComponent = typeof visible !== 'undefined'

  const [popoverVisible, setPopoverVisible] = useState(false)
  const onVisibilityChangeFn = useRef<OnVisibilityChange | undefined>(undefined)
  onVisibilityChangeFn.current = isControlledComponent
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
    onVisibilityChangeFn.current?.(true)
  }

  function handleMouseLeave() {
    // @ts-ignore
    timeout.current = setTimeout(() => {
      onVisibilityChangeFn.current?.(false)
    }, closeDelay)
  }

  function handleTriggerClick() {
    onVisibilityChangeFn.current?.(!isVisible)
  }

  function handleOutsideClick() {
    onVisibilityChangeFn.current?.(!isVisible)
  }

  const trigger = useRef<HTMLDivElement | null>(null)

  const contentContainer = useRef<HTMLDivElement | null>(null)

  useOutsideClick({
    active: isVisible && triggerEvent === 'click',
    onClick: handleOutsideClick,
    containers: useMemoOne(() => [trigger, contentContainer], []),
  })

  return (
    <>
      <div
        ref={trigger}
        className="inline-block"
        onMouseEnter={triggerEvent === 'hover' ? handleMouseEnter : undefined}
        onMouseLeave={triggerEvent === 'hover' ? handleMouseLeave : undefined}
        onClick={triggerEvent === 'click' ? handleTriggerClick : undefined}
      >
        {children}
      </div>
      <Portal
        triggerRef={trigger}
        visible={isVisible}
        allowedPlacements={[
          ['top', 'leftAlign'],
          ['top', 'center'],
          ['top', 'rightAlign'],

          ['center', 'right'],
          ['center', 'left'],

          ['bottom', 'leftAlign'],
          ['bottom', 'center'],
          ['bottom', 'rightAlign'],
        ]}
        defaultPlacement={PopoverPlacements[placement]}
        portalParent={portalParent}
      >
        {({ containerPlacement }) => {
          const [verticalPlacement, horizontalPlacement] = containerPlacement
          return (
            <div className="relative rounded-md shadow" ref={contentContainer}>
              {!hideArrow && (
                <div
                  className={clsx(
                    'absolute w-3 h-3 transform rotate-45 shadow rounded-sm bg-white',
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
                  data-testid="popover-arrow"
                />
              )}
              <div
                className="relative z-10 font-medium text-gray-800 bg-white rounded-md"
                onMouseEnter={
                  triggerEvent === 'hover' ? handleMouseEnter : undefined
                }
                onMouseLeave={
                  triggerEvent === 'hover' ? handleMouseLeave : undefined
                }
              >
                {title ? (
                  <div className="px-4 py-2 border-b">{title}</div>
                ) : null}
                {content}
              </div>
            </div>
          )
        }}
      </Portal>
    </>
  )
}
