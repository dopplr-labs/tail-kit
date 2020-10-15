export enum VerticalPlacement {
  top = 'top',
  bottom = 'bottom',
}

export enum HorizontalPlacement {
  left = 'left',
  right = 'right',
}

/**
 * Computes the vertical placement of the content depending on the
 * content size and trigger position in the screen
 *
 * @param triggerBCR DOMRect bounding client rect of the dropdown trigger
 * @param contentContainerBCR DOMRect bounding client rect of the content
 * @param offsetVertical number vertial gap between the content and trigger
 * @returns VerticalPlacement vertical placement of the either top or bottom
 */
export function getContentVerticalPlacement(
  triggerBCR: DOMRect,
  contentContainerBCR: DOMRect,
  offsetVertical: number = 12,
): VerticalPlacement {
  const isClient =
    typeof window !== 'undefined' && typeof navigator !== 'undefined'

  // on node simply return the content position to be bottom (for SSR)
  if (!isClient) {
    return VerticalPlacement.bottom
  }

  let verticalPlacement
  /**
   * If the content height + bottom position of the trigger is greater than the window height
   * then there is no space at the bottom to render the content, it should be *rendered at the top*
   */
  if (
    triggerBCR.bottom + contentContainerBCR.height + offsetVertical >
    window.innerHeight
  ) {
    verticalPlacement = VerticalPlacement.top
  }
  /**
   * If the space between the top position of the content and the start of window is less than height of
   * content, then there is no space to render that top, the content should be *rendered at bottom*
   */
  if (contentContainerBCR.height + offsetVertical > triggerBCR.top) {
    verticalPlacement = VerticalPlacement.bottom
  }

  return verticalPlacement ?? VerticalPlacement.bottom
}

/**
 * Computes the horizontal placement of the content depending on the content size and trigger
 * position in the screen
 *
 * @param triggerBCR DOMRect bounding client rect of the dropdown trigger
 * @param contentContainerBCR DOMRect bounding client rect of the content
 * @returns HorizontalPlacement horizontal placement of the content either left or right
 */
export function getContentHorizontalPlacement(
  triggerBCR: DOMRect,
  contentContainerBCR: DOMRect,
): HorizontalPlacement {
  const isClient =
    typeof window !== 'undefined' && typeof navigator !== 'undefined'

  // on node simply return the content position to be left (for SSR)
  if (!isClient) {
    return HorizontalPlacement.left
  }

  let horizontalPlacement
  /**
   * If the left position of the trigger + width of the content is greater than window width, then there
   * is no space to render the content on the left side, the content should be *rendered at the right*
   * (right position of content and trigger co-incide)
   */
  if (triggerBCR.left + contentContainerBCR.width > window.innerWidth) {
    horizontalPlacement = HorizontalPlacement.right
  }
  /**
   * If the right position of the trigger is less than the width of the container, then there is no space to render the
   * content on the right side, it should be *rendered at the left* (left position of content and trigger co-incide)
   */
  if (contentContainerBCR.width > triggerBCR.right) {
    horizontalPlacement = HorizontalPlacement.left
  }

  return horizontalPlacement ?? HorizontalPlacement.left
}

/**
 * Computes content top and left position on the basis of trigger position, content position
 * and placement
 *
 * @param triggerBCR DOMRect bounding client rect of trigger
 * @param contentContainerBCR DOMRect bounding client rect of content
 * @param placement [VerticalPlacement, HorizontalPlacement] placement of content
 * @param offsetVertical number vertial gap between the content and trigger
 * @returns {top: number, left: number} top and left position of content container
 */
export function getContentPosition(
  triggerBCR: DOMRect,
  contentContainerBCR: DOMRect,
  placement: [VerticalPlacement, HorizontalPlacement],
  offsetVertical: number = 12,
): { top: number; left: number } {
  const isClient =
    typeof window !== 'undefined' && typeof navigator !== 'undefined'

  // on node simply return the content position to be bottom left (for SSR)
  if (!isClient) {
    return { top: 0, left: 0 }
  }

  const [verticalPlacement, horizontalPlacement] = placement

  let top
  if (verticalPlacement === VerticalPlacement.top) {
    top = triggerBCR.top - (contentContainerBCR.height + offsetVertical)
  } else if (verticalPlacement === VerticalPlacement.bottom) {
    top = triggerBCR.bottom + offsetVertical
  }

  let left
  if (horizontalPlacement === HorizontalPlacement.left) {
    left = triggerBCR.left
  } else if (horizontalPlacement === HorizontalPlacement.right) {
    left = triggerBCR.right - contentContainerBCR.width
  }

  return { top: top ?? 0, left: left ?? 0 }
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
    return 'origin-top-left'
  }

  const [verticalPlacement, horizontalPlacement] = placement

  /**
   * If the vertical placement is top, it means that the content is atop of the trigger
   * which means that the it should open from bottom to top and vice-versa
   */
  if (
    verticalPlacement === VerticalPlacement.top &&
    horizontalPlacement === HorizontalPlacement.left
  ) {
    return 'origin-bottom-left'
  }

  if (
    verticalPlacement === VerticalPlacement.bottom &&
    horizontalPlacement === HorizontalPlacement.left
  ) {
    return 'origin-top-left'
  }

  if (
    verticalPlacement === VerticalPlacement.top &&
    horizontalPlacement === HorizontalPlacement.right
  ) {
    return 'origin-bottom-right'
  }

  if (
    verticalPlacement === VerticalPlacement.bottom &&
    horizontalPlacement === HorizontalPlacement.right
  ) {
    return 'origin-top-right'
  }

  return 'origin-top-left'
}
