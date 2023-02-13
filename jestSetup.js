import { loadEnvConfig } from '@next/env'
import { setGlobalConfig } from '@storybook/testing-react'

import * as globalStorybookConfig from './.storybook/preview'
import '@testing-library/jest-dom'
import { server } from './__mocks__/msw/server'

const projectDir = process.cwd()
loadEnvConfig(projectDir)
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

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next/dist/client/router', () => require('next-router-mock'))

// Mock the server
beforeAll(() => {
  server.listen()
})

afterEach(() => {
  jest.clearAllMocks()
  jest.resetModules()
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

jest.setTimeout(80000)
