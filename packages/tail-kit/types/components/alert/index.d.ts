/// <reference types="react" />
import { Alert } from './alert'
declare const _default: typeof Alert & {
  Button: import('react').ForwardRefExoticComponent<
    Omit<import('../button/button').ButtonProps, 'ref' | 'buttonType'> & {
      buttonType?: 'default' | 'primary'
      className?: string
    } & import('react').RefAttributes<HTMLButtonElement>
  >
}
export default _default
