import { useState, useEffect } from 'react'
import { isEqual } from 'lodash'
import { usePrevious } from './usePrevious'

export function useSyncedState<T extends any>(
  prop: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(prop)

  const prevProp = usePrevious(prop)

  useEffect(() => {
    if (!isEqual(prop, prevProp)) {
      setState(prop)
    }
  }, [prop, prevProp])

  return [state, setState]
}
