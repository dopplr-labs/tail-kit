import React, { useLayoutEffect, useReducer, useRef } from 'react'
import { useMemoOne } from 'use-memo-one'
import { useRect } from '@reach/rect'
import { SelectorOutline, XCircleSolid } from 'components/icons'
import Portal from 'components/portal'
import { mod } from 'utils/mod'
import { scrollIntoView } from 'utils/dom'
import useOutsideClick from 'hooks/use-outside-click'
import useSyncedState from 'hooks/use-synced-states'
import { Keys } from 'utils/keyboard'
import clsx from 'clsx'
import { ActionType, initialState, reducer } from './reducer'
import { OptionType } from './types'
import { SelectOption } from './components/select-option'

export type SelectProps = {
  /** The default selected value */
  defaultValue?: string
  /**
   * The value of the selected option. To be used in conjunction with `onChange` when
   * using with select as a controlled component.
   * */
  value?: string
  /** Handler function called when the selected option is changed */
  onChange?: (selectedOption: string | undefined) => void
  /** Intial label in toggle button */
  placeholder?: string
  /** Options to render in dropdown */
  options: (OptionType | string)[]
  /** Disable select component */
  disabled?: boolean
  /** Show clear button to clear selection */
  allowClear?: boolean
  /** Additional classes applied to the select component */
  className?: string
  /** Additional styles applied to the select component */
  style?: React.CSSProperties
}

/**
 * Component to render **select menu**.
 *
 * This component can be used either as a controlled component by passing both `onChange` and `value` or
 * as uncontrolled component. When using as an uncontrolled copmonent, a `defaultValue` can be provided to
 * set the initial selected value.
 *
 * This is a basic select menu which can render a label, a icon for an option. The compononent can take options
 * in the form of `OptionType` or `string`.
 */
export function Select({
  defaultValue,
  value,
  onChange,
  options,
  placeholder = 'Select Option',
  disabled = false,
  allowClear = false,
  className,
  style,
}: SelectProps) {
  const optionsList = options.map((option) =>
    typeof option === 'string' ? { value: option, label: option } : option,
  )

  const [selectedValue, setSelectedValue] = useSyncedState<
    OptionType | undefined
  >(optionsList.find((option) => option.value === (value || defaultValue)))
  const selectedOptionIndex = optionsList.findIndex(
    (option) => option.value === selectedValue?.value,
  )

  const [{ open, highlightedIndex }, dispatch] = useReducer(
    reducer,
    initialState,
  )

  const triggerContainer = useRef<HTMLButtonElement | null>(null)
  const triggerRect = useRect(triggerContainer)

  const listContainer = useRef<HTMLUListElement | null>(null)

  function selectOptionAndCloseMenu(option: OptionType | undefined) {
    setSelectedValue(option)
    onChange?.(option?.value)
    closeMenu()
  }

  function openMenu() {
    dispatch({ type: ActionType.OPEN, payload: { selectedOptionIndex } })
  }

  function closeMenu() {
    dispatch({ type: ActionType.CLOSE })
  }

  function highlightOptionWithIndex(index: number) {
    return () => {
      dispatch({
        type: ActionType.HIGHLIGHT,
        payload: {
          index,
        },
      })
    }
  }

  function reset(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation()

    selectOptionAndCloseMenu(undefined)
    highlightOptionWithIndex(0)
  }

  function handleButtonKeyDown(event: React.KeyboardEvent) {
    if (event.key === Keys.ArrowDown || event.key === Keys.ArrowUp) {
      event.preventDefault()
      openMenu()
    }
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    event.preventDefault()

    switch (event.key) {
      case Keys.Enter:
      case Keys.Space:
        selectOptionAndCloseMenu(optionsList[highlightedIndex])
        break

      case Keys.ArrowDown:
        highlightOptionWithIndex(mod(highlightedIndex + 1, options.length))()
        break

      case Keys.ArrowUp:
        highlightOptionWithIndex(mod(highlightedIndex - 1, options.length))()
        break

      case Keys.Escape:
        closeMenu()
        break
    }
  }

  function scrollOptionWithIndexIntoView(index: number) {
    if (listContainer.current) {
      listContainer.current.focus()
      const listItem = listContainer.current.querySelector(
        `li:nth-of-type(${index + 1})`,
      ) as HTMLLIElement
      if (listItem) {
        scrollIntoView(listItem, listContainer.current)
      }
    }
  }

  /**
   * Callback function to be called when the options are mounted in the portal.
   *
   * This focuses on the list container(<ul>element</ul>), so that the keyboard events are handled by
   * keyboard event listener on the list container.
   * It also scrolls the highlighted option into the view as well.
   */
  function onOptionsMount() {
    listContainer.current?.focus()
    scrollOptionWithIndexIntoView(selectedOptionIndex)
  }

  /**
   * Callback function to be called when the options are unmounted from the portal.
   *
   * This focuses on trigger button again.
   */
  function onOptionsUnmount() {
    if (triggerContainer.current) {
      triggerContainer.current.focus()
    }
  }

  // As the highlighted index changes, scroll to the highlighted option
  // into view
  useLayoutEffect(() => {
    scrollOptionWithIndexIntoView(highlightedIndex)
  }, [highlightedIndex])

  useOutsideClick({
    containers: useMemoOne(() => [triggerContainer, listContainer], []),
    active: open,
    onClick: closeMenu,
  })

  return (
    <>
      <button
        className={clsx(
          'flex items-center px-3 py-2 space-x-3 text-sm border rounded-md focus:outline-none focus:shadow-outline',
          disabled
            ? 'bg-gray-100 cursor-not-allowed text-gray-400'
            : 'text-gray-800 ',
          className,
        )}
        style={style}
        onClick={openMenu}
        onKeyDown={handleButtonKeyDown}
        ref={triggerContainer}
        disabled={disabled}
      >
        {selectedValue ? (
          <>
            {selectedValue.icon}
            <span>{selectedValue.label}</span>
          </>
        ) : (
          <span>{placeholder}</span>
        )}

        <span className="flex-1" />

        {selectedValue && allowClear ? (
          <div
            className="py-0.5 focus:outline-none cursor-pointer"
            role="button"
            onClick={reset}
          >
            <XCircleSolid className="w-5 h-5 text-gray-400" />
          </div>
        ) : (
          <span className="py-0.5">
            <SelectorOutline className="w-5 h-5 text-gray-400" />
          </span>
        )}
      </button>
      <Portal
        triggerRef={triggerContainer}
        visible={open}
        onContentMount={onOptionsMount}
        onContentUnmount={onOptionsUnmount}
      >
        <ul
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          className="overflow-auto bg-white rounded-md shadow max-h-80 focus:outline-none"
          ref={listContainer}
          style={{
            width: triggerRect?.width,
          }}
        >
          {optionsList.map((option, index) => (
            <SelectOption
              key={option.value}
              option={option}
              highlighted={index === highlightedIndex}
              selected={option.value === selectedValue?.value}
              onMouseEnter={highlightOptionWithIndex(index)}
              onClick={() => {
                selectOptionAndCloseMenu(option)
              }}
            />
          ))}
        </ul>
      </Portal>
    </>
  )
}
