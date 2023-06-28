import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { NextApiRequest } from 'next'

import { categoryTreeDataMock, productSearchResultMock } from '@/__mocks__/stories'
import ProductDetailPage, {
  getStaticPaths,
  getStaticProps,
} from '@/src/pages/product/[...productSlug]'

const mockCategoryTreeData = categoryTreeDataMock
const mockProduct = productSearchResultMock.items?.[0]
const context = {
  params: {
    productSlug: ['SHOE12'],
  },
  req: {} as NextApiRequest,
  locale: 'mock-locale',
}
let isFallback = false

jest.mock('next/router', () => ({
  useRouter: () => ({
    isFallback: isFallback,
    query: { productSlug: ['SHOE12'] },
    asPath: '/product/SHOE12',
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
      revalidate: 60,
      pageSize: 100,
      cacheKey: 'categoryTree',
      cacheTimeOut: 10000,
    },
  })
})
jest.mock('@/lib/api/operations', () => ({
  getProduct: jest.fn(() => {
    return mockProduct
  }),
  getCategoryTree: jest.fn(() => {
    return mockCategoryTreeData?.categoriesTree?.items
  }),
  productSearch: jest.fn(() => {
    return Promise.resolve({
      data: {
        products: {
          items: [
            {
              productCode: 'mocked-productCode-1',
            },
            {
              productCode: 'mocked-productCode-2',
            },
          ],
        },
      },
    })
  }),
}))

const ProductDetailTemplateMock = () => <div data-testid="productDetailTemplate-mock" />
jest.mock(
  '@/components/page-templates/ProductDetail/ProductDetailTemplate.tsx',
  () => () => ProductDetailTemplateMock()
)
const ProductDetailSkeletonMock = () => <div data-testid="productDetailSkeleton-mock" />
jest.mock(
  '@/components/page-templates/ProductDetail/ProductDetailSkeleton.tsx',
  () => () => ProductDetailSkeletonMock()
)

describe('[page] Product Details Page', () => {
  it('should run getStaticProps method', () => {
    const response = getStaticProps(context)
    expect(response).resolves.toStrictEqual({
      props: {
        product: mockProduct,
        categoriesTree: mockCategoryTreeData.categoriesTree.items,
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
      },
      revalidate: 60,
    })
  })

  it('should run getStaticPaths method', () => {
    const response = getStaticPaths()
    expect(response).resolves.toStrictEqual({
      paths: [`/product/mocked-productCode-1`, `/product/mocked-productCode-2`],
      fallback: true,
    })
  })

  it('should render the page not found if isFallback is false', () => {
    isFallback = false
    render(<ProductDetailPage />)

    const pageNotFound = screen.getByText('This page could not be found.')
    expect(pageNotFound).toBeVisible()
  })

  it('should render the Fallback page if isFallback is true', () => {
    isFallback = true
    render(<ProductDetailPage />)

    expect(screen.getByTestId(/productDetailSkeleton-mock/)).toBeVisible()
  })

  //TODO: fix this test with other conditions in routeHandle
  // it('should render the ProductDetail page template if isFallback is false', () => {
  //   isFallback = false
  //   ProductDetailPage.defaultProps = { product: mockProduct }
  //   render(<ProductDetailPage />)

  //   const productDetailTemplate = screen.getByText('productDetailTemplate-mock')
  //   expect(productDetailTemplate).toBeVisible()
  // })
})
