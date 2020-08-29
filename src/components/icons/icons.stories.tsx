import React, { useState, useRef } from 'react'
import { Meta } from '@storybook/react/types-6-0'
import clsx from 'clsx'
import * as icons from './'
import ClipboardSolid from './solid/clipboard'

export default {
  title: 'components/icons',
} as Meta

type IconProps = {
  className?: string
  style?: React.CSSProperties
}

export function Icons() {
  const outlineIcons = Object.keys(icons).filter((icon) =>
    icon.endsWith('Outline'),
  )
  const solidIcons = Object.keys(icons).filter((icon) => icon.endsWith('Solid'))

  return (
    <div className="relative space-y-8">
      <IconsList type="Outline" iconNames={outlineIcons} />
      <IconsList type="Solid" iconNames={solidIcons} />
    </div>
  )
}

function IconsList({ type, iconNames }: { type: string; iconNames: string[] }) {
  const [iconCopied, setIconCopied] = useState(false)

  let timeout = useRef<number | null>(null).current

  return (
    <div>
      <div className="sticky top-0 flex items-center justify-between px-4 pt-2 pb-4 -mx-4 bg-white">
        <h1 className="font-medium text-gray-700">{type} Icons</h1>
        <div
          className={clsx(
            'text-xs flex items-center sapce-x-2',
            iconCopied ? 'text-blue-500 font-medium' : 'text-gray-500',
          )}
        >
          {iconCopied ? (
            <ClipboardSolid className="w-4 h-4 text-blue-500" />
          ) : null}
          <span>{iconCopied ? 'Icon copied' : 'Click icon to copy'}</span>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-4">
        {iconNames.map((iconName) => {
          // @ts-ignore
          const IconComponent = icons[iconName] as React.ComponentType<
            IconProps
          >
          return (
            <button
              key={iconName}
              className="flex items-center justify-center p-4 text-gray-700 transition-shadow duration-300 bg-white rounded-md shadow hover:shadow-xl focus:outline-none focus:shadow-outline"
              onClick={() => {
                if (timeout) {
                  window.clearTimeout(timeout)
                }
                setIconCopied(true)
                copyToClipboard(iconName)
                timeout = window.setTimeout(() => {
                  setIconCopied(false)
                }, 3000)
              }}
            >
              <IconComponent className="w-6 h-6" />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function copyToClipboard(text: string) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}
