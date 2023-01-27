import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { createQueryClientWrapper } from '@/__test__/utils'
import WishlistPage, { getServerSideProps } from '@/pages/wishlist'

const WishlistTemplateMock = () => <div data-testid="wishlistTemplate-mock" />
jest.mock(
  '@/components/page-templates/WishlistTemplate/WishlistTemplate.tsx',
  () => () => WishlistTemplateMock()
)

const LoginDialogMock = () => <div data-testid="loginDialog-mock" />
jest.mock('@/components/layout/Login/LoginDialog/LoginDialog.tsx', () => () => LoginDialogMock())

jest.mock('@/lib/helpers/cookieHelper', () => ({
  decodeParseCookieValue: jest.fn(() => 'kibo_at'),
}))

let mockIsAuthenticated = true
jest.mock('@/context/AuthContext', () => ({
  useAuthContext: () => ({ isAuthenticated: mockIsAuthenticated }),
}))

const mockNextI18Next = {
  initialI18nStore: { 'mock-locale': [{}], en: [{}] },
  initialLocale: 'mock-locale',
  userConfig: { i18n: [{}] },
}

jest.mock('next-i18next/serverSideTranslations', () => ({
  serverSideTranslations: jest.fn(() => {
    return Promise.resolve({
      _nextI18Next: mockNextI18Next,
    })
  }),
}))

describe('[page] Wishlist Page', () => {
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
        isAuthenticated: true,
        _nextI18Next: mockNextI18Next,
      },
    })
  })

  it('should render the Wishlist page template', () => {
    mockIsAuthenticated = false
    render(<WishlistPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const loginDialog = screen.getByTestId('loginDialog-mock')
    expect(loginDialog).toBeVisible()
  })

  it('should render the Wishlist page template', () => {
    mockIsAuthenticated = true
    render(<WishlistPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const wishlistTemplate = screen.getByTestId('wishlistTemplate-mock')
    expect(wishlistTemplate).toBeVisible()
  })
})
