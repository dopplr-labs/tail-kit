export declare enum VerticalPlacement {
  top = 'top',
  bottom = 'bottom',
}
export declare enum HorizontalPlacement {
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
export declare function getContentVerticalPlacement(
  triggerBCR: DOMRect,
  contentContainerBCR: DOMRect,
  offsetVertical?: number,
): VerticalPlacement
/**
 * Computes the horizontal placement of the content depending on the content size and trigger
 * position in the screen
 *
 * @param triggerBCR DOMRect bounding client rect of the dropdown trigger
 * @param contentContainerBCR DOMRect bounding client rect of the content
 * @returns HorizontalPlacement horizontal placement of the content either left or right
 */
export declare function getContentHorizontalPlacement(
  triggerBCR: DOMRect,
  contentContainerBCR: DOMRect,
): HorizontalPlacement
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
export declare function getContentPosition(
  triggerBCR: DOMRect,
  contentContainerBCR: DOMRect,
  placement: [VerticalPlacement, HorizontalPlacement],
  offsetVertical?: number,
): {
  top: number
  left: number
}
/**
 * Computes the tailwindcss className corresponding to transform orign based
 * on the content placement
 *
 * @param placement [VerticalPlacement, HorizontalPlacement] placement of the content
 */
export declare function getTransformOriginClassName(
  placement?: [VerticalPlacement, HorizontalPlacement],
): string
