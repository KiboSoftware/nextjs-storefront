import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { GetServerSidePropsContext } from 'next'

import { createQueryClientWrapper } from '@/__test__/utils'

// Mock next/config before other imports
jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    cacheKey: 'categoryTree',
    cacheTimeOut: 10,
  },
  publicRuntimeConfig: {},
}))

jest.mock('next-i18next/serverSideTranslations', () => ({
  serverSideTranslations: jest.fn(() => {
    return Promise.resolve({
      _nextI18Next: {
        initialI18nStore: { 'mock-locale': [{}], en: [{}] },
        initialLocale: 'mock-locale',
        userConfig: { i18n: [{}] },
      },
    })
  }),
}))

// Mock the API operations
jest.mock('@/lib/api/operations', () => ({
  getB2BAccountHierarchy: jest.fn(() =>
    Promise.resolve({
      accounts: [{ id: 1001 }, { id: 1002 }],
    })
  ),
  getMultipleB2BAccountUserBehaviors: jest.fn(() =>
    Promise.resolve({
      1001: [1, 2, 3],
      1002: [4, 5, 6],
    })
  ),
}))

const UsersTemplateMock = () => <div data-testid="users-template-mock" />
jest.mock(
  '@/components/page-templates/B2B/UsersTemplate/UsersTemplate',
  () => () => UsersTemplateMock()
)

jest.mock('@/context/AuthContext', () => ({
  useAuthContext: () => ({ user: { id: 1001 } }),
}))

import UsersPage, { getServerSideProps } from '@/pages/my-account/b2b/users'

const mockNextI18Next = {
  initialI18nStore: { 'mock-locale': [{}], en: [{}] },
  initialLocale: 'mock-locale',
  userConfig: { i18n: [{}] },
}

describe('[page] Users Page', () => {
  it('should run getServerSideProps method', async () => {
    const context = {
      locale: 'mock-locale',
      query: {},
      resolvedUrl: '/my-account/b2b/users',
      req: {
        cookies: {
          kibo_at: '',
        },
      },
      res: {},
    } as unknown as GetServerSidePropsContext

    const response = await getServerSideProps(context)
    expect(response).toStrictEqual({
      props: {
        accountUserBehaviors: {
          1001: [1, 2, 3],
          1002: [4, 5, 6],
        },
        _nextI18Next: mockNextI18Next,
      },
    })
  })

  it('should render the SubscriptionPage', () => {
    render(<UsersPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const usersTemplate = screen.getByTestId('users-template-mock')
    expect(usersTemplate).toBeVisible()
  })
})
