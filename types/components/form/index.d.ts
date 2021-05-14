/// <reference types="react" />
import { LayoutOptions } from './form'
import { FormItem } from './form-item'
declare const _default: import('react').ForwardRefExoticComponent<
  import('./form').FormProps & import('react').RefAttributes<HTMLFormElement>
> & {
  Item: typeof FormItem
  Layout: typeof LayoutOptions
}
export default _default
