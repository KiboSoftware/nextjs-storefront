import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { NextApiRequest } from 'next'

import { productSearchResultMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'
import SearchPage, { getServerSideProps } from '@/pages/search'

const mockProductSearchData = productSearchResultMock

jest.mock('@/lib/api/operations', () => ({
  productSearch: jest.fn(() => {
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

const ProductListingTemplate = () => <div data-testid="productListingTemplate-mock" />
jest.mock(
  '@/components/page-templates/ProductListingTemplate/ProductListingTemplate.tsx',
  () => () => ProductListingTemplate()
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
      req: {} as NextApiRequest,
      res: { setHeader: jest.fn() },
    }

    const response = await getServerSideProps(context as any)

    expect(response).toStrictEqual({
      props: {
        results: mockProductSearchData,
        metaData: {
          canonicalUrl: null,
          description: null,
          keywords: null,
          robots: 'noindex,nofollow',
          title: 'Search Results',
        },
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
      },
    })
  })

  it('should render the Search page template', () => {
    render(<SearchPage results={mockProductSearchData} />, {
      wrapper: createQueryClientWrapper(),
    })

    const productListingTemplate = screen.getByTestId('productListingTemplate-mock')
    expect(productListingTemplate).toBeVisible()
  })
})
