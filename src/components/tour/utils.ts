/**
 * Helper function to scroll a particular element into the view
 *
 * Right now, browser doesn't provide us any functionality to check if the
 * element has scrolled into view or not. This function utilizes
 * `requestAnimationFrame` loop to determine if the element position of element
 * has stabilized or not and based on that we can check if the element has scrolled or not
 *
 * @param element HTMLElement element to scroll into view
 * @param options ScrollIntoViewOptions options to scroll into view
 * @returns Promise<DOMRect> promise which is resolved when the element has scrolled into the view
 */
export function scrollIntoView(
  element: HTMLElement,
  options?: ScrollIntoViewOptions,
): Promise<DOMRect> {
  return new Promise((resolve) => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
      ...options,
    })

    let raf: number | undefined

    let sameCount = 0

    let prevBCR: DOMRect | undefined

    /**
     * Function using a `requestAnimationFrame` loop to check if the
     * position of the element is same across the multiple frames or not
     */
    function checkIfScrolled() {
      const bcr = element.getBoundingClientRect()

      // console.log(JSON.stringify({ bcr, prevBCR, sameCount }))

      if (bcr.top !== prevBCR?.top || bcr.left !== prevBCR?.left) {
        prevBCR = bcr
        sameCount = 0
        raf = requestAnimationFrame(checkIfScrolled)
      } else {
        sameCount += 1
        // check for sameCount to be greater than 2 to make sure that we not
        // resolving the method in case of faster run of rAF
        if (sameCount >= 2) {
          if (raf) {
            cancelAnimationFrame(raf)
          }
          resolve(bcr)
        } else {
          raf = requestAnimationFrame(checkIfScrolled)
        }
      }
    }

    raf = requestAnimationFrame(checkIfScrolled)
  })
}
