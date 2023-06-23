import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { NextApiRequest } from 'next'

import { categoryTreeDataMock, productSearchResultMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'
import CategoryPage, { getStaticProps } from '@/pages/category/[...categorySlug]'

const mockCategoryTreeData = categoryTreeDataMock
const mockProductSearchData = productSearchResultMock
const mockCategoryTreeByCode = categoryTreeDataMock?.categoriesTree?.items?.find(
  (category) => category?.categoryCode === '40'
)

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { categorySlug: ['40'] },
    asPath: '/category/40',
  }),
}))

jest.mock('@/lib/api/operations', () => ({
  productSearch: jest.fn(() => {
    return mockProductSearchData
  }),
  getCategoryTree: jest.fn(() => {
    return mockCategoryTreeData?.categoriesTree?.items
  }),
  categoryTreeSearchByCode: jest.fn(() => {
    return [mockCategoryTreeByCode]
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

jest.mock('@/lib/api/util/getUserClaimsFromRequest.ts', () =>
  jest.fn(() => ({
    req: {
      headers: { 'x-vol-exclude-user-claims': 'mock-cookie' },
    },
  }))
)

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

describe('[page] Category Page', () => {
  // it('should run getStaticProps method', async () => {
  //   const context = {
  //     params: {
  //       categorySlug: ['40'],
  //     },
  //     req: {} as NextApiRequest,
  //     locale: 'mock-locale',
  //   }
  //   const response = await getStaticProps(context)
  //   expect(response).toStrictEqual({
  //     props: {
  //       results: mockProductSearchData,
  //       categoriesTree: mockCategoryTreeData.categoriesTree.items,
  //       categories: [mockCategoryTreeByCode],
  //       categoryCode: '40',
  //       seoFriendlyUrl: 'womens',
  //       metaInformation: {
  //         canonical: '/category/womens/40',
  //         metaTagDescription: 'metaTagDescription',
  //         metaTagKeywords: 'metaTagKeywords',
  //         metaTagTitle: 'metaTagTitle',
  //       },
  //       _nextI18Next: {
  //         initialI18nStore: { 'mock-locale': [{}], en: [{}] },
  //         initialLocale: 'mock-locale',
  //         userConfig: { i18n: [{}] },
  //       },
  //     },
  //     revalidate: 60,
  //   })
  // })
  // it('should render the Category page template', () => {
  //   CategoryPage.defaultProps = {
  //     results: productSearchResultMock,
  //     category: {
  //       categories: [],
  //     },
  //   }
  //   render(<CategoryPage />, {
  //     wrapper: createQueryClientWrapper(),
  //   })
  //   const productListingTemplate = screen.getByTestId('productListingTemplate-mock')
  //   expect(productListingTemplate).toBeVisible()
  // })
})
