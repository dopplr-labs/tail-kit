import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { useMemoOne } from 'use-memo-one'
import { getTransformOriginClassName, Placement } from '../../utils/portal'
import usePortalPosition from '../../hooks/use-portal-position'

enum ContentVisibility {
  HIDDEN = 'HIDDEN',
  INVISIBLE = 'INVISIBLE',
  SHOWN = 'SHOWN',
}

type PortalProps = {
  /**
   * Ref of the trigger element. The content container would render
   * according the placement of the trigger
   * */
  triggerRef: React.RefObject<HTMLElement | null>
  /** Whether portal is visible or not */
  visible: boolean
  /** Content to be rendered inside the portal */
  children:
    | React.ReactElement
    | ((_: {
        contentVisibility: ContentVisibility
        containerPlacement: Placement
        contentStyle?: React.CSSProperties
      }) => React.ReactElement)
  defaultPlacement: Placement
  allowedPlacements: Placement[]
  offsetHorizontal?: number
  offsetVertical?: number
  /** Handler function called when the portal children is rendered in the correct position */
  onContentMount?: () => void
  /** Handler function called when the portal children is unmounted */
  onContentUnmount?: () => void
  /** parent of the portal container rendering the menu */
  portalParent?: HTMLElement
}

export function Portal({
  triggerRef,
  visible,
  children,
  allowedPlacements,
  defaultPlacement,
  offsetHorizontal = 12,
  offsetVertical = 12,
  onContentMount,
  onContentUnmount,
  portalParent = typeof window !== 'undefined' ? document.body : undefined,
}: PortalProps) {
  const portalContainer = useMemoOne(() => {
    const container =
      typeof window !== 'undefined' ? document.createElement('div') : undefined
    container?.classList.add('portal-container')
    return container
  }, [])

  useEffect(() => {
    return () => {
      if (portalContainer && portalParent?.contains(portalContainer)) {
        portalParent?.removeChild(portalContainer)
      }
    }
  }, [portalContainer, portalParent])

  const contentContainer = useRef<HTMLDivElement | null>(null)

  const {
    contentVisibility,
    contentStyle,
    containerPlacement,
    setContentContainerPosition,
  } = usePortalPosition({
    visible,
    trigger: triggerRef,
    contentContainer,
    allowedPlacements,
    defaultPlacement,
    offsetHorizontal,
    offsetVertical,
  })

  const content = (
    <div className="inline-block" ref={contentContainer}>
      {typeof children === 'function'
        ? children({
            contentVisibility,
            containerPlacement: containerPlacement ?? defaultPlacement,
            contentStyle,
          })
        : children}
    </div>
  )

  if (!portalContainer) {
    return null
  }

  return (
    <>
      {contentVisibility === ContentVisibility.INVISIBLE ? (
        <div style={contentStyle}>{content}</div>
      ) : null}
      {createPortal(
        <>
          <CSSTransition
            in={contentVisibility === ContentVisibility.SHOWN}
            timeout={100}
            classNames="portal-content"
            unmountOnExit
            onEnter={() => {
              if (portalParent && portalContainer) {
                portalParent.appendChild(portalContainer)
                onContentMount?.()
              }
            }}
            onExited={() => {
              if (portalParent && portalContainer) {
                portalParent.removeChild(portalContainer)
                setContentContainerPosition(undefined)
                onContentUnmount?.()
              }
            }}
          >
            <div
              className={clsx(getTransformOriginClassName(containerPlacement))}
              style={contentStyle}
            >
              {content}
            </div>
          </CSSTransition>
        </>,
        portalContainer,
      )}
    </>
  )
}
