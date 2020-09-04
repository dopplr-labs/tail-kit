import React, { useRef, useState, useEffect } from 'react'
import Button from 'components/button'
import { ChevronLeftOutline, ChevronRightSolid } from 'components/icons'
import { CSSTransition } from 'react-transition-group'
import { TourStep } from './types'
import { scrollIntoView } from './utils'

/** Step properties */
export type StepProps = {
  /** tour step containing the title, content and target element */
  step: TourStep
  /** index of the step */
  index: number
  /** total steps present in the tour */
  totalSteps: number
  /** function to call on **Prev** button click */
  onPrev: () => void
  /** function to call on **Next** button click */
  onNext: () => void
}

/** Component to render a single step */
export function Step({ step, index, totalSteps, onPrev, onNext }: StepProps) {
  const cloneContainer = useRef<HTMLDivElement | null>(null)

  const [stepTargetPosition, setStepTargetPosition] = useState<
    DOMRect | undefined
  >(undefined)

  useEffect(() => {
    const stepTarget = document.querySelector(step.target) as HTMLElement
    const cloneContainerNode = cloneContainer.current
    let clone: Node | undefined

    if (stepTarget) {
      scrollIntoView(stepTarget).then(() => {
        // TODO: Check if body-scroll-lock is required
        document.body.style.overflow = 'hidden'

        if (stepTarget && cloneContainerNode) {
          // deep clone the target
          clone = stepTarget.cloneNode(true)
          cloneContainerNode.appendChild(clone)

          const bcr = stepTarget.getBoundingClientRect()
          setStepTargetPosition(bcr)
        }
      })
    }

    return () => {
      document.body.style.overflow = 'auto'

      if (clone && cloneContainerNode?.contains(clone)) {
        cloneContainerNode?.removeChild(clone)
      }
    }
  }, [step.target])

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div
        ref={cloneContainer}
        className="absolute z-10 inline-block"
        style={{
          top: stepTargetPosition?.top,
          left: stepTargetPosition?.left,
          width: stepTargetPosition?.width,
          height: stepTargetPosition?.height,
        }}
      />
      <CSSTransition
        in={!!stepTargetPosition}
        classNames="popup"
        timeout={200}
        unmountOnExit
      >
        <div
          className="absolute max-w-xs origin-left transform -translate-y-1/2 bg-white rounded-md shadow-md"
          style={{
            top:
              (stepTargetPosition?.top ?? 0) +
              (stepTargetPosition?.height ?? 0) / 2,
            left: (stepTargetPosition?.right ?? 0) + 12,
          }}
        >
          <div className="px-4 py-3 font-semibold text-gray-800 border-b">
            {step.title}
          </div>
          {step.content ? (
            <div className="px-4 py-3 text-sm text-gray-600">
              {step.content}
            </div>
          ) : null}
          <div className="flex items-center justify-between px-4 py-3 space-x-2 bg-gray-100 rounded-b-md">
            <Button
              label="Prev"
              icon={<ChevronLeftOutline />}
              disabled={index === 0}
              onClick={onPrev}
            />
            <div className="text-sm text-gray-600">
              {index + 1} of {totalSteps}
            </div>
            <Button
              label={index === totalSteps - 1 ? 'Finish' : 'Next'}
              icon={<ChevronRightSolid />}
              buttonType={Button.ButtonType.primary}
              iconPlacement={Button.IconPlacement.afterLabel}
              onClick={onNext}
            />
          </div>

          <div className="absolute left-0 w-3 h-3 transform rotate-45 -translate-x-1 -translate-y-1/2 bg-white pointer-events-none top-1/2" />
        </div>
      </CSSTransition>
    </div>
  )
}
