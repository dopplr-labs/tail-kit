import { useRef, useEffect } from 'react'

type PressHandler = (event: MouseEvent) => void

export function useLongPress<T extends HTMLElement>({
  onPress,
  delay = 100,
}: {
  onPress: PressHandler
  delay?: number
}) {
  const ref = useRef<T | null>(null)

  const handlePress = useRef<PressHandler>()
  handlePress.current = onPress

  useEffect(() => {
    let timer: undefined | number

    const element = ref.current

    function handleMouseDown(event: MouseEvent) {
      timer = window.setInterval(() => {
        handlePress.current?.(event)
      }, delay)
    }

    function handleMouseUp() {
      if (timer) {
        clearInterval(timer)
      }
    }

    element?.addEventListener('mousedown', handleMouseDown)
    element?.addEventListener('mouseup', handleMouseUp)
    element?.addEventListener('mouseleave', handleMouseUp)

    return () => {
      element?.removeEventListener('mousedown', handleMouseDown)
      element?.removeEventListener('mouseup', handleMouseUp)
      element?.removeEventListener('mouseleave', handleMouseUp)

      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [delay])

  return ref
}
