import { createContext } from 'react'
import { PropItem } from 'react-docgen-typescript'

const PropsContext = createContext<{ props: { [key: string]: PropItem[] } }>({
  props: {},
})

export default PropsContext
