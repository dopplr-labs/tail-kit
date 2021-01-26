import { fireEvent, render, screen } from '@testing-library/react'
import React, { useMemo, useRef } from 'react'
import { useOutsideClick } from './use-outside-click'

let containerIds: string[] = []

afterEach(() => {
  // reset the containerIds after each test run, so as to keep each test isolated
  containerIds = []
})

function Tester({
  onClick,
  testId = 'tester-container',
  children,
  active = true,
}: {
  onClick: (event: MouseEvent) => void
  testId?: string
  children?: React.ReactNode
  active?: boolean
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  useOutsideClick(
    { containers: useMemo(() => [containerRef], []), active, onClick },
    containerIds,
  )

  return (
    <div ref={containerRef} data-testid={testId}>
      {children}
    </div>
  )
}

test('calls onClick handler on clicking outside the container', () => {
  const onClick = jest.fn()
  render(
    <div>
      <Tester onClick={onClick} />
      <div data-testid="outside-container" />
    </div>,
  )
  fireEvent.mouseDown(screen.getByTestId('outside-container'))
  expect(onClick).toHaveBeenCalled()
})

test("doesn't call onClick handler on clicking inside the contaienr", () => {
  const onClick = jest.fn()
  render(
    <div>
      <Tester onClick={onClick}>
        <div data-testid="inside-element" />
      </Tester>
    </div>,
  )
  fireEvent.mouseDown(screen.getByTestId('inside-element'))
  expect(onClick).not.toHaveBeenCalled()
})

/**
 * Before you try to uncomment this test case, please read the **VERY VERY IMPORTANT NOTE** in the
 * use-outside-click-test.tsx. It has the explanation why this test would fail.
 *
 * And look for the test below
 */
// test('calls correct onClick handler in case of nested containers', () => {
//   const onOutsideParentClick = jest.fn()
//   const onOutsideChildClick = jest.fn()
//   render(
//     <div>
//       <Tester onClick={onOutsideParentClick} testId="parent-tester">
//         <div data-testid="inside-parent-tester" />
//         <Tester onClick={onOutsideChildClick} testId="child-tester">
//           <div data-testid="inside-child-tester" />
//         </Tester>
//       </Tester>
//       <div data-testid="outside-element" />
//     </div>,
//   )

//   // if an element inside the parent tester is being called
//   // the outside click handler for child would be called
//   fireEvent.mouseDown(screen.getByTestId('inside-parent-tester'))
//   expect(onOutsideChildClick).toHaveBeenCalled()

//   // fireEvent.mouseDown(screen.getByTestId('outside-element'))
//   // expect(onOutsideChildClick).toHaveBeenCalledTimes(2)
// })

test('calls correct onClick handler in case of nested containers', () => {
  const onOutsideParentClick = jest.fn()
  const onOutsideChildClick = jest.fn()
  const { rerender } = render(
    <div>
      <Tester onClick={onOutsideParentClick} testId="parent-tester">
        <Tester
          onClick={onOutsideChildClick}
          testId="child-tester"
          active={false}
        />
      </Tester>
      <div data-testid="outside-element" />
    </div>,
  )

  fireEvent.mouseDown(screen.getByTestId('outside-element'))
  expect(onOutsideParentClick).toHaveBeenCalled()

  rerender(
    <div>
      <Tester onClick={onOutsideParentClick} testId="parent-tester">
        <Tester
          onClick={onOutsideChildClick}
          testId="child-tester"
          active={true}
        />
      </Tester>
      <div data-testid="outside-element" />
    </div>,
  )

  fireEvent.mouseDown(screen.getByTestId('outside-element'))
  expect(onOutsideChildClick).toHaveBeenCalled()
  // make sure that outsideParentClick is not called again
  expect(onOutsideParentClick).toHaveBeenCalledTimes(1)
})
