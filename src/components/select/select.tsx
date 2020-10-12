import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useMemoOne } from 'use-memo-one'
import { useRect } from '@reach/rect'
import clsx from 'clsx'
import { CheckOutline, SelectorOutline, XCircleSolid } from 'components/icons'
import Portal from 'components/portal'
import { mod } from 'utils/mod'
import { scrollIntoView } from 'utils/dom'
import useOutsideClick from 'hooks/use-outside-click'
import useSyncedState from 'hooks/use-synced-states'

enum KeyCodes {
  enter = 13,
  space = 32,
  down = 40,
  up = 38,
}

type OptionType = {
  value: string
  label: string
  icon?: JSX.Element
}

export type SelectProps = {
  defaultValue?: OptionType
  value?: OptionType
  options: OptionType[]
  className?: string
  style?: React.CSSProperties
}

export function Select({ options, className, style }: SelectProps) {
  const [selectedValue, setSelectedValue] = useSyncedState<
    OptionType | undefined
  >(undefined)

  const [opened, setOpened] = useState(false)

  const [hightlightIndex, setHighlightIndex] = useState(0)

  const triggerContainer = useRef<HTMLButtonElement | null>(null)
  const triggerRect = useRect(triggerContainer)

  const listContainer = useRef<HTMLUListElement | null>(null)

  function handleKeyDown(event: React.KeyboardEvent) {
    event.preventDefault()
    switch (event.keyCode) {
      case KeyCodes.enter:
      case KeyCodes.space:
        setSelectedValue(options[hightlightIndex])
        setOpened(false)
        break

      case KeyCodes.down:
        setHighlightIndex((prevState) => mod(prevState + 1, options.length))
        break
      case KeyCodes.up:
        setHighlightIndex((prevState) => mod(prevState - 1, options.length))
        break
    }
  }

  function onOptionsMount() {
    if (listContainer.current) {
      listContainer.current.focus()
      scrollOptionIntoView()
    }
  }

  function onOptionsUnmount() {
    if (triggerContainer.current) {
      triggerContainer.current.focus()
    }
  }

  const scrollOptionIntoView = useCallback(() => {
    if (listContainer.current) {
      const listItem = listContainer.current.querySelector(
        `li:nth-of-type(${hightlightIndex + 1})`,
      ) as HTMLLIElement
      if (listItem) {
        scrollIntoView(listItem, listContainer.current)
      }
    }
  }, [hightlightIndex])

  useLayoutEffect(() => {
    scrollOptionIntoView()
  }, [scrollOptionIntoView])

  useOutsideClick({
    containers: useMemoOne(() => [triggerContainer, listContainer], []),
    active: opened,
    onClick: () => {
      setOpened(false)
    },
  })

  return (
    <div className={className} style={style}>
      <button
        className="flex items-center w-full px-3 py-2 space-x-3 text-sm text-gray-800 border rounded-md focus:outline-none focus:shadow-outline"
        onClick={() => {
          setOpened((prevState) => !prevState)
        }}
        onKeyDown={(event) => {
          if (
            event.keyCode === KeyCodes.down ||
            event.keyCode === KeyCodes.up
          ) {
            setOpened(true)
          }
        }}
        ref={triggerContainer}
      >
        {selectedValue ? (
          <>
            {selectedValue.icon}
            <span>{selectedValue.label}</span>
          </>
        ) : (
          <span>Select User</span>
        )}
        <span className="flex-1" />
        {selectedValue ? (
          <button
            className="py-0.5 focus:outline-none"
            onClick={(event) => {
              event.stopPropagation()
              setSelectedValue(undefined)
            }}
          >
            <XCircleSolid className="w-5 h-5 text-gray-400" />
          </button>
        ) : (
          <span className="py-0.5">
            <SelectorOutline className="w-5 h-5 text-gray-400" />
          </span>
        )}
      </button>
      <Portal
        triggerRef={triggerContainer}
        visible={opened}
        onContentMount={onOptionsMount}
        onContentUnmount={onOptionsUnmount}
      >
        <ul
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className="overflow-auto bg-white rounded-md shadow max-h-80 focus:outline-none"
          ref={listContainer}
          onMouseLeave={() => {}}
          style={{
            width: triggerRect?.width,
          }}
        >
          {options.map((option, index) => (
            <li
              className={clsx(
                'px-3 py-2 text-sm flex items-center space-x-3',
                index === hightlightIndex
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-800',
              )}
              key={option.value}
              onMouseEnter={() => {
                setHighlightIndex(index)
              }}
              tabIndex={-1}
              onClick={() => {
                setSelectedValue(option)
                setOpened(false)
              }}
              role="option"
            >
              {option.icon}
              <span>{option.value}</span>
              <span className="flex-1" />
              {option.value === selectedValue?.value ? (
                <CheckOutline className="w-4 h-4" />
              ) : null}
            </li>
          ))}
        </ul>
      </Portal>
    </div>
  )
}
