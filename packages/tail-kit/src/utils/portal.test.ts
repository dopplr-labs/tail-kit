import {
  getLeftPosition,
  getPlacement,
  getTopPosition,
  getTransformOriginClassName,
  isHorizontalPlacementValid,
  isVerticalPlacementValid,
  Placement,
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
        verticalPlacement: 'top',
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
        verticalPlacement: 'top',
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
        verticalPlacement: 'center',
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
        verticalPlacement: 'center',
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
        verticalPlacement: 'center',
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
        verticalPlacement: 'bottom',
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
        verticalPlacement: 'bottom',
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
        horizontalPlacement: 'left',
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
        horizontalPlacement: 'left',
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
        horizontalPlacement: 'leftAlign',
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
        horizontalPlacement: 'leftAlign',
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
        horizontalPlacement: 'center',
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
        horizontalPlacement: 'center',
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
        horizontalPlacement: 'center',
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
        horizontalPlacement: 'right',
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
        horizontalPlacement: 'right',
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
        horizontalPlacement: 'rightAlign',
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
        horizontalPlacement: 'rightAlign',
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
    const defaultPlacement: Placement = ['bottom', 'leftAlign']
    const allowedPlacements: Placement[] = [
      ['top', 'leftAlign'],
      ['top', 'rightAlign'],
      ['bottom', 'leftAlign'],
      ['bottom', 'rightAlign'],
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
    const defaultPlacement: Placement = ['top', 'leftAlign']
    const allowedPlacements: Placement[] = [
      ['top', 'leftAlign'],
      ['top', 'rightAlign'],
      ['bottom', 'leftAlign'],
      ['bottom', 'rightAlign'],
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
    ).toEqual(['bottom', 'leftAlign'])
  })

  test('returns default placement when none of the allowed placement is valid', () => {
    const triggerBCR = createDOMRect(20, 20, 100, 100)
    const contentContainerBCR = createDOMRect(0, 0, 200, 200)
    const offsetHorizontal = 12
    const offsetVertical = 12
    const defaultPlacement: Placement = ['top', 'leftAlign']
    const allowedPlacements: Placement[] = [
      ['top', 'leftAlign'],
      ['top', 'rightAlign'],
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
        verticalPlacement: 'top',
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
        verticalPlacement: 'center',
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
        verticalPlacement: 'bottom',
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
        horizontalPlacement: 'left',
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
        horizontalPlacement: 'leftAlign',
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
        horizontalPlacement: 'center',
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
        horizontalPlacement: 'right',
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
        horizontalPlacement: 'rightAlign',
      }),
    )
      // the right position of the content container would co-incide with the right position of trigger
      // so the left position = 100 + 100 - 50 = 150px
      .toBe(150)
  })
})

describe('getTransformOriginClassName', () => {
  test('returns origin-bottom-right when the position is top left', () => {
    expect(getTransformOriginClassName(['top', 'left'])).toBe(
      'origin-bottom-right',
    )
  })

  test('returns origin-bottom-left when the position is top left-align', () => {
    expect(getTransformOriginClassName(['top', 'leftAlign'])).toBe(
      'origin-bottom-left',
    )
  })

  test('returns origin-bottom when the position is top center', () => {
    expect(getTransformOriginClassName(['top', 'center'])).toBe('origin-bottom')
  })

  test('returns origin-bottom-left when the position is top right', () => {
    expect(getTransformOriginClassName(['top', 'right'])).toBe(
      'origin-bottom-left',
    )
  })

  test('returns origin-bottom-right when the position is top right-align', () => {
    expect(getTransformOriginClassName(['top', 'rightAlign'])).toBe(
      'origin-bottom-right',
    )
  })

  test('returns origin-top-right when the position is bottom left', () => {
    expect(getTransformOriginClassName(['bottom', 'left'])).toBe(
      'origin-top-right',
    )
  })

  test('returns origin-top-left when the position is bottom left-align', () => {
    expect(getTransformOriginClassName(['bottom', 'leftAlign'])).toBe(
      'origin-top-left',
    )
  })

  test('returns origin-top when the position is bottom center', () => {
    expect(getTransformOriginClassName(['bottom', 'center'])).toBe('origin-top')
  })

  test('returns origin-top-left when the position is bottom right', () => {
    expect(getTransformOriginClassName(['bottom', 'right'])).toBe(
      'origin-top-left',
    )
  })

  test('returns origin-top-right when the position is bottom right-align', () => {
    expect(getTransformOriginClassName(['bottom', 'rightAlign'])).toBe(
      'origin-top-right',
    )
  })

  test('returns origin-right when the position center left', () => {
    expect(getTransformOriginClassName(['center', 'left'])).toBe('origin-right')
  })

  test('returns origin-left when the position center right', () => {
    expect(getTransformOriginClassName(['center', 'right'])).toBe('origin-left')
  })

  test('returns empty class when placement is not defined', () => {
    expect(getTransformOriginClassName()).toBe('')
  })

  test('returns empty class when placement is not valid', () => {
    expect(getTransformOriginClassName(['center', 'center'])).toBe('')
  })
})
