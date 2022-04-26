import { muiTheme } from 'storybook-addon-material-ui5'
import { I18nextProvider } from 'react-i18next'
import * as NextImage from 'next/image'

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import i18n from './i18n'
import storefrontTheme from '../styles/theme'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

export const decorators = [
  muiTheme([storefrontTheme]),
  (storyFn) => <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>,
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
}
