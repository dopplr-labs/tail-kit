export enum VerticalPlacement {
  top = 'top',
  center = 'center',
  bottom = 'bottom',
}

export enum HorizontalPlacement {
  left = 'left',
  leftAlign = 'leftAlign',
  center = 'center',
  right = 'right',
  rightAlign = 'rightAlign',
}

export type Placement = [VerticalPlacement, HorizontalPlacement]

type getPlacementProps = {
  triggerBCR: DOMRect
  contentContainerBCR: DOMRect
  defaultPlacement: Placement
  allowedPlacements: Placement[]
  offsetVertical: number
  offsetHorizontal: number
}

export function getPlacement({
  triggerBCR,
  contentContainerBCR,
  defaultPlacement,
  allowedPlacements,
  offsetHorizontal,
  offsetVertical,
}: getPlacementProps) {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return defaultPlacement
  }

  const validPlacements = allowedPlacements.filter((placement) =>
    isValidPlacement({
      triggerBCR,
      contentContainerBCR,
      placement,
      offsetHorizontal,
      offsetVertical,
    }),
  )

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

type isValidPlacementProps = {
  triggerBCR: DOMRect
  contentContainerBCR: DOMRect
  placement: Placement
  offsetVertical: number
  offsetHorizontal: number
}

export function isValidPlacement({
  triggerBCR,
  contentContainerBCR,
  placement,
  offsetHorizontal,
  offsetVertical,
}: isValidPlacementProps): Boolean {
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
}

type isVerticalPlacementValidProps = {
  triggerBCR: DOMRect
  contentContainerBCR: DOMRect
  verticalPlacement: VerticalPlacement
  offsetVertical: number
}

export function isVerticalPlacementValid({
  triggerBCR,
  contentContainerBCR,
  verticalPlacement,
  offsetVertical,
}: isVerticalPlacementValidProps): boolean {
  switch (verticalPlacement) {
    case VerticalPlacement.top: {
      return triggerBCR.top - contentContainerBCR.height - offsetVertical >= 0
    }

    case VerticalPlacement.center: {
      const maxHeight = Math.max(triggerBCR.height, contentContainerBCR.height)
      return (
        triggerBCR.top + triggerBCR.height / 2 + maxHeight / 2 <=
        window.innerHeight
      )
    }

    case VerticalPlacement.bottom: {
      return (
        triggerBCR.bottom + contentContainerBCR.height + offsetVertical <=
        window.innerHeight
      )
    }

    default: {
      return false
    }
  }
}

type isHorizontalPlacementValidProps = {
  triggerBCR: DOMRect
  contentContainerBCR: DOMRect
  horizontalPlacement: HorizontalPlacement
  offsetHorizontal: number
}

export function isHorizontalPlacementValid({
  triggerBCR,
  contentContainerBCR,
  horizontalPlacement,
  offsetHorizontal,
}: isHorizontalPlacementValidProps): boolean {
  const maxWidth = Math.max(triggerBCR.width, contentContainerBCR.width)

  switch (horizontalPlacement) {
    case HorizontalPlacement.left: {
      return triggerBCR.left - contentContainerBCR.width - offsetHorizontal >= 0
    }

    case HorizontalPlacement.leftAlign: {
      return triggerBCR.left + maxWidth <= window.innerWidth
    }

    case HorizontalPlacement.center: {
      return (
        triggerBCR.left + triggerBCR.width / 2 + maxWidth / 2 <=
        window.innerWidth
      )
    }

    case HorizontalPlacement.right: {
      return (
        triggerBCR.right + contentContainerBCR.width + offsetHorizontal <=
        window.innerWidth
      )
    }

    case HorizontalPlacement.rightAlign: {
      return triggerBCR.right <= window.innerWidth
    }

    default: {
      return false
    }
  }
}

type getTopPositionProps = {
  triggerBCR: DOMRect
  contentContainerBCR: DOMRect
  verticalPlacement: VerticalPlacement
  offsetVertical: number
}

export function getTopPosition({
  triggerBCR,
  contentContainerBCR,
  verticalPlacement,
  offsetVertical,
}: getTopPositionProps): number {
  switch (verticalPlacement) {
    case VerticalPlacement.top: {
      return triggerBCR.top - contentContainerBCR.height - offsetVertical
    }

    case VerticalPlacement.center: {
      return (
        triggerBCR.top + triggerBCR.height / 2 - contentContainerBCR.height / 2
      )
    }

    case VerticalPlacement.bottom: {
      return triggerBCR.bottom + offsetVertical
    }

    default: {
      throw new Error('Invalid vertical placement')
    }
  }
}

type getLeftPositionProps = {
  triggerBCR: DOMRect
  contentContainerBCR: DOMRect
  horizontalPlacement: HorizontalPlacement
  offsetHorizontal: number
}

export function getLeftPosition({
  triggerBCR,
  contentContainerBCR,
  horizontalPlacement,
  offsetHorizontal,
}: getLeftPositionProps): number {
  switch (horizontalPlacement) {
    case HorizontalPlacement.left: {
      return triggerBCR.left - contentContainerBCR.width - offsetHorizontal
    }

    case HorizontalPlacement.leftAlign: {
      return triggerBCR.left
    }

    case HorizontalPlacement.center: {
      return (
        triggerBCR.left + triggerBCR.width / 2 - contentContainerBCR.width / 2
      )
    }

    case HorizontalPlacement.right: {
      return triggerBCR.right + offsetHorizontal
    }

    case HorizontalPlacement.rightAlign: {
      return triggerBCR.right - contentContainerBCR.width
    }

    default: {
      throw new Error('Invalid horizontal placement')
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

  if (verticalPlacement === VerticalPlacement.top) {
    if (horizontalPlacement === HorizontalPlacement.leftAlign) {
      return 'origin-bottom-left'
    }
    if (horizontalPlacement === HorizontalPlacement.rightAlign) {
      return 'origin-bottom-right'
    }

    return 'origin-bottom'
  }

  if (verticalPlacement === VerticalPlacement.center) {
    if (horizontalPlacement === HorizontalPlacement.left) {
      return 'origin-right'
    }
    if (horizontalPlacement === HorizontalPlacement.right) {
      return 'origin-left'
    }
  }

  if (verticalPlacement === VerticalPlacement.bottom) {
    if (horizontalPlacement === HorizontalPlacement.leftAlign) {
      return 'origin-top-left'
    }
    if (horizontalPlacement === HorizontalPlacement.rightAlign) {
      return 'origin-top-right'
    }

    return 'origin-top'
  }

  return ''
}
