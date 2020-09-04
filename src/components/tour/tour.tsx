import React, { useState, useLayoutEffect, useRef } from 'react'
import { useMemoOne } from 'use-memo-one'
import { createPortal } from 'react-dom'
import Button from 'components/button'
import { ChevronRightSolid, ChevronLeftOutline } from 'components/icons'

/** Tour step properties */
export type TourStep = {
  /** query selector for the target element */
  target: string
  /** title of the tour popup */
  title?: React.ReactNode
  /** content of tour popup */
  content?: React.ReactNode
}

/** Tour properties */
export type TourProps = {
  steps: TourStep[]
  portalParent?: HTMLElement
}

/** Component to create **product tour** */
export function Tour({ steps, portalParent = document.body }: TourProps) {
  const portalContainer = useMemoOne(() => {
    const container = document.createElement('div')
    portalParent.appendChild(container)
    return container
  }, [])

  const [activeStepIndex, setActiveStepIndex] = useState(0)

  function onPrev() {
    setActiveStepIndex((prevState) => Math.max(prevState - 1, 0))
  }

  function onNext() {
    setActiveStepIndex((prevState) => Math.min(prevState + 1, steps.length))
  }

  return activeStepIndex < steps.length
    ? createPortal(
        <TourStep
          step={steps[activeStepIndex]}
          index={activeStepIndex}
          totalSteps={steps.length}
          onPrev={onPrev}
          onNext={onNext}
        />,
        portalContainer,
      )
    : null
}

export type TourStepProps = {
  step: TourStep
  index: number
  totalSteps: number
  onPrev: () => void
  onNext: () => void
}

export function TourStep({
  step,
  index,
  totalSteps,
  onPrev,
  onNext,
}: TourStepProps) {
  const cloneContainer = useRef<HTMLDivElement | null>(null)

  const [stepTargetPosition, setStepTargetPosition] = useState<
    DOMRect | undefined
  >(undefined)

  useLayoutEffect(() => {
    // TODO: Check if body-scroll-lock is required
    document.body.style.overflow = 'hidden'

    const cloneContainerNode = cloneContainer.current

    const stepTarget = document.querySelector(step.target)

    let clone: Node | undefined

    if (stepTarget && cloneContainerNode) {
      // deep clone the target
      clone = stepTarget.cloneNode(true)
      cloneContainerNode.appendChild(clone)

      const bcr = stepTarget.getBoundingClientRect()
      setStepTargetPosition(bcr)
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
        style={{ top: stepTargetPosition?.top, left: stepTargetPosition?.left }}
      />
      <div
        className="absolute max-w-xs transform -translate-y-1/2 bg-white rounded-md shadow-md"
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
          <div className="px-4 py-3 text-sm text-gray-600">{step.content}</div>
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
    </div>
  )
}
