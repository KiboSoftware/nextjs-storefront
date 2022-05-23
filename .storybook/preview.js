import { muiTheme } from 'storybook-addon-material-ui5'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { setConfig } from 'next/config'
import * as NextImage from 'next/image'
import { I18nextProvider } from 'react-i18next'
setConfig({ publicRuntimeConfig })

import { QueryClientProvider } from 'react-query'

import * as handlers from '../__mocks__/msw/handlers'
import { queryClient } from '../lib/react-query/queryClient'
import { publicRuntimeConfig } from '../next.config'
import storefrontTheme from '../styles/theme'
import i18n from './i18n'

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

export const decorators = [
  muiTheme([storefrontTheme]),
  (storyFn) => (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>{' '}
    </QueryClientProvider>
  ),
]

// Initialize MSW
if (process.env.NODE_ENV !== 'test') {
  initialize()
  decorators.push(mswDecorator)
}

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

  msw: {
    handlers: {
      checkout: [...handlers.checkoutHanlders],
    },
  },
}
