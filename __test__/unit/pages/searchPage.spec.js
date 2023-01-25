import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { createQueryClientWrapper } from '@/__test__/utils'
import SearchPage, { getServerSideProps } from '@/pages/search'

const mockProductSearchData = {
  totalCount: 1,
  pageSize: 20,
  pageCount: 3,
  startIndex: 0,
  items: [
    {
      productCode: 'Jacket12',
      productUsage: 'Configurable',
      isPackagedStandAlone: false,
    },
  ],
  facets: [],
}
jest.mock('@/lib/api/util', () => ({
  fetcher: jest.fn(() => {
    return Promise.resolve({
      data: {
        products: mockProductSearchData,
      },
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

const ProductListingTemplateMock = () => <div data-testid="productListingTemplate-mock" />
jest.mock(
  '@/components/page-templates/ProductListingTemplate/ProductListingTemplate.tsx',
  () => () => ProductListingTemplateMock()
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
    },
    serverRuntimeConfig: {
      cacheKey: 'categoryTree',
      cacheTimeOut: 10000,
    },
  })
})

describe('[page] Search Page', () => {
  it('should run getServerSideProps method', async () => {
    const context = {
      query: {
        search: 'jacket',
      },
      locale: 'mock-locale',
      res: { setHeader: jest.fn() },
    }

    const response = await getServerSideProps(context)

    expect(response).toStrictEqual({
      props: {
        results: mockProductSearchData,
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
      },
    })
  })

  it('should render the Search page template', () => {
    render(<SearchPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const productListingTemplate = screen.getByTestId('productListingTemplate-mock')
    expect(productListingTemplate).toBeVisible()
  })
})
