import { createContext } from 'react'

const AvatarContext = createContext<{
  size: 'large' | 'default' | 'small'
}>({
  size: 'default',
})

export default AvatarContext
