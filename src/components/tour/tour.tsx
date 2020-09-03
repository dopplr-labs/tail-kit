import React, { useState, useLayoutEffect, useRef } from 'react'
import { useMemoOne } from 'use-memo-one'
import { createPortal } from 'react-dom'

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

  const [activeStepIndex] = useState(0)

  return createPortal(
    <TourStep step={steps[activeStepIndex]} />,
    portalContainer,
  )
}

export type TourStepProps = {
  step: TourStep
}

export function TourStep({ step }: TourStepProps) {
  const cloneContainer = useRef<HTMLDivElement | null>(null)

  const [stepTargetPosition, setStepTargetPosition] = useState<
    { top: number; left: number } | undefined
  >(undefined)

  useLayoutEffect(() => {
    // TODO: Add body sroll lock

    const cloneContainerNode = cloneContainer.current

    const stepTarget = document.querySelector(step.target)

    let clone: Node | undefined

    if (stepTarget && cloneContainerNode) {
      // deep clone the target
      clone = stepTarget.cloneNode(true)
      cloneContainerNode.appendChild(clone)

      const bcr = stepTarget.getBoundingClientRect()
      setStepTargetPosition({ top: bcr.top, left: bcr.left })
    }

    return () => {
      // TODO: Remove body scroll lock

      if (clone && cloneContainerNode?.contains(clone)) {
        cloneContainerNode?.removeChild(clone)
      }
    }
  }, [step.target])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50">
      <div
        ref={cloneContainer}
        className="absolute z-10 inline-block"
        style={{ ...stepTargetPosition }}
      />
    </div>
  )
}
