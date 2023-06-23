import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { createQueryClientWrapper } from '@/__test__/utils'
import MyAccountPage, { getServerSideProps } from '@/pages/my-account/index'

let mockIsAuthenticated = true
const mockCustomerAccount = {
  email: 'test@kibo.com',
}

interface MyAccountPage {
  isAuthenticated?: boolean
}
jest.mock('@/lib/helpers/cookieHelper', () => ({
  decodeParseCookieValue: jest.fn(() => 'kibo_at'),
}))

jest.mock('@/context/AuthContext', () => ({
  useAuthContext: () => ({ user: mockCustomerAccount }),
}))

const mockNextI18Next = {
  initialI18nStore: { 'mock-locale': [{}], en: [{}] },
  initialLocale: 'mock-locale',
  userConfig: { i18n: [{}] },
}

jest.mock('next-i18next/serverSideTranslations', () => ({
  serverSideTranslations: jest.fn(() => {
    return Promise.resolve({
      isAuthenticated: true,
      _nextI18Next: mockNextI18Next,
    })
  }),
}))

jest.mock('next/dynamic', () => {
  const MyAccountTemplate = () => <div data-testid="MyAccountTemplate-mock" />
  MyAccountTemplate.displayName = 'MyAccountTemplate'

  return jest.fn().mockImplementation(() => MyAccountTemplate)
})

describe('[page] MyAccount Page', () => {
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
        isAuthenticated: mockIsAuthenticated,
        _nextI18Next: mockNextI18Next,
      },
    })
  })

  it('should render the MyAccount page template', () => {
    mockIsAuthenticated = true
    MyAccountPage.defaultProps = { isAuthenticated: mockIsAuthenticated }
    render(<MyAccountPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const myAccountTemplate = screen.getByTestId('MyAccountTemplate-mock')
    expect(myAccountTemplate).toBeVisible()
  })

  it('should not render MyAccountTemplate if not authenticated', () => {
    mockIsAuthenticated = false
    MyAccountPage.defaultProps = { isAuthenticated: mockIsAuthenticated }
    render(<MyAccountPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const myAccountTemplate = screen.queryByTestId('MyAccountTemplate-mock')
    expect(myAccountTemplate).not.toBeInTheDocument()
  })
})
