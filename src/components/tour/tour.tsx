import React, { useState } from 'react'
import { useMemoOne } from 'use-memo-one'
import { createPortal } from 'react-dom'
import { TourStep } from './types'
import { Step } from './step'

/** Tour properties */
export type TourProps = {
  /** array of tour steps */
  steps: TourStep[]
  /** parent of the portal container */
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
        <Step
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
