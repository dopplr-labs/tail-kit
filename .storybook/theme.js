import { create } from '@storybook/theming/create'
import colors from '@tailwindcss/ui/colors'
import logo from '../assets/brand-image.png'

export default create({
  base: 'light',

  fontBase: 'Inter',
  fontCode: 'Fira Mono',

  brandTitle: 'tail-kit',
  brandImage: logo,

  appBorderRadius: 8,

  colorPrimary: '#1c64f2',
  textColor: '#424242',
  barBg: colors.gray[50],
  barTextColor: colors.gray[500],
  barSelectedColor: colors.gray[900],
  appBg: colors.blue[50],
  inputBorderRadius: 4,
  colorSecondary: colors.green[500],
})
