import * as path from 'path'
import { PropItem, withCustomConfig } from 'react-docgen-typescript'
import sanitize from './sanitize'

/**
 * Function to get the props of all the components. It is just a wrapper around
 * `getComponentProps` that takes care of getting component props.
 *
 * @see getComponentProps
 *
 * @param componentData - the list of component path and name
 */
export function getComponentsProps(
  componentData: { name: string; path: string }[],
): {
  [key: string]: PropItem[]
} {
  const props: { [key: string]: PropItem[] } = {}

  componentData.forEach(({ name, path }) => {
    props[name] = getComponentProps(path, name)
  })

  return props
}

/**
 * Function to get the props of a component. It is used to render the `PropsTable` component
 * present in the .mdx file
 *
 * @param componentPath - path to the component file (relative to the `tail-kit` package root)
 * @param componentName - name of the component
 */
export function getComponentProps(
  componentPath: string,
  componentName: string,
): PropItem[] {
  // cwd point to the root directory of website
  const cwd = process.cwd()

  // get the path to tsconfig.json for the tail-kit package
  // as it is would be used by `react-docgen-typescript` to get the prop definitions
  const tailKitTSConfigPath = path.join(
    cwd,
    '../packages/tail-kit/tsconfig.json',
  )

  // create a compiler instance to parse the component props
  const compiler = withCustomConfig(tailKitTSConfigPath, {})

  const resolvedComponentPath = path.join(
    cwd,
    '../packages/tail-kit',
    componentPath,
  )
  const output = compiler.parse(resolvedComponentPath)

  // filter props corresponding to the component
  const allProps = output.find(
    (item) => item.displayName === componentName,
  )?.props

  // the props may contain all the prop definitions including the ones provided by react
  // for example in case of type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {foo: string}
  // the props will contain all the prop definitions including the ones provided by react
  // so we need to filter out the props which are only present in the componentPath
  const componentProps =
    Object.values(allProps).filter(({ declarations }) =>
      declarations?.find(({ fileName }) => fileName?.includes(componentPath)),
    ) ?? []

  // sanitize the componentProps to replace `undefined` with `null`
  return sanitize(componentProps)
}
