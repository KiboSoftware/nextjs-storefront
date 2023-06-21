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

const originalWarn = console.warn
const originalLog = console.log

// Mock the server
beforeAll(() => {
  server.listen()

  console.warn = jest.fn((message) => {
    if (message.includes('i18next::backendConnector: No backend was added via i18next.use')) {
      return
    }
    originalWarn(message)
  })

  console.log = jest.fn((...args) => {
    const logMessage = args.join(' ')

    // Specify the log message(s) you want to suppress
    const suppressedLogs = ['i18next: languageChanged', 'i18next: initialized']

    if (suppressedLogs.some((log) => logMessage.includes(log))) {
      return
    }

    originalLog(...args)
  })
})

afterEach(() => {
  jest.clearAllMocks()
  jest.resetModules()
  server.resetHandlers()
})

afterAll(() => {
  server.close()

  console.warn = originalWarn
  console.log = originalLog
})

jest.setTimeout(80000)
