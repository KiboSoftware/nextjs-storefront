import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { orderMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'
import OrderConfirmationPage, { getServerSideProps } from '@/pages/order-confirmation'

// const mockCart = cartMock

jest.mock('@/lib/api/operations', () => ({
  getCheckout: jest.fn(() => orderMock.checkout),
  getMultiShipCheckout: jest.fn(),
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
      isMultiShipEnabled: false,
    },
    serverRuntimeConfig: {
      cacheKey: 'categoryTree',
      cacheTimeOut: 10000,
      isMultiShipEnabled: false,
    },
  })
})

const OrderConfirmationMock = () => <div data-testid="order-confirmation-template-mock" />
jest.mock(
  '@/components/order/OrderConfirmation/OrderConfirmation.tsx',
  () => () => OrderConfirmationMock()
)

describe('[page] Order Confirmation Page', () => {
  it('should run getServerSideProps method', async () => {
    const response = await getServerSideProps({ query: { checkoutId: 'mock-id' } } as any)
    expect(response).toStrictEqual({
      props: {
        isMultiShipEnabled: false,
        checkout: orderMock.checkout,
        checkoutId: 'mock-id',
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
      },
    })
  })

  it('should render the OrderConfirmation template', () => {
    render(<OrderConfirmationPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const orderConfirmationTemplate = screen.getByTestId('order-confirmation-template-mock')
    expect(orderConfirmationTemplate).toBeVisible()
  })
})
