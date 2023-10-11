import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { NextApiRequest } from 'next'

import { categoryTreeDataMock, productSearchResultMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'
import CategoryPage, { getStaticProps } from '@/src/pages/category/[categoryCode]'

import { PrCategory } from '@/lib/gql/types'

const mockCategoryTreeData = categoryTreeDataMock
const mockProductSearchData = productSearchResultMock
const mockCategoryTreeByCode = categoryTreeDataMock?.categoriesTree?.items
  ?.filter((category) => category?.categoryCode === '40')
  .map((category) => {
    return {
      categories: [category],
      metaInformation: {
        metaTagTitle: category?.content?.metaTagTitle,
        metaTagDescription: category?.content?.metaTagDescription,
        metaTagKeywords: category?.content?.metaTagKeywords,
        canonical: '/category/womens/40',
      },
      seoFriendlyUrl: category?.content?.slug,
    }
  }) as { categories: PrCategory[] }[]

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { categorySlug: ['40'] },
    asPath: '/category/40',
  }),
}))

jest.mock('@/lib/api/operations', () => ({
  productSearch: jest.fn(() => {
    return {
      data: {
        products: mockProductSearchData,
      },
    }
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

const categoryTypeProps = {
  results: mockProductSearchData,
  categoriesTree: mockCategoryTreeData.categoriesTree.items as PrCategory[],
  category: mockCategoryTreeByCode?.[0],
  categoryCode: '40',
  metaData: {
    canonicalUrl: null,
    description: 'metaTagDescription',
    keywords: 'metaTagKeywords',
    robots: null,
    title: 'metaTagTitle',
  },
  _nextI18Next: {
    initialI18nStore: { 'mock-locale': [{}], en: [{}] },
    initialLocale: 'mock-locale',
    userConfig: { i18n: [{}] },
  },
}

describe('[page] Category Page', () => {
  it('should run getStaticProps method', async () => {
    const context = {
      params: {
        categorySlug: ['40'],
      },
      req: {} as NextApiRequest,
      locale: 'mock-locale',
    }
    const response = await getStaticProps(context)
    expect(response).toStrictEqual({
      props: categoryTypeProps,
      revalidate: 60,
    })
  })

  it.only('should return 404 if category slugs length > 2', async () => {
    const context = {
      params: {
        categorySlug: ['en', 'gift-card', '40'],
      },
      req: {} as NextApiRequest,
      locale: 'mock-locale',
    }
    const response = await getStaticProps(context)
    expect(response).toStrictEqual({ notFound: true })
  })

  it('should render the Category page template', () => {
    render(<CategoryPage {...categoryTypeProps} />, {
      wrapper: createQueryClientWrapper(),
    })
    const productListingTemplate = screen.getByTestId('productListingTemplate-mock')
    expect(productListingTemplate).toBeVisible()
  })
})
