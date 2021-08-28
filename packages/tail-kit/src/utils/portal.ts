/**
 * The content container can be vertically placed at `top`, `center` or `bottom` of the trigger.
 */
export type VerticalPlacement = 'top' | 'center' | 'bottom'

/**
 * The content container can be horizontally placed at `left`, `leftAlign`, `center`, `right` or `rightAlign` of the trigger.
 *  `left` and `right` options are mainly for Tooltip component and renders content container on the either side of trigger.
 *  `leftAlign` and `rightAlign` options **align** the content container to the either side of the trigger.
 */
export type HorizontalPlacement =
  | 'left'
  | 'leftAlign'
  | 'center'
  | 'right'
  | 'rightAlign'

export type Placement = [VerticalPlacement, HorizontalPlacement]

/**
 * Computes the placement of the content container with respect to
 * the trigger, based on the heuristics.
 *
 * This method finds out all the validate placements out of the allowed
 * placements and
 * * if there are no valid placements it returns the default placement
 * * if the default placement is a valid one the it returns the default placement
 * * else it returns the first valid placement
 *
 * TODO: Update the getPlacement method to compute the placement based on
 * constraint optimisation (Food for thought for someone working on it in future)
 */
export function getPlacement({
  triggerBCR,
  contentContainerBCR,
  defaultPlacement,
  allowedPlacements,
  offsetHorizontal,
  offsetVertical,
}: {
  triggerBCR: DOMRect
  contentContainerBCR: DOMRect
  /**
   * The default placement of the content container.
   *
   * Generally all the portal components have some kind of default placement.
   * Select as bottom and left-align, so is date picker
   * whereas tooltip might have center and right
   */
  defaultPlacement: Placement
  /** List of all the placements allowed */
  allowedPlacements: Placement[]
  /** Vertical offset, the vertical gap between the trigger container and content container */
  offsetVertical: number
  /** Horizontal offset, the horizontal gap between the trigger container and content container */
  offsetHorizontal: number
}) {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return defaultPlacement
  }

  const validPlacements = allowedPlacements.filter((placement) => {
    const [verticalPlacement, horizontalPlacement] = placement
    return (
      isVerticalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        verticalPlacement,
        offsetVertical,
      }) &&
      isHorizontalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        horizontalPlacement,
        offsetHorizontal,
      })
    )
  })

  if (validPlacements.length === 0) {
    return defaultPlacement
  }

  if (
    validPlacements.find(
      (placement) =>
        JSON.stringify(placement) === JSON.stringify(defaultPlacement),
    )
  ) {
    return defaultPlacement
  }

  return validPlacements[0]
}

export function isVerticalPlacementValid({
  triggerBCR,
  contentContainerBCR,
  verticalPlacement,
  offsetVertical,
}: {
  triggerBCR: DOMRect
  contentContainerBCR: DOMRect
  verticalPlacement: VerticalPlacement
  offsetVertical: number
}): boolean {
  switch (verticalPlacement) {
    case 'top': {
      return triggerBCR.top - contentContainerBCR.height - offsetVertical >= 0
    }

    case 'center': {
      const triggerMidPos = triggerBCR.top + triggerBCR.height / 2
      return (
        triggerMidPos + contentContainerBCR.height / 2 <= window.innerHeight &&
        triggerMidPos - contentContainerBCR.height / 2 >= 0
      )
    }

    case 'bottom': {
      return (
        triggerBCR.bottom + contentContainerBCR.height + offsetVertical <=
        window.innerHeight
      )
    }
  }
}

export function isHorizontalPlacementValid({
  triggerBCR,
  contentContainerBCR,
  horizontalPlacement,
  offsetHorizontal,
}: {
  triggerBCR: DOMRect
  contentContainerBCR: DOMRect
  horizontalPlacement: HorizontalPlacement
  offsetHorizontal: number
}): boolean {
  switch (horizontalPlacement) {
    case 'left': {
      return triggerBCR.left - contentContainerBCR.width - offsetHorizontal >= 0
    }

    case 'leftAlign': {
      return triggerBCR.left + contentContainerBCR.width <= window.innerWidth
    }

    case 'center': {
      const triggerMidPos = triggerBCR.left + triggerBCR.width / 2
      return (
        triggerMidPos + contentContainerBCR.width / 2 <= window.innerWidth &&
        triggerMidPos - contentContainerBCR.width / 2 >= 0
      )
    }

    case 'right': {
      return (
        triggerBCR.right + contentContainerBCR.width + offsetHorizontal <=
        window.innerWidth
      )
    }

    case 'rightAlign': {
      return triggerBCR.right - contentContainerBCR.width >= 0
    }
  }
}

export function getTopPosition({
  triggerBCR,
  contentContainerBCR,
  verticalPlacement,
  offsetVertical,
}: {
  triggerBCR: DOMRect
  contentContainerBCR: DOMRect
  verticalPlacement: VerticalPlacement
  offsetVertical: number
}): number {
  switch (verticalPlacement) {
    case 'top': {
      return triggerBCR.top - contentContainerBCR.height - offsetVertical
    }

    case 'center': {
      return (
        triggerBCR.top + triggerBCR.height / 2 - contentContainerBCR.height / 2
      )
    }

    case 'bottom': {
      return triggerBCR.bottom + offsetVertical
    }
  }
}

export function getLeftPosition({
  triggerBCR,
  contentContainerBCR,
  horizontalPlacement,
  offsetHorizontal,
}: {
  triggerBCR: DOMRect
  contentContainerBCR: DOMRect
  horizontalPlacement: HorizontalPlacement
  offsetHorizontal: number
}): number {
  switch (horizontalPlacement) {
    case 'left': {
      return triggerBCR.left - contentContainerBCR.width - offsetHorizontal
    }

    case 'leftAlign': {
      return triggerBCR.left
    }

    case 'center': {
      return (
        triggerBCR.left + triggerBCR.width / 2 - contentContainerBCR.width / 2
      )
    }

    case 'right': {
      return triggerBCR.right + offsetHorizontal
    }

    case 'rightAlign': {
      return triggerBCR.right - contentContainerBCR.width
    }
  }
}

/**
 * Computes the tailwindcss className corresponding to transform orign based
 * on the content placement
 *
 * @param placement [VerticalPlacement, HorizontalPlacement] placement of the content
 */
export function getTransformOriginClassName(
  placement?: [VerticalPlacement, HorizontalPlacement],
): string {
  if (!placement) {
    return ''
  }

  const [verticalPlacement, horizontalPlacement] = placement

  if (verticalPlacement === 'top') {
    if (
      horizontalPlacement === 'leftAlign' ||
      horizontalPlacement === 'right'
    ) {
      return 'origin-bottom-left'
    }

    if (
      horizontalPlacement === 'rightAlign' ||
      horizontalPlacement === 'left'
    ) {
      return 'origin-bottom-right'
    }

    return 'origin-bottom'
  }

  if (verticalPlacement === 'center') {
    if (horizontalPlacement === 'left') {
      return 'origin-right'
    }

    if (horizontalPlacement === 'right') {
      return 'origin-left'
    }
  }

  if (verticalPlacement === 'bottom') {
    if (
      horizontalPlacement === 'leftAlign' ||
      horizontalPlacement === 'right'
    ) {
      return 'origin-top-left'
    }

    if (
      horizontalPlacement === 'rightAlign' ||
      horizontalPlacement === 'left'
    ) {
      return 'origin-top-right'
    }

    return 'origin-top'
  }

  return ''
}
