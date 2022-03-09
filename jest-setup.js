import { setGlobalConfig } from '@storybook/testing-react'

import * as globalStorybookConfig from './.storybook/preview'

setGlobalConfig(globalStorybookConfig)

jest.mock('next-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}))
