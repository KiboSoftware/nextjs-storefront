import { categoryTreeDataMock } from '@/__mocks__/stories/categoryTreeDataMock'
import { homePageResultMock } from '@/__mocks__/stories/homePageResultMock'
import { getServerSideProps } from '@/pages/index'

const mockCategoryTreeData = categoryTreeDataMock
const mockHomePageResult = homePageResultMock || []

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
      amplience: {
        hubName: 'kibo',
      },
    },
    serverRuntimeConfig: {
      cacheKey: 'categoryTree',
      cacheTimeOut: 10000,
    },
  })
})

jest.mock('@/cms/operations/get-page', () => ({
  getPage: jest.fn().mockImplementation(() => 'cmsPage'),
}))

jest.mock('@/lib/api/util', () => ({
  fetcher: jest.fn(() => {
    return Promise.resolve({
      data: {
        categoriesTree: { items: mockCategoryTreeData.categoriesTree?.items },
        carouselItem: mockHomePageResult,
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

describe('Home', () => {
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
        cmsPage: 'cmsPage',
      },
    })
  })
})
