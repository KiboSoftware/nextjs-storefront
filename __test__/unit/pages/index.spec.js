import { render, screen } from '@testing-library/react'

import { categoryTreeDataMock } from '@/__mocks__/stories/categoryTreeDataMock'
import Home, { getStaticProps } from '@/pages/index'

const mockCategoryTreeData = categoryTreeDataMock

jest.mock('@/lib/api/util', () => ({
  fetcher: jest.fn(() => {
    return Promise.resolve({
      data: {
        categoriesTree: { items: mockCategoryTreeData.categoriesTree?.items },
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
  it('should run getStaticProps method', () => {
    const context = {
      params: {},
      locale: 'mock-locale',
    }

    const response = getStaticProps(context)
    expect(response).resolves.toStrictEqual({
      props: {
        categoriesTree: mockCategoryTreeData.categoriesTree.items,
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
      },
    })
  })

  it('renders without crashing', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { name: 'Welcome to Next.js!' })).toBeInTheDocument()
  })
})
