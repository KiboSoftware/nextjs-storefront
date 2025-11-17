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
      t: (str, params) => {
        // Handle specific translation keys
        if (str === 'including-parent') {
          return 'including parent'
        }
        // Handle translation with interpolation
        if (params) {
          // For role-applied translations
          if (str === 'role-applied-to-single' && params.totalAccounts && params.accountText) {
            return `Role will be applied to ${params.totalAccounts} ${params.accountText}`
          }
          if (
            str === 'role-applied-to-multiple' &&
            params.totalAccounts &&
            params.accountText &&
            params.includingParentText
          ) {
            return `Role will be applied to ${params.totalAccounts} ${params.accountText} (${params.includingParentText})`
          }
          // Generic interpolation fallback
          return Object.keys(params).reduce((result, key) => {
            return result.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), params[key])
          }, str)
        }
        return str
      },
      i18n: {
        changeLanguage: () => Promise.resolve(),
      },
    }
  },
}))

jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next/dist/client/router', () => require('next-router-mock'))

const originalWarn = console.warn
const originalLog = console.log
const originalError = console.error

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

  console.error = jest.fn((...args) => {
    const errorMessage = typeof args[0] === 'string' ? args[0] : ''
    // React uses format strings - the component name is in args[1] when the format is "%s"
    const componentName = args.length > 1 && typeof args[1] === 'string' ? args[1] : ''
    // For stack traces, we need to check all arguments
    const allArgsString = args.map((arg) => String(arg)).join(' ')
    const hasTransitionGroupInStack = allArgsString.includes('react-transition-group')

    // Suppress known third-party library errors that don't affect test validity
    // These patterns are specific enough to only match third-party issues
    const suppressedErrors = [
      // jsdom navigation limitation - only from jsdom browser implementation
      'jsdom/lib/jsdom/browser/not-implemented.js',
      allArgsString.includes('Not implemented: navigation') && allArgsString.includes('jsdom'),
      // MUI Popover anchorEl warning - only when coming from MUI Popover component
      errorMessage.includes('The `anchorEl` prop provided to the component is invalid') &&
        allArgsString.includes('at Popover'),
      // Test environment configuration warning - occurs when tests run together (test isolation issue)
      // This is a Jest/React testing infrastructure issue, not a code issue
      errorMessage.includes(
        'The current testing environment is not configured to support act(...)'
      ),
      // react-transition-group timing - ONLY from react-transition-group's Transition/TransitionGroup component (third-party)
      // React uses format strings like "Warning: An update to %s inside a test was not wrapped in act"
      // The component name (Transition/TransitionGroup) is in args[1]
      errorMessage.includes('An update to %s inside a test was not wrapped in act') &&
        (componentName === 'Transition' || componentName === 'TransitionGroup') &&
        hasTransitionGroupInStack,
      // MUI internal component timing - ONLY from MUI internal components (ButtonBase, FormControl, etc.)
      // Only suppress if the warning is about a ForwardRef component AND comes from @mui/material
      errorMessage.includes('An update to ForwardRef') &&
        errorMessage.includes('inside a test was not wrapped in act') &&
        allArgsString.includes('@mui/material'),
      // Next.js LinkComponent timing - ONLY from Next.js client components
      // Suppress warnings from Next.js's Link component intersection observer
      errorMessage.includes('An update to ForwardRef(LinkComponent)') &&
        errorMessage.includes('inside a test was not wrapped in act'),
    ]

    if (
      suppressedErrors.some((condition) =>
        typeof condition === 'string' ? errorMessage.includes(condition) : condition
      )
    ) {
      return
    }

    originalError.call(console, ...args)
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
  console.error = originalError
})

jest.setTimeout(80000)
