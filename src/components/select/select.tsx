import React, { useLayoutEffect, useReducer, useRef } from 'react'
import { useMemoOne } from 'use-memo-one'
import { useRect } from '@reach/rect'
import { HiOutlineSelector, HiXCircle } from 'react-icons/hi'
import Portal from 'components/portal'
import { scrollIntoView } from 'utils/dom'
import useOutsideClick from 'hooks/use-outside-click'
import useSyncedState from 'hooks/use-synced-states'
import { Keys } from 'utils/keyboard'
import clsx from 'clsx'
import { HorizontalPlacement, VerticalPlacement } from 'utils/portal'
import { ActionType, reducer } from './reducer'
import { OptionType } from './types'
import { SelectOption } from './components/select-option'
import { findNextIndex, findPrevIndex } from './utils'

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
  /** parent of the portal container rendering the menu */
  portalParent?: HTMLElement
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
  portalParent,
}: SelectProps) {
  const optionsList: OptionType[] = options.map((option) =>
    typeof option === 'string' ? { value: option, label: option } : option,
  )

  const [selectedValue, setSelectedValue] = useSyncedState<
    OptionType | undefined
  >(optionsList.find((option) => option.value === (value || defaultValue)))
  let selectedOptionIndex = optionsList.findIndex(
    (option) => option.value === selectedValue?.value,
  )
  // if we can't find the selected option index, then it should be the first
  // non-disabled option
  selectedOptionIndex =
    selectedOptionIndex === -1
      ? findNextIndex(optionsList, -1)
      : selectedOptionIndex

  const [{ open, highlightedIndex }, dispatch] = useReducer(reducer, {
    open: false,
    highlightedIndex: selectedOptionIndex,
  })

  const triggerContainer = useRef<HTMLButtonElement | null>(null)
  // compute the triggerRect only when the select is visible
  const triggerRect = useRect(triggerContainer, open)

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

  function toggleMenu() {
    if (open) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  function highlightOptionWithIndex(index: number) {
    dispatch({
      type: ActionType.HIGHLIGHT,
      payload: {
        index,
      },
    })
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
    switch (event.key) {
      case Keys.Enter:
      case Keys.Space:
        event.preventDefault()
        selectOptionAndCloseMenu(optionsList[highlightedIndex])
        break

      case Keys.ArrowDown: {
        event.preventDefault()
        let nextIndex = findNextIndex(optionsList, highlightedIndex)
        // if the nextIndex is same as the highlightedIndex, that means are
        // no more options after it which are enabled, so we can go to the
        // circular navigation, by starting from the top
        if (nextIndex === highlightedIndex) {
          nextIndex = findNextIndex(optionsList, -1)
        }
        highlightOptionWithIndex(nextIndex)
        break
      }

      case Keys.ArrowUp: {
        event.preventDefault()
        let nextIndex = findPrevIndex(optionsList, highlightedIndex)
        // if the nextIndex is same as the highlightedIndex, that means are
        // no more options before it which are enabled, so we can go to the
        // circular navigation, by starting from the bottom
        if (nextIndex === highlightedIndex) {
          nextIndex = findPrevIndex(optionsList, optionsList.length)
        }
        highlightOptionWithIndex(nextIndex)
        break
      }

      case Keys.Escape:
        event.preventDefault()
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
          'flex items-center px-3 py-2 space-x-3 text-sm border rounded-md focus:outline-none focus:ring-2',
          disabled
            ? 'bg-gray-100 cursor-not-allowed text-gray-400'
            : 'text-gray-800 ',
          className,
        )}
        style={style}
        onClick={toggleMenu}
        onKeyDown={handleButtonKeyDown}
        ref={triggerContainer}
        disabled={disabled}
        type="button"
      >
        {selectedValue ? (
          <>
            {selectedValue.icon}
            <span className="truncate whitespace-no-wrap">
              {selectedValue.label}
            </span>
          </>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}

        <span className="flex-1" />

        {selectedValue && allowClear ? (
          <div
            className="py-0.5 focus:outline-none cursor-pointer"
            role="button"
            onClick={reset}
            data-testid="clear-all"
          >
            <HiXCircle className="w-5 h-5 text-gray-400" />
          </div>
        ) : (
          <span className="py-0.5">
            <HiOutlineSelector className="w-5 h-5 text-gray-400" />
          </span>
        )}
      </button>
      <Portal
        triggerRef={triggerContainer}
        visible={open}
        allowedPlacements={[
          [VerticalPlacement.bottom, HorizontalPlacement.leftAlign],
          [VerticalPlacement.bottom, HorizontalPlacement.rightAlign],
          [VerticalPlacement.top, HorizontalPlacement.leftAlign],
          [VerticalPlacement.top, HorizontalPlacement.rightAlign],
        ]}
        defaultPlacement={[
          VerticalPlacement.bottom,
          HorizontalPlacement.leftAlign,
        ]}
        onContentMount={onOptionsMount}
        onContentUnmount={onOptionsUnmount}
        portalParent={portalParent}
      >
        <ul
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
          className="overflow-auto bg-white rounded-md shadow max-h-80 focus:outline-none"
          ref={listContainer}
          style={{
            width: triggerRect?.width,
          }}
          role="listbox"
        >
          {optionsList.map((option, index) => (
            <SelectOption
              key={option.value}
              option={option}
              highlighted={index === highlightedIndex}
              selected={option.value === selectedValue?.value}
              onMouseEnter={() => {
                if (!option.disabled) {
                  highlightOptionWithIndex(index)
                }
              }}
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
