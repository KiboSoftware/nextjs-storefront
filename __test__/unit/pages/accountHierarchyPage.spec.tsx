import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { createQueryClientWrapper } from '@/__test__/utils'
import AccountHierarchyPage, { getServerSideProps } from '@/pages/my-account/b2b/account-hierarchy'

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

const AccountHierarchyTemplateMock = () => <div data-testid="account-hierarchy-template-mock" />
jest.mock(
  '@/components/page-templates/B2B/AccountHierarchyTemplate/AccountHierarchyTemplate',
  () => () => AccountHierarchyTemplateMock()
)

jest.mock('@/context/AuthContext', () => ({
  useAuthContext: () => ({ user: { id: 1001 } }),
}))

const mockNextI18Next = {
  initialI18nStore: { 'mock-locale': [{}], en: [{}] },
  initialLocale: 'mock-locale',
  userConfig: { i18n: [{}] },
}

describe('[page] Account Hierarchy Page', () => {
  it('should run getServerSideProps method', async () => {
    const context = {
      locale: 'mock-locale',
      req: {
        cookies: {
          kibo_at: '',
        },
      },
    }

    const response = await getServerSideProps(context as any)
    expect(response).toStrictEqual({
      props: {
        _nextI18Next: mockNextI18Next,
      },
    })
  })

  it('should render the Account Hierarchy page', () => {
    render(<AccountHierarchyPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const usersTemplate = screen.getByTestId('account-hierarchy-template-mock')
    expect(usersTemplate).toBeVisible()
  })
})
