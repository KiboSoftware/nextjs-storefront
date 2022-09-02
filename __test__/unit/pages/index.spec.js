import { render, screen } from '@testing-library/react'

import { categoryTreeDataMock } from '@/__mocks__/stories/categoryTreeDataMock'
import { cmsHomePageResultMock } from '@/__mocks__/stories/cmsHomePageResultMock'
import Home, { getServerSideProps } from '@/pages/index'

const CmsComponentMock = () => <div data-testid="cms-component" />
jest.mock('@/components/home/CmsComponent/CmsComponent', () => CmsComponentMock)
const mockCategoryTreeData = categoryTreeDataMock
const mockCmsHomePageResult = cmsHomePageResultMock
const mockCmsResultDataMock = {
  cmsPage: {
    components: mockCmsHomePageResult,
  },
}

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

jest.mock('@/lib/api/util', () => ({
  fetcher: jest.fn(() => {
    return Promise.resolve({
      data: {
        categoriesTree: { items: mockCategoryTreeData.categoriesTree?.items },
        cmsPage: mockCmsHomePageResult,
      },
    })
  }),
}))

jest.mock('@/lib/operations/get-page', () => ({
  getPage: jest.fn(() => {
    return Promise.resolve(mockCmsHomePageResult)
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

describe('Home', () => {
  const setup = (args) => {
    render(<Home {...args} />)
  }
  it('should run getServerSideProps method', () => {
    const context = {
      params: {},
      locale: 'mock-locale',
    }

    const response = getServerSideProps(context)
    expect(response).resolves.toStrictEqual({
      props: {
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
        categoriesTree: mockCategoryTreeData.categoriesTree.items,
        cmsPage: mockCmsHomePageResult,
      },
    })
  })

  it('renders without crashing', () => {
    setup(mockCmsResultDataMock)

    const CmsComponent = screen.getAllByTestId('cms-component')

    expect(CmsComponent.length).toEqual(mockCmsResultDataMock?.cmsPage?.components?.length)
  })
})
