import { render, screen } from '@testing-library/react'

import { categoryTreeDataMock } from '@/__mocks__/stories/categoryTreeDataMock'
import { cmsHomePageResultMock } from '@/__mocks__/stories/cmsHomePageResultMock'
import Home, { getStaticProps } from '@/pages/index'

const CmsComponentMock = () => <div data-testid="cms-component" />
jest.mock('@/components/home/CmsComponent/CmsComponent', () => CmsComponentMock)
const mockCategoryTreeData = categoryTreeDataMock
const mockCmsHomePageResult = cmsHomePageResultMock
const mockCmsResultDataMock = {
  cmsPage: {
    components: mockCmsHomePageResult,
  },
}

jest.mock('@/lib/api/util', () => ({
  fetcher: jest.fn(() => {
    return Promise.resolve({
      data: {
        categoriesTree: { items: mockCategoryTreeData.categoriesTree?.items },
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

jest.mock('next/config', () => {
  return () => {
    return {
      serverRuntimeConfig: {
        cacheKey: 'categoryTree',
        cacheTimeOut: 10000,
      },
    }
  }
})

describe('Home', () => {
  const setup = (args) => {
    render(<Home {...args} />)
  }
  it('should run getStaticProps method', () => {
    const context = {
      params: {},
      locale: 'mock-locale',
    }

    const response = getStaticProps(context)
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
