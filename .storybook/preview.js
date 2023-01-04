import { muiTheme } from 'storybook-addon-material-ui5'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { setConfig } from 'next/config'
import * as NextImage from 'next/image'
import { I18nextProvider } from 'react-i18next'
import { QueryClientProvider } from 'react-query'
import * as handlers from '../__mocks__/msw/handlers'
import { queryClient } from '../lib/react-query/queryClient'
import { publicRuntimeConfig } from '../next.config'
import storefrontTheme from '../styles/theme'
import i18n from './i18n'
import { RouterContext } from 'next/dist/shared/lib/router-context'

setConfig({ publicRuntimeConfig })

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
  initialize({
    onUnhandledRequest: ({ method, url }) => {
      console.error(`Unhandled ${method} request to ${url}.
        This exception has been only logged in the console, however, it's strongly recommended to resolve this error as you don't want unmocked data in Storybook stories.
        If you wish to mock an error response, please refer to this guide: https://mswjs.io/docs/recipes/mocking-error-responses
      `)
    },
  })
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
      checkout: [...handlers.checkoutHandlers],
      searchSuggestions: [...handlers.searchSuggestionHandlers],
      user: [...handlers.userHandlers],
      cart: [...handlers.cartHandlers],
      store: [...handlers.storeHandlers],
      orders: [...handlers.orderHandlers],
      wishlist: [...handlers.wishlistHandlers],
      productSearch: [...handlers.productSearchHandlers],
      inventory: [...handlers.inventoryHandlers],
      subscriptions: [...handlers.subscriptionHandlers],
    },
  },

  nextRouter: {
    Provider: RouterContext.Provider,
  },
}
