import { useRef, useEffect } from 'react'

export function usePrevious<T extends any>(value: T) {
  const prev = useRef<T>(value)

  useEffect(() => {
    prev.current = value
  }, [value])

  return prev.current
}
