import { setGlobalConfig } from '@storybook/testing-react'

import * as globalStorybookConfig from './.storybook/preview'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom'
import { server } from './__mocks__/msw/server'

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

// Mock the server
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
