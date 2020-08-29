const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const _ = require('lodash')
const prettier = require('prettier')

const PRETTIER_FORMAT_OPTIONS = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxSingleQuote: false,
  parser: 'babel-ts',
}

// create icon components for outline icons
createComponents('outline')
// create icon components for solid icons
createComponents('solid')

// create index.ts files for exporting all the icons
createExports()

function createComponents(iconType) {
  const directory = path.resolve(__dirname, './heroicons/src', iconType)

  fs.readdir(directory, (directoryReadError, directoryContent) => {
    // read the icons directory
    if (directoryReadError) {
      console.error(chalk.red({ directoryReadError }))
    } else {
      // filter out files with svg
      const icons = directoryContent.filter((file) => file.endsWith('.svg'))

      icons.forEach((icon) => {
        fs.readFile(
          path.resolve(directory, icon),
          'utf-8',
          (fileReadError, iconContent) => {
            if (fileReadError) {
              console.error(chalk.red({ fileReadError }))
            } else {
              // convert zoom-out.svg -> zoom-out.tsx
              const iconComponentFileName = icon.replace('.svg', '.tsx')

              const iconComponent = convertSvgToReact({
                name: icon,
                svg: iconContent,
                type: _.capitalize(iconType),
              })

              fs.writeFile(
                path.resolve(
                  __dirname,
                  '../src/components/icons',
                  iconType,
                  iconComponentFileName,
                ),
                iconComponent,
                'utf-8',
                (fileWriteError) => {
                  if (fileWriteError) {
                    console.error(chalk.red({ fileWriteError }))
                  } else {
                    console.log(
                      chalk.green(
                        `src/components/icons/${iconType}/${iconComponentFileName} created successfully`,
                      ),
                    )
                  }
                },
              )
            }
          },
        )
      })
    }
  })
}

function createExports() {
  const outlineIcons = fs
    .readdirSync(path.resolve(__dirname, './heroicons/src/outline'))
    .filter((file) => file.endsWith('.svg'))
  const outlineIconsExports = outlineIcons
    .map((iconName) => {
      const componentName = iconName
        .replace('.svg', '')
        .split('-')
        .map((val) => _.capitalize(val))
        .join('')
      return `export { default as ${componentName}Outline } from './outline/${iconName.replace(
        '.svg',
        '',
      )}'`
    })
    .join('\n')
  const solidIcons = fs
    .readdirSync(path.resolve(__dirname, './heroicons/src/outline'))
    .filter((file) => file.endsWith('.svg'))
  const solidIconsExports = solidIcons
    .map((iconName) => {
      const componentName = iconName
        .replace('.svg', '')
        .split('-')
        .map((val) => _.capitalize(val))
        .join('')
      return `export { default as ${componentName}Solid } from './solid/${iconName.replace(
        '.svg',
        '',
      )}'`
    })
    .join('\n')

  const allExports = prettier.format(
    `
  // outline icons exports
  ${outlineIconsExports}

  // solid icons exports
  ${solidIconsExports}
  `,
    PRETTIER_FORMAT_OPTIONS,
  )

  fs.writeFileSync(
    path.resolve(__dirname, '../src/components/icons/index.ts'),
    allExports,
    'utf-8',
  )
}

function convertSvgToReact({ name, svg, type }) {
  const componentName = name
    .replace('.svg', '')
    .split('-')
    .map((val) => _.capitalize(val))
    .join('')
  const componentDefinition = `
  import React from 'react'

  type Props = {
    className?: string
    style?: React.CSSProperties
  }

  export default function ${componentName}${type}({className = 'w-6 h-6', style}:Props) {
    return ${sanitizeTags(svg).replace(
      /<svg/,
      '<svg className={className} style={style}',
    )}
  }
  `
  return prettier.format(componentDefinition, PRETTIER_FORMAT_OPTIONS)
}

function sanitizeTags(content) {
  return content
    .replace('width="24"', '')
    .replace('height="24"', '')
    .replace('width="20"', '')
    .replace('height="20"', '')
    .replace('xmlns="http://www.w3.org/2000/svg"', '')
    .replace(/stroke-linejoin/g, 'strokeLinejoin')
    .replace(/stroke-width/g, 'strokeWidth')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke="#[\w\d]+"/g, 'stroke="currentColor"')
    .replace(/fill-rule="evenodd"/g, 'fillRule="evenodd"')
    .replace(/clip-rule="evenodd"/g, 'clipRule="evenodd"')
    .replace(/fill="#[\w\d]+"/g, 'fill="currentColor"')
}
