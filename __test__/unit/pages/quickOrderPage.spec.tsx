import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { cartMock } from '@/__mocks__/stories/cartMock'
import { createQueryClientWrapper } from '@/__test__/utils'
import QuickOrderPage, { getServerSideProps } from '@/src/pages/my-account/b2b/quick-order'

const mockQuickOrderCart = cartMock

jest.mock('@/lib/api/util', () => ({
  fetcher: jest.fn(() => {
    return Promise.resolve({
      data: mockQuickOrderCart,
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

const QuickOrderTemplate = () => <div data-testid="quick-order-template-mock" />
jest.mock(
  '@/components/page-templates/B2B/QuickOrderTemplate/QuickOrderTemplate.tsx',
  () => () => QuickOrderTemplate()
)

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
      isMultiShipEnabled: false,
    },
    serverRuntimeConfig: {
      cacheKey: 'categoryTree',
      cacheTimeOut: 10000,
      isMultiShipEnabled: false,
    },
  })
})

describe('[page] Quick Order Page', () => {
  it('should run getServerSideProps method', async () => {
    const response = await getServerSideProps({ params: {} } as any)
    expect(response).toStrictEqual({
      props: {
        isMultiShipEnabled: false,
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
    render(<QuickOrderPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const quickOrderTemplate = screen.getByTestId('quick-order-template-mock')
    expect(quickOrderTemplate).toBeVisible()
  })
})
