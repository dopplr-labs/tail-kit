import { useEffect, useState } from 'react'
import constate from 'constate'

export type DeviceSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

function computeDeviceSize(width: number): DeviceSize {
  if (width < 640) {
    return 'sm'
  }
  if (width < 768) {
    return 'md'
  }
  if (width < 1024) {
    return 'lg'
  }
  if (width < 1280) {
    return 'xl'
  }
  return '2xl'
}

function useDeviceSize(): { deviceSize: DeviceSize } {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>(
    typeof window !== 'undefined' ? computeDeviceSize(window.innerWidth) : 'lg',
  )

  useEffect(function updateDeviceSizeOnViewportChange() {
    function handleViewportResize() {
      if (typeof window !== 'undefined') {
        setDeviceSize(computeDeviceSize(window.innerWidth))
      }
    }

    window.addEventListener('resize', handleViewportResize)

    return () => {
      window.removeEventListener('resize', handleViewportResize)
    }
  }, [])

  useEffect(function updateDeviceSizeOnMount() {
    setDeviceSize(computeDeviceSize(window.innerWidth))
  }, [])

  return {
    deviceSize,
  }
}

export const [DeviceSizeProvider, useDeviceSizeContext] =
  constate(useDeviceSize)
