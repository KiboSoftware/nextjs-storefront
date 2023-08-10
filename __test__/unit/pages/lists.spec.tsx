import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { createQueryClientWrapper } from '@/__test__/utils'
import ListsPage, { getServerSideProps } from '@/pages/my-account/b2b/lists'

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

const ListsTemplate = () => <div data-testid="lists-template-mock" />
jest.mock(
  '@/components/page-templates/B2B/ListsTemplate/ListsTemplate',
  () => () => ListsTemplate()
)

jest.mock('@/context/AuthContext', () => ({
  useAuthContext: () => ({ user: { id: 1001 } }),
}))

const mockNextI18Next = {
  initialI18nStore: { 'mock-locale': [{}], en: [{}] },
  initialLocale: 'mock-locale',
  userConfig: { i18n: [{}] },
}

describe('[page] Users Page', () => {
  it('should run getServerSideProps method', async () => {
    const context = {
      locale: 'mock-locale',
      req: {
        cookies: {
          kibo_at: '',
        },
      },
    }

    const response = await getServerSideProps(context as any)
    expect(response).toStrictEqual({
      props: {
        _nextI18Next: mockNextI18Next,
      },
    })
  })

  it('should render the ListsTemplate', () => {
    render(<ListsPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const listsTemplate = screen.getByTestId('lists-template-mock')
    expect(listsTemplate).toBeVisible()
  })
})
