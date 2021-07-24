import React, { useState } from 'react'
import clsx from 'clsx'
import { SketchPicker } from 'react-color'
import useSyncedState from 'hooks/use-synced-states'
import Popover from 'components/popover'

type ColorPickerProps = {
  value?: string
  defaultValue?: string
  onChange?: (color: string) => void
  className?: string
  style?: React.CSSProperties
}

export function ColorPicker({
  value,
  defaultValue,
  onChange,
  className,
  style,
}: ColorPickerProps) {
  const [colorValue, setColorValue] = useSyncedState(
    value ?? defaultValue ?? '',
  )

  const [popoverVisible, setPopoverVisible] = useState<boolean>(false)

  return (
    <div className={clsx('inline-block', className)} style={style}>
      <Popover
        visible={popoverVisible}
        onVisibilityChange={setPopoverVisible}
        triggerEvent={Popover.PopoverTriggerEvent.click}
        content={
          <SketchPicker
            styles={{
              default: {
                picker: {
                  background: 'transparent',
                  padding: 0,
                  boxShadow: 'none',
                },
              },
            }}
            color={colorValue}
            onChange={({ hex }) => {
              setColorValue(hex)
              onChange?.(hex)
            }}
          />
        }
      >
        <div
          className="inline-block w-8 h-8 border-gray-400 rounded-default"
          style={{ backgroundColor: colorValue }}
        />
      </Popover>
    </div>
  )
}
