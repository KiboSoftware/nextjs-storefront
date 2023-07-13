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
    MyAccountPage.defaultProps = { isAuthenticated: mockIsAuthenticated }
    jest.mock('@/context/AuthContext', () => ({
      useAuthContext: () => ({ user: null }),
    }))
    render(<MyAccountPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const myAccountTemplate = screen.queryByTestId('MyAccountTemplate-mock')
    expect(myAccountTemplate).not.toBeInTheDocument()
  })
})
