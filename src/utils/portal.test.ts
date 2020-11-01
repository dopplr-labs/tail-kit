import {
  getLeftPosition,
  getPlacement,
  getTopPosition,
  getTransformOriginClassName,
  HorizontalPlacement,
  isHorizontalPlacementValid,
  isVerticalPlacementValid,
  Placement,
  VerticalPlacement,
} from './portal'

function createDOMRect(
  x: number,
  y: number,
  width: number,
  height: number,
): DOMRect {
  const domRect: Partial<DOMRect> = {
    x,
    y,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    height,
    width,
  }
  domRect.toJSON = () => JSON.stringify(domRect)

  return domRect as DOMRect
}

// window size is 1024px * 768px

describe('isValidVerticalPlacement', () => {
  test('returns true for top placement when there is space at the top', () => {
    const triggerBCR = createDOMRect(600, 600, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetVertical = 12
    expect(
      isVerticalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetVertical,
        verticalPlacement: VerticalPlacement.top,
      }),
    ).toBe(true)
  })

  test('returns false for top placement when there is no space at the top', () => {
    const triggerBCR = createDOMRect(20, 20, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetVertical = 12
    expect(
      isVerticalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetVertical,
        verticalPlacement: VerticalPlacement.top,
      }),
    ).toBe(false)
  })

  test('returns true for center placement when there is space at the center', () => {
    const triggerBCR = createDOMRect(300, 300, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetVertical = 12
    expect(
      isVerticalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetVertical,
        verticalPlacement: VerticalPlacement.center,
      }),
    ).toBe(true)
  })

  test('returns false for center placement when there is no space at the center (trigger is the bottom of the page)', () => {
    const triggerBCR = createDOMRect(600, 600, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 400, 400)
    const offsetVertical = 12
    expect(
      isVerticalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetVertical,
        verticalPlacement: VerticalPlacement.center,
      }),
    ).toBe(false)
  })

  test('returns false for center placement when there is no space at the center (trigger is the top of the page)', () => {
    const triggerBCR = createDOMRect(20, 20, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 400, 400)
    const offsetVertical = 12
    expect(
      isVerticalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetVertical,
        verticalPlacement: VerticalPlacement.center,
      }),
    ).toBe(false)
  })

  test('returns true for bottom placement when there is space at the bottom', () => {
    const triggerBCR = createDOMRect(20, 20, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetVertical = 12
    expect(
      isVerticalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetVertical,
        verticalPlacement: VerticalPlacement.bottom,
      }),
    ).toBe(true)
  })

  test('returns false for bottom placement when there is no space at the bottom', () => {
    const triggerBCR = createDOMRect(600, 600, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetVertical = 12
    expect(
      isVerticalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetVertical,
        verticalPlacement: VerticalPlacement.bottom,
      }),
    ).toBe(false)
  })
})

describe('isHorizontalPlacementValid', () => {
  test('returns true for left placement when there is space at the left', () => {
    const triggerBCR = createDOMRect(80, 80, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 40, 40)
    const offsetHorizontal = 12
    expect(
      isHorizontalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.left,
      }),
    ).toBe(true)
  })

  test('returns false for left placement when there is no space at the left', () => {
    const triggerBCR = createDOMRect(20, 20, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 40, 40)
    const offsetHorizontal = 12
    expect(
      isHorizontalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.left,
      }),
    ).toBe(false)
  })

  test('returns true for leftAlign placement when there is space at the left', () => {
    const triggerBCR = createDOMRect(80, 80, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetHorizontal = 12
    expect(
      isHorizontalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.leftAlign,
      }),
    ).toBe(true)
  })

  test('returns false for leftAlign placement when there is space at the left', () => {
    const triggerBCR = createDOMRect(900, 200, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetHorizontal = 12
    expect(
      isHorizontalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.leftAlign,
      }),
    ).toBe(false)
  })

  test('returns true for center placement when there is space at the center', () => {
    const triggerBCR = createDOMRect(500, 500, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetHorizontal = 12
    expect(
      isHorizontalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.center,
      }),
    ).toBe(true)
  })

  test('returns false for center placement when there is no space at the center (trigger as the left side)', () => {
    const triggerBCR = createDOMRect(20, 20, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetHorizontal = 12
    expect(
      isHorizontalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.center,
      }),
    ).toBe(false)
  })

  test('returns false for center placement when there is no space at the center (trigger as the right side)', () => {
    const triggerBCR = createDOMRect(900, 20, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetHorizontal = 12
    expect(
      isHorizontalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.center,
      }),
    ).toBe(false)
  })

  test('returns true for right placement when there is space at the right', () => {
    const triggerBCR = createDOMRect(800, 80, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 40, 40)
    const offsetHorizontal = 12
    expect(
      isHorizontalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.right,
      }),
    ).toBe(true)
  })

  test('returns false for right placement when there is no space at the right', () => {
    const triggerBCR = createDOMRect(1000, 20, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 40, 40)
    const offsetHorizontal = 12
    expect(
      isHorizontalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.right,
      }),
    ).toBe(false)
  })

  test('returns true for rightAlign placement when there is space at the right', () => {
    const triggerBCR = createDOMRect(900, 200, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetHorizontal = 12
    expect(
      isHorizontalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.rightAlign,
      }),
    ).toBe(true)
  })

  test('returns false for rightAlign placement when there is space at the right', () => {
    const triggerBCR = createDOMRect(20, 20, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetHorizontal = 12
    expect(
      isHorizontalPlacementValid({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.rightAlign,
      }),
    ).toBe(false)
  })
})

describe('getPlacement', () => {
  test('returns the default placement when it is a valid one', () => {
    const triggerBCR = createDOMRect(20, 20, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetHorizontal = 12
    const offsetVertical = 12
    const defaultPlacement: Placement = [
      VerticalPlacement.bottom,
      HorizontalPlacement.leftAlign,
    ]
    const allowedPlacements: Placement[] = [
      [VerticalPlacement.top, HorizontalPlacement.leftAlign],
      [VerticalPlacement.top, HorizontalPlacement.rightAlign],
      [VerticalPlacement.bottom, HorizontalPlacement.leftAlign],
      [VerticalPlacement.bottom, HorizontalPlacement.rightAlign],
    ]
    expect(
      getPlacement({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        offsetVertical,
        defaultPlacement,
        allowedPlacements,
      }),
    ).toEqual(defaultPlacement)
  })

  test('returns a valid placement when the default placement is not valid', () => {
    const triggerBCR = createDOMRect(20, 20, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetHorizontal = 12
    const offsetVertical = 12
    const defaultPlacement: Placement = [
      VerticalPlacement.top,
      HorizontalPlacement.leftAlign,
    ]
    const allowedPlacements: Placement[] = [
      [VerticalPlacement.top, HorizontalPlacement.leftAlign],
      [VerticalPlacement.top, HorizontalPlacement.rightAlign],
      [VerticalPlacement.bottom, HorizontalPlacement.leftAlign],
      [VerticalPlacement.bottom, HorizontalPlacement.rightAlign],
    ]
    expect(
      getPlacement({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        offsetVertical,
        defaultPlacement,
        allowedPlacements,
      }),
    ).toEqual([VerticalPlacement.bottom, HorizontalPlacement.leftAlign])
  })

  test('returns default placement when none of the allowed placement is valid', () => {
    const triggerBCR = createDOMRect(20, 20, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetHorizontal = 12
    const offsetVertical = 12
    const defaultPlacement: Placement = [
      VerticalPlacement.top,
      HorizontalPlacement.leftAlign,
    ]
    const allowedPlacements: Placement[] = [
      [VerticalPlacement.top, HorizontalPlacement.leftAlign],
      [VerticalPlacement.top, HorizontalPlacement.rightAlign],
    ]
    expect(
      getPlacement({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        offsetVertical,
        defaultPlacement,
        allowedPlacements,
      }),
    ).toEqual(defaultPlacement)
  })
})

describe('getTopPosition', () => {
  test('returns the top position correctly for top placement', () => {
    const triggerBCR = createDOMRect(20, 400, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetVertical = 12
    expect(
      getTopPosition({
        triggerBCR,
        contentContainerBCR,
        offsetVertical,
        verticalPlacement: VerticalPlacement.top,
      }),
    )
      // the bottom position of the container is above the top of the trigger along with offset = 400 - 12 = 388px
      // so the top of the container should be 388 - 200 = 188px
      .toBe(188)
  })

  test('returns the top position correctly for center placement', () => {
    const triggerBCR = createDOMRect(100, 100, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 50, 50)
    const offsetVertical = 12
    expect(
      getTopPosition({
        triggerBCR,
        contentContainerBCR,
        offsetVertical,
        verticalPlacement: VerticalPlacement.center,
      }),
    )
      // the mid position of the trigger is as 100 + 50 = 150px
      // if the mid point of trigger and content container co-incides, the top of
      // of the content container would 150 - 25 = 125px
      .toBe(125)
  })

  test('returns the top position correctly for bottom placement', () => {
    const triggerBCR = createDOMRect(20, 20, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetVertical = 12
    expect(
      getTopPosition({
        triggerBCR,
        contentContainerBCR,
        offsetVertical,
        verticalPlacement: VerticalPlacement.bottom,
      }),
    )
      // the top of the container is below is the bottom of the trigger along with the offset = 120 + 12 = 132px
      .toBe(132) // the top position is below the bottom of the trigger with offset
  })
})

describe('getLeftPosition', () => {
  test('returns correct left position for left placement', () => {
    const triggerBCR = createDOMRect(100, 100, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 50, 50)
    const offsetHorizontal = 12
    expect(
      getLeftPosition({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.left,
      }),
    )
      // the right position of the content container would be placed from the left position along with
      // horizontal offset, so the right position = 100 - 12 = 88px
      // so the left position would be 88 - 50 = 38px
      .toBe(38)
  })

  test('returns correct left position for left-align placement', () => {
    const triggerBCR = createDOMRect(100, 100, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 50, 50)
    const offsetHorizontal = 12
    expect(
      getLeftPosition({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.leftAlign,
      }),
    )
      // the left position of the content container would co-incide with left position of trigger
      .toBe(100)
  })

  test('returns correct left position for center placement', () => {
    const triggerBCR = createDOMRect(100, 100, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 50, 50)
    const offsetHorizontal = 12
    expect(
      getLeftPosition({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.center,
      }),
    )
      // the mid position of the trigger is as 100 + 50 = 150px
      // if the mid point of trigger and content container co-incides, the left position of
      // of the content container would 150 - 25 = 125px
      .toBe(125)
  })

  test('returns correct left position for right placement', () => {
    const triggerBCR = createDOMRect(100, 100, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 50, 50)
    const offsetHorizontal = 12
    expect(
      getLeftPosition({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.right,
      }),
    )
      // the left position of the content container would be placed from the right position along with
      // horizontal offset, so the right position = 100 + 100 + 12 = 212px
      .toBe(212)
  })

  test('returns correct left position for right-align placement', () => {
    const triggerBCR = createDOMRect(100, 100, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 50, 50)
    const offsetHorizontal = 12
    expect(
      getLeftPosition({
        triggerBCR,
        contentContainerBCR,
        offsetHorizontal,
        horizontalPlacement: HorizontalPlacement.rightAlign,
      }),
    )
      // the right position of the content container would co-incide with the right position of trigger
      // so the left position = 100 + 100 - 50 = 150px
      .toBe(150)
  })
})

describe('getTransformOriginClassName', () => {
  test('returns origin-bottom-right when the position is top left', () => {
    expect(
      getTransformOriginClassName([
        VerticalPlacement.top,
        HorizontalPlacement.left,
      ]),
    ).toBe('origin-bottom-right')
  })

  test('returns origin-bottom-left when the position is top left-align', () => {
    expect(
      getTransformOriginClassName([
        VerticalPlacement.top,
        HorizontalPlacement.leftAlign,
      ]),
    ).toBe('origin-bottom-left')
  })

  test('returns origin-bottom when the position is top center', () => {
    expect(
      getTransformOriginClassName([
        VerticalPlacement.top,
        HorizontalPlacement.center,
      ]),
    ).toBe('origin-bottom')
  })

  test('returns origin-bottom-left when the position is top right', () => {
    expect(
      getTransformOriginClassName([
        VerticalPlacement.top,
        HorizontalPlacement.right,
      ]),
    ).toBe('origin-bottom-left')
  })

  test('returns origin-bottom-right when the position is top right-align', () => {
    expect(
      getTransformOriginClassName([
        VerticalPlacement.top,
        HorizontalPlacement.rightAlign,
      ]),
    ).toBe('origin-bottom-right')
  })

  test('returns origin-top-right when the position is bottom left', () => {
    expect(
      getTransformOriginClassName([
        VerticalPlacement.bottom,
        HorizontalPlacement.left,
      ]),
    ).toBe('origin-top-right')
  })

  test('returns origin-top-left when the position is bottom left-align', () => {
    expect(
      getTransformOriginClassName([
        VerticalPlacement.bottom,
        HorizontalPlacement.leftAlign,
      ]),
    ).toBe('origin-top-left')
  })

  test('returns origin-top when the position is bottom center', () => {
    expect(
      getTransformOriginClassName([
        VerticalPlacement.bottom,
        HorizontalPlacement.center,
      ]),
    ).toBe('origin-top')
  })

  test('returns origin-top-left when the position is bottom right', () => {
    expect(
      getTransformOriginClassName([
        VerticalPlacement.bottom,
        HorizontalPlacement.right,
      ]),
    ).toBe('origin-top-left')
  })

  test('returns origin-top-right when the position is bottom right-align', () => {
    expect(
      getTransformOriginClassName([
        VerticalPlacement.bottom,
        HorizontalPlacement.rightAlign,
      ]),
    ).toBe('origin-top-right')
  })

  test('returns origin-right when the position center left', () => {
    expect(
      getTransformOriginClassName([
        VerticalPlacement.center,
        HorizontalPlacement.left,
      ]),
    ).toBe('origin-right')
  })

  test('returns origin-left when the position center right', () => {
    expect(
      getTransformOriginClassName([
        VerticalPlacement.center,
        HorizontalPlacement.right,
      ]),
    ).toBe('origin-left')
  })

  test('returns empty class when placement is not defined', () => {
    expect(getTransformOriginClassName()).toBe('')
  })

  test('returns empty class when placement is not valid', () => {
    expect(
      getTransformOriginClassName([
        VerticalPlacement.center,
        HorizontalPlacement.center,
      ]),
    ).toBe('')
  })
})
