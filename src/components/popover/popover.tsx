import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Portal from 'components/portal'
import { HorizontalPlacement, VerticalPlacement } from 'utils/portal'
import usePrevious from 'hooks/use-previous'
import useOutsideClick from 'hooks/use-outside-click'

export enum PopoverTrigger {
  click = 'click',
  hover = 'hover',
}

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
   * Whether the portal is visible or not. If this is set, then the it would override the
   * popover behaviour, by explicitly setting it.
   */
  visible?: boolean
  /** Callback executed when visibility of the popover is changed */
  onVisibleChange?: (visible: boolean) => void
  /** The trigger for opening or closing a tooltip */
  trigger?: PopoverTrigger
  /** Content for which the tooltip is to be shown */
  children: React.ReactElement
  /** parent of the portal container */
  portalParent?: HTMLElement
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
  children,
  visible,
  trigger: triggerMode = PopoverTrigger.hover,
  onVisibleChange,
  portalParent,
}: PopoverProps) {
  const [visibleState, setVisibleState] = useState(false)
  const isVisible = typeof visible !== 'undefined' ? visible : visibleState

  const prevIsVisible = usePrevious(isVisible)

  const onVisibleChangeCb = useRef<((visible: boolean) => void) | undefined>(
    undefined,
  )
  onVisibleChangeCb.current = onVisibleChange
  useEffect(() => {
    if (isVisible !== prevIsVisible && onVisibleChangeCb.current) {
      onVisibleChangeCb.current(isVisible)
    }
  }, [isVisible, prevIsVisible])

  const timeout = useRef<number | undefined>()

  const trigger = useRef<HTMLDivElement | null>(null)
  const popoverContainer = useRef<HTMLDivElement | null>(null)

  function handleMouseEnter() {
    if (timeout.current) {
      clearTimeout(timeout.current)
      timeout.current = undefined
    }
    if (typeof visible !== 'undefined') {
      onVisibleChangeCb.current?.(true)
    } else {
      setVisibleState(true)
    }
  }

  function handleMouseLeave() {
    // @ts-ignore
    timeout.current = setTimeout(() => {
      if (typeof visible !== 'undefined') {
        onVisibleChangeCb.current?.(false)
      } else {
        setVisibleState(false)
      }
    }, tooltipCloseDelay)
  }

  function handleClick() {
    if (typeof visible !== 'undefined') {
      onVisibleChangeCb.current?.(!visible)
    } else {
      setVisibleState((prevState) => !prevState)
    }
  }

  function handleOutsideClick() {
    if (typeof visible !== 'undefined') {
      onVisibleChangeCb.current?.(false)
    } else {
      setVisibleState(false)
    }
  }

  useOutsideClick({
    active: triggerMode === PopoverTrigger.click && isVisible,
    containers: [trigger, popoverContainer],
    onClick: handleOutsideClick,
  })

  return (
    <>
      <div
        ref={trigger}
        className={clsx(
          'inline-block',
          triggerMode === PopoverTrigger.click ? 'cursor-pointer' : undefined,
        )}
        onMouseEnter={
          triggerMode === PopoverTrigger.hover ? handleMouseEnter : undefined
        }
        onMouseLeave={
          triggerMode === PopoverTrigger.hover ? handleMouseLeave : undefined
        }
        onClick={handleClick}
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
            <div
              className="relative rounded-md shadow-lg"
              ref={popoverContainer}
              onMouseEnter={
                triggerMode === PopoverTrigger.hover
                  ? handleMouseEnter
                  : undefined
              }
              onMouseLeave={
                triggerMode === PopoverTrigger.hover
                  ? handleMouseLeave
                  : undefined
              }
            >
              <div
                className={clsx(
                  'absolute w-3 h-3 transform rotate-45 shadow-lg rounded-sm bg-white',
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
                  'relative z-10 rounded-md font-medium bg-white text-gray-700',
                )}
              >
                {title ? (
                  <div className="px-4 py-3 text-sm border-b">{title}</div>
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

Popover.Trigger = PopoverTrigger
