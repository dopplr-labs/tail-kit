import { render } from '@testing-library/react'
import React from 'react'
import { usePrevious } from './use-previous'

function Tester<T>({ value, cb }: { value: T; cb: (value: T) => void }) {
  const prevValue = usePrevious(value)

  cb(prevValue)

  return null
}

test('saves previous value correctly', () => {
  const cb = jest.fn()

  const initialValue = 'INITIAL_VALUE'
  const newValue = 'UPDATED_VALUE'

  const { rerender } = render(<Tester value={initialValue} cb={cb} />)
  rerender(<Tester value={newValue} cb={cb} />)
  expect(cb).toHaveBeenCalledTimes(2)
  expect(cb).toBeCalledWith(initialValue)
})
