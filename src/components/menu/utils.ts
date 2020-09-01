export enum VerticalPlacement {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
}

export enum HorizontalPlacement {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

/**
 * Computes the vertical placement of the menu depending on the menu
 * content size and trigger position in the screen
 *
 * @param triggerBCR DOMRect bounding client rect of the dropdown trigger
 * @param menuContentBCR DOMRect bounding client rect of the menu content
 * @param offsetVertical number vertial gap between the menu content and trigger
 * @returns VerticalPlacement vertical placement of the menu either top or bottom
 */
export function getMenuVerticalPlacement(
  triggerBCR: DOMRect,
  menuContentBCR: DOMRect,
  offsetVertical: number = 12,
): VerticalPlacement {
  const isClient =
    typeof window !== 'undefined' && typeof navigator !== 'undefined'

  // on node simply return the menu position to be bottom left (for SSR)
  if (!isClient) {
    return VerticalPlacement.BOTTOM
  }

  let verticalPlacement
  /**
   * If the menu content height + bottom position of the trigger is greater than the window height
   * then there is no space at the bottom to render the menu, it should be *rendered at the top*
   */
  if (
    triggerBCR.bottom + menuContentBCR.height + offsetVertical >
    window.innerHeight
  ) {
    verticalPlacement = VerticalPlacement.TOP
  }
  /**
   * If the space between the top position of the menu and the start of window is less than height of
   * menu content, then there is no space to render that top, the menu should be *rendered at bottom*
   */
  if (menuContentBCR.height + offsetVertical > triggerBCR.top) {
    verticalPlacement = VerticalPlacement.BOTTOM
  }

  return verticalPlacement ?? VerticalPlacement.BOTTOM
}

/**
 * Computes the horizontal placement of the menu depending on the menu content size and trigger
 * position in the screen
 *
 * @param triggerBCR DOMRect bounding client rect of the dropdown trigger
 * @param menuContentBCR DOMRect bounding client rect of the menu content
 * @returns HorizontalPlacement horizontal placement of the menu either left or right
 */
export function getMenuHorizontalPlacement(
  triggerBCR: DOMRect,
  menuContentBCR: DOMRect,
): HorizontalPlacement {
  const isClient =
    typeof window !== 'undefined' && typeof navigator !== 'undefined'

  // on node simply return the menu position to be bottom left (for SSR)
  if (!isClient) {
    return HorizontalPlacement.LEFT
  }

  let horizontalPlacement
  /**
   * If the left position of the trigger + width of the menu content is greater than window width, then there
   * is no space to render the menu on the left side, the menu should be *rendered at the right*
   * (right position of menu and trigger co-incide)
   */
  if (triggerBCR.left + menuContentBCR.width > window.innerWidth) {
    horizontalPlacement = HorizontalPlacement.RIGHT
  }
  /**
   * If the right position of the trigger is less than the width of the container, then there is no space to render the
   * menu on the right side, it should be *rendered at the left* (left position of menu and trigger co-incide)
   */
  if (menuContentBCR.width > triggerBCR.right) {
    horizontalPlacement = HorizontalPlacement.LEFT
  }

  return horizontalPlacement ?? HorizontalPlacement.LEFT
}

/**
 * Computes menu top and left position on the basis of trigger position, menu content position
 * and menu placement
 *
 * @param triggerBCR DOMRect bounding client rect of trigger
 * @param menuContentBCR DOMRect bounding client rect of menu content
 * @param placement [VerticalPlacement, HorizontalPlacement] placement of menu item
 * @param offsetVertical number vertial gap between the menu content and trigger
 * @returns {top: number, left: number} top and left position of menu container
 */
export function getMenuPosition(
  triggerBCR: DOMRect,
  menuContentBCR: DOMRect,
  placement: [VerticalPlacement, HorizontalPlacement],
  offsetVertical: number = 12,
): { top: number; left: number } {
  const isClient =
    typeof window !== 'undefined' && typeof navigator !== 'undefined'

  // on node simply return the menu position to be bottom left (for SSR)
  if (!isClient) {
    return { top: 0, left: 0 }
  }

  const [verticalPlacement, horizontalPlacement] = placement

  let top
  if (verticalPlacement === VerticalPlacement.TOP) {
    top = triggerBCR.top - (menuContentBCR.height + offsetVertical)
  } else if (verticalPlacement === VerticalPlacement.BOTTOM) {
    top = triggerBCR.bottom + offsetVertical
  }

  let left
  if (horizontalPlacement === HorizontalPlacement.LEFT) {
    left = triggerBCR.left
  } else if (horizontalPlacement === HorizontalPlacement.RIGHT) {
    left = triggerBCR.right - menuContentBCR.width
  }

  return { top: top ?? 0, left: left ?? 0 }
}

/**
 * Computes the tailwindcss className corresponding to transform orign based
 * on the menu content placement
 *
 * @param placement [VerticalPlacement, HorizontalPlacement] placement of the menu content
 */
export function getTransformOriginClassName(
  placement?: [VerticalPlacement, HorizontalPlacement],
): string {
  if (!placement) {
    return 'origin-top-left'
  }

  const [verticalPlacement, horizontalPlacement] = placement

  /**
   * If the vertical placement is top, it means that the menu content is atop of the trigger
   * which means that the menu should open from bottom to top and vice-versa
   */
  if (
    verticalPlacement === VerticalPlacement.TOP &&
    horizontalPlacement === HorizontalPlacement.LEFT
  ) {
    return 'origin-bottom-left'
  }

  if (
    verticalPlacement === VerticalPlacement.BOTTOM &&
    horizontalPlacement === HorizontalPlacement.LEFT
  ) {
    return 'origin-top-left'
  }

  if (
    verticalPlacement === VerticalPlacement.TOP &&
    horizontalPlacement === HorizontalPlacement.RIGHT
  ) {
    return 'origin-bottom-right'
  }

  if (
    verticalPlacement === VerticalPlacement.BOTTOM &&
    horizontalPlacement === HorizontalPlacement.RIGHT
  ) {
    return 'origin-top-right'
  }

  return 'origin-top-left'
}
