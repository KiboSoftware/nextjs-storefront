import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { createMockRouter } from '../../utils/createMockRouter'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'
import CategoryPage, { getServerSideProps } from '@/pages/category/[categoryCode]'

jest.mock('@/lib/api/util', () => ({
  fetcher: jest.fn(() => {
    return Promise.resolve({
      data: {
        products: {
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
        },
        categoriesTree: [
          {
            categoryCode: 'mocked-category',
          },
        ],
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
  () => ProductListingTemplateMock
)

describe('[page] Category Page', () => {
  it('should run getServerSideProps method', async () => {
    const context = {
      query: {
        categoryCode: '40',
      },
      locale: 'mock-locale',
    }

    const response = await getServerSideProps(context)
    expect(response).toStrictEqual({
      props: {
        results: {
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
        },
        categoriesTree: [
          {
            categoryCode: 'mocked-category',
          },
        ],
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
      },
    })
  })

  it('should render the Category page template', () => {
    const router = createMockRouter()
    const onLoadCategoriesTree = jest.fn()
    render(
      <RouterContext.Provider value={router}>
        <CategoryPage onLoadCategoriesTree={onLoadCategoriesTree} />
      </RouterContext.Provider>,
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    const productListingTemplate = screen.getByTestId('productListingTemplate-mock')
    expect(productListingTemplate).toBeVisible()
  })
})
