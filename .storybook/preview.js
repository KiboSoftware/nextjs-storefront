import { muiTheme } from 'storybook-addon-material-ui5'
import storefrontTheme from '../styles/theme'

export const decorators = [muiTheme([storefrontTheme])]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
