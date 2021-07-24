import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { RadioGroup } from 'components/radio/radio-group'
import InputNumber from 'components/input-number'
import Input from 'components/input'
import ColorPicker from 'helpers/color-picker'
import colors from 'tailwindcss/colors'

type Listener<T extends any> = (input: T) => void

let id = 0
/**
 * A simple pub sub class to manage theme decorators.
 * As all the theme decorators are created independently, we need a way
 * to communicate the theme type between them, to make sure all the stories
 * are shown using the same theme.
 */
class SimplePubSub<T> {
  listeners: { [key: string]: Listener<T> } = {}

  subscribe = (listener: Listener<T>) => {
    const _id = id++
    this.listeners[_id] = listener
    return () => {
      delete this.listeners[_id]
    }
  }

  publish = (input: T) => {
    Object.values(this.listeners).forEach((listener) => {
      listener(input)
    })
  }
}

const themePubSub = new SimplePubSub<ThemeType>()

type ThemeType = 'default' | 'dark' | 'custom'

type ThemeConfig =
  | {
      type: 'color'
      initialValue: string
    }
  | {
      type: 'number'
      initialValue: number
    }
  | {
      type: 'string'
      initialValue: string
    }

type ThemeDecoratorProps = {
  children: JSX.Element
  darkTheme: { [key: string]: string }
  themeConfig: {
    [key: string]: ThemeConfig
  }
}

export function ThemeDecorator({
  children,
  darkTheme,
  themeConfig,
}: ThemeDecoratorProps) {
  const [theme, setTheme] = useState<ThemeType>('default')

  const [customStyles, setCustomStyles] = useState<{
    [key: string]: string | number
  }>(
    Object.entries(themeConfig).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]:
          value.type === 'number'
            ? `${value.initialValue}rem`
            : value.initialValue,
      }
    }, {}),
  )
  function handleStyleChange(key: string) {
    return (value: string) => {
      setCustomStyles((prevState) => ({ ...prevState, [key]: value }))
    }
  }

  const styles =
    theme === 'default'
      ? {}
      : theme === 'dark'
      ? darkTheme
      : theme === 'custom'
      ? customStyles
      : {}

  useEffect(function updateThemeOnLocalStorageChange() {
    return themePubSub.subscribe((newTheme) => {
      setTheme(newTheme)
    })
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <RadioGroup
          value={theme}
          options={[
            { value: 'default', label: 'Default Theme' },
            { value: 'dark', label: 'Dark Theme' },
            { value: 'custom', label: 'Custom Theme' },
          ]}
          onChange={(value) => {
            themePubSub.publish(value as ThemeType)
          }}
        />
      </div>
      {theme === 'custom' ? (
        <div className="grid items-center grid-cols-2 p-4 mb-4 text-sm border border-gray-400 gap-y-4 text-text-primary rounded-default">
          <label>background color</label>
          <ColorPicker defaultValue={colors.gray['100']} />
          {Object.entries(themeConfig).map(([key, { initialValue, type }]) => {
            return (
              <React.Fragment key={key}>
                <label>{key}</label>
                {(() => {
                  switch (type) {
                    case 'color': {
                      return (
                        <ColorPicker
                          defaultValue={initialValue as string}
                          onChange={handleStyleChange(key)}
                        />
                      )
                    }
                    case 'number': {
                      return (
                        <InputNumber
                          defaultValue={initialValue as number}
                          onChange={(event) => {
                            handleStyleChange(key)(`${event.target.value}rem`)
                          }}
                        />
                      )
                    }
                    case 'string': {
                      return (
                        <Input
                          defaultValue={initialValue as string}
                          onChange={(event) => {
                            handleStyleChange(key)(event.target.value)
                          }}
                        />
                      )
                    }
                    default: {
                      return null
                    }
                  }
                })()}
              </React.Fragment>
            )
          })}
        </div>
      ) : null}
      <div
        className={clsx(
          'p-4 rounded-md',
          theme === 'default'
            ? 'bg-gray-50'
            : theme === 'dark'
            ? 'bg-gray-900'
            : undefined,
        )}
      >
        <div style={styles}>{children}</div>
      </div>
    </div>
  )
}
