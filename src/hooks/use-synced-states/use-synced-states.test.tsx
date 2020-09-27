import { render } from '@testing-library/react'
import React from 'react'
import { useSyncedState } from './use-synced-states'

function Tester<T>({ value, cb }: { value: T; cb: (value: T) => void }) {
  const [state] = useSyncedState(value)

  cb(state)

  return null
}

test('syncs string state correctly', () => {
  const cb = jest.fn()

  const initialValue = 'INITIAL_VALUE'
  const newValue = 'UPDATED_VALUE'

  const { rerender } = render(<Tester value={initialValue} cb={cb} />)
  rerender(<Tester value={newValue} cb={cb} />)
  expect(cb).toBeCalledWith(newValue)
})

test('syncs array state correctly', () => {
  const cb = jest.fn()

  const initialValue = [1, 2, 3]
  const newValue = [4, 5, 6]

  const { rerender } = render(<Tester value={initialValue} cb={cb} />)
  rerender(<Tester value={newValue} cb={cb} />)
  expect(cb).toBeCalledWith(newValue)
})
