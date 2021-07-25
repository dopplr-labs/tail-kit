import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import range from 'utils/range'
import NPSInput from '.'

test('NPSInput component working correctly', () => {
  render(<NPSInput />)
  expect(
    screen.getByText(
      'How likely are you to recommend us to your friends and colleagues?',
    ),
  )
})

test('onSubmit of NPSInput working correctly', () => {
  const handleSubmit = jest.fn((score) => score)
  render(<NPSInput onSubmit={handleSubmit} />)
  fireEvent.click(screen.getByText('8'))
  expect(handleSubmit).toBeCalled()
  expect(handleSubmit.mock.results[0].value).toStrictEqual(8)
})

test('score highlighting correctly on mouse enter and mouse leave', () => {
  render(<NPSInput />)
  fireEvent.mouseEnter(screen.getByText('7'))
  range(0, 11).forEach((score) => {
    if (score < 8) {
      expect(screen.getByText(score.toString())).toHaveClass('bg-blue-500')
    } else {
      expect(screen.getByText(score.toString())).toHaveClass('bg-gray-200')
    }
  })
  fireEvent.mouseLeave(screen.getByText('7'))
  range(0, 11).forEach((score) => {
    expect(screen.getByText(score.toString())).toHaveClass('bg-gray-200')
  })
})
