import clsx from 'clsx'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { useMemoOne } from 'use-memo-one'
import {
  getContentHorizontalPlacement,
  getContentPosition,
  getContentVerticalPlacement,
  getTransformOriginClassName,
  HorizontalPlacement,
  VerticalPlacement,
} from './utils'

enum ContentVisibility {
  HIDDEN = 'HIDDEN',
  INVISIBLE = 'INVISIBLE',
  SHOWN = 'SHOWN',
}

type PortalProps = {
  triggerRef: React.RefObject<HTMLElement | null>
  visible: boolean
  children: React.ReactElement
  verticalPlacement?: VerticalPlacement
  horizontalPlacement?: HorizontalPlacement
  /** parent of the portal container rendering the menu */
  portalParent?: HTMLElement
}

export function Portal({
  triggerRef,
  visible,
  children,
  verticalPlacement,
  horizontalPlacement,
  portalParent = document.body,
}: PortalProps) {
  const portalContainer = useMemoOne(() => {
    const container = document.createElement('div')
    container.classList.add('portal-container')
    return container
  }, [])

  /**
   * Before showing the children, we need to find the size of trigger and children content
   * to compute the placement automatically.
   *
   * To do this
   * 1. First render the content with visiblity: hidden
   *    (https://codesandbox.io/s/goofy-torvalds-15wuc?file=/src/App.tsx to see why
   *    used visiblity hidden instead of display none)
   * 2. Get the children content BCR and trigger BCR
   * 3. Compute the placement depending on trigger BCR and content BCR
   * 4. Set the placement and render the content
   *
   * State
   * contentVisibility = 'HIDDEN' | 'INVISIBLE' | 'SHOWN'
   * HIDDEN -> won't render the content
   * INVISIBLE -> render content with visiblity: hidden
   * SHOWN -> render content at correct position
   */

  const [contentVisibility, setContentVisibility] = useState<ContentVisibility>(
    ContentVisibility.HIDDEN,
  )

  const contentContainer = useRef<HTMLDivElement | null>(null)

  const [contentContainerPosition, setContentContainerPosition] = useState<
    | {
        top: number
        left: number
        placement: [VerticalPlacement, HorizontalPlacement]
      }
    | undefined
  >(undefined)

  useEffect(() => {
    if (visible) {
      setContentVisibility(ContentVisibility.INVISIBLE)
    } else {
      setContentVisibility(ContentVisibility.HIDDEN)
    }
  }, [visible])

  useLayoutEffect(() => {
    if (contentVisibility === ContentVisibility.INVISIBLE) {
      const contentContainerBCR = contentContainer.current?.getBoundingClientRect()
      const triggerBCR = triggerRef.current?.getBoundingClientRect()
      if (contentContainerBCR && triggerBCR) {
        const placement = [
          verticalPlacement ??
            getContentVerticalPlacement(triggerBCR, contentContainerBCR),
          horizontalPlacement ??
            getContentHorizontalPlacement(triggerBCR, contentContainerBCR),
        ] as [VerticalPlacement, HorizontalPlacement]
        const { top, left } = getContentPosition(
          triggerBCR,
          contentContainerBCR,
          placement,
        )
        setContentVisibility(ContentVisibility.SHOWN)
        setContentContainerPosition({
          top:
            top +
            // take scrollY position into consideration as the BCR is with respect to viewport
            window.scrollY,
          left:
            left +
            // take scrollX position into consideration as the BCR is with respecdt to viewport
            window.scrollX,
          placement,
        })
      }
    }
  }, [contentVisibility, triggerRef, verticalPlacement, horizontalPlacement])

  const content = (
    <div className="inline-block" ref={contentContainer}>
      {children}
    </div>
  )

  return (
    <>
      {contentVisibility === ContentVisibility.INVISIBLE ? (
        <div
          className="fixed top-0 left-0 inline-block"
          style={{ visibility: 'hidden' }}
        >
          {content}
        </div>
      ) : null}
      {createPortal(
        <>
          <CSSTransition
            in={
              contentVisibility === ContentVisibility.SHOWN &&
              !!contentContainerPosition
            }
            timeout={100}
            classNames="portal-content"
            unmountOnExit
            onEnter={() => {
              portalParent.appendChild(portalContainer)
            }}
            onExited={() => {
              portalParent.removeChild(portalContainer)
              setContentContainerPosition(undefined)
            }}
          >
            <div
              className={clsx(
                'absolute z-20',
                getTransformOriginClassName(
                  contentContainerPosition?.placement,
                ),
              )}
              style={{
                top: contentContainerPosition?.top ?? 0,
                left: contentContainerPosition?.left ?? 0,
              }}
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
