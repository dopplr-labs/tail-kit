import React, { useState, useEffect } from 'react'
import { dequal } from 'dequal'
import usePrevious from 'hooks/use-previous'

export function useSyncedState<T extends any>(
  prop: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(prop)

  const prevProp = usePrevious(prop)

  useEffect(() => {
    if (!dequal(prop, prevProp)) {
      setState(prop)
    }
  }, [prop, prevProp])

  return [state, setState]
}
