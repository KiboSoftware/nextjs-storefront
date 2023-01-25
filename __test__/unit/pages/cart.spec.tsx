import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { cartMock } from '@/__mocks__/stories/cartMock'
import { createQueryClientWrapper } from '@/__test__/utils'
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

jest.mock('@/components/page-templates/CartTemplate/CartTemplate', () => ({
  __esModule: true,
  default: () => <div data-testid="cart-template-mock" />,
}))

jest.mock('@/lib/api/util/getUserClaimsFromRequest.ts', () => jest.fn(() => null))

jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      maxCookieAge: 0,
      productListing: {
        sortOptions: [
          { value: 'Best Match', id: '' },
          { value: 'Price: Low to High', id: 'price asc' },
          { value: 'Price: High to Low', id: 'price desc' },
          { value: 'Latest', id: 'createDate desc' },
          { value: 'Oldest', id: 'createDate asc' },
        ],
        pageSize: 16,
      },
      isMultiShipEnabled: true,
    },
    serverRuntimeConfig: {
      cacheKey: 'categoryTree',
      cacheTimeOut: 10000,
      isMultiShipEnabled: true,
    },
  })
})

describe('[page] Cart Page', () => {
  it('should run getServerSideProps method', async () => {
    const response = await getServerSideProps({ params: {} } as any)
    expect(response).toStrictEqual({
      props: {
        isMultiShipEnabled: true,
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
    render(<CartPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const cartTemplate = screen.getByTestId('cart-template-mock')
    expect(cartTemplate).toBeVisible()
  })
})
