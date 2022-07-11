import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { cartMock } from '@/__mocks__/stories/cartMock'
import { createMockRouter, createQueryClientWrapper } from '@/__test__/utils'
import CartPage, { getServerSideProps } from '@/pages/cart'

const mockCart = cartMock

jest.mock('@/lib/api/util', () => ({
  fetcher: jest.fn(() => {
    return Promise.resolve({
      data: mockCart,
    })
  }),
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

const CartTemplateMock = () => <div data-testid="cart-template-mock" />
jest.mock('@/components/page-templates/cartTemplate/cartTemplate.tsx', () => CartTemplateMock)

jest.mock('@/lib/api/util/getUserClaimsFromRequest.ts', () => jest.fn(() => null))

describe('[page] Cart Page', () => {
  it('should run getServerSideProps method', async () => {
    const response = await getServerSideProps({ params: {} } as any)
    expect(response).toStrictEqual({
      props: {
        cart: cartMock?.currentCart,
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
      },
    })
  })

  it('should render the cart template and order summary', () => {
    const router = createMockRouter()
    render(
      <RouterContext.Provider value={router}>
        <CartPage />
      </RouterContext.Provider>,
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    const cartTemplate = screen.getByTestId('cart-template-mock')
    expect(cartTemplate).toBeVisible()
  })
})
