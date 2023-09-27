import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { userMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'
import { AuthContext } from '@/context'
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

jest.mock('@/lib/api/operations', () => ({
  getCurrentUser: jest.fn(() => userMock),
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

const MyAccountTemplateMock = () => <div data-testid="MyAccountTemplate-mock" />
jest.mock(
  '@/components/page-templates/MyAccountTemplate/MyAccountTemplate.tsx',
  () => () => MyAccountTemplateMock()
)

const B2BTemplateMock = () => <div data-testid="B2BTemplate-mock" />
jest.mock(
  '@/components/page-templates/B2B/B2BTemplate/B2BTemplate.tsx',
  () => () => B2BTemplateMock()
)

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
        customerAccount: userMock.customerAccount,
      },
    })
  })

  it('should render the MyAccount page template', () => {
    mockIsAuthenticated = true
    jest.mock('@/context/AuthContext', () => ({
      useAuthContext: () => ({ user: mockCustomerAccount }),
    }))

    render(<MyAccountPage />, {
      wrapper: MyAccountTemplateMock,
    })

    const myAccountTemplate = screen.getByTestId('MyAccountTemplate-mock')
    console.log(myAccountTemplate.innerHTML)
    expect(myAccountTemplate).toBeVisible()
  })

  it('should not render MyAccountTemplate if not authenticated', () => {
    mockIsAuthenticated = false
    jest.mock('@/context/AuthContext', () => ({
      useAuthContext: () => ({ user: null }),
    }))
    render(<MyAccountPage customerAccount={null} />, {
      wrapper: createQueryClientWrapper(),
    })

    const myAccountTemplate = screen.queryByTestId('MyAccountTemplate-mock')
    expect(myAccountTemplate).not.toBeInTheDocument()
  })

  it('renders B2BTemplate when isB2bTemplate is true', () => {
    const values = {
      isAuthenticated: true,
      user: {
        id: 1,
        accountType: 'B2B',
      },
      login: jest.fn(),
      createAccount: jest.fn(),
      setUser: jest.fn(),
      logout: jest.fn(),
    }

    render(
      <AuthContext.Provider value={values}>
        <MyAccountPage />
      </AuthContext.Provider>
    )

    const b2bTemplate = screen.getByTestId('B2BTemplate-mock')
    expect(b2bTemplate).toBeInTheDocument()
  })
})
