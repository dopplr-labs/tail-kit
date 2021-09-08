import { render } from '@testing-library/react'
import React, { useEffect, useRef } from 'react'
import { useSyncedState } from './use-synced-states'

function Tester<T>({ value, cb }: { value: T; cb: (value: T) => void }) {
  const [state] = useSyncedState(value)
  const cbRef = useRef(cb)

  useEffect(() => {
    cbRef.current(state)
  }, [state])

  return null
}

test.skip('syncs string state correctly', () => {
  const cb = jest.fn()

  const initialValue = 'INITIAL_VALUE'
  const newValue = 'UPDATED_VALUE'

  const { rerender } = render(<Tester value={initialValue} cb={cb} />)
  rerender(<Tester value={newValue} cb={cb} />)
  expect(cb).toBeCalledWith(newValue)
})

test.skip('syncs array state correctly', () => {
  const cb = jest.fn()

  const initialValue = [1, 2, 3]
  const newValue = [4, 5, 6]

  const { rerender } = render(<Tester value={initialValue} cb={cb} />)
  rerender(<Tester value={newValue} cb={cb} />)
  expect(cb).toBeCalledWith(newValue)
})

test('syncs object state correctly', () => {
  const cb = jest.fn()

  const initialValue = { value: 'value', label: 'label' }
  const newValue = { value: 'value', label: 'label' }

  const { rerender } = render(<Tester value={initialValue} cb={cb} />)
  rerender(<Tester value={newValue} cb={cb} />)
  expect(cb).toBeCalledWith(newValue)
})
