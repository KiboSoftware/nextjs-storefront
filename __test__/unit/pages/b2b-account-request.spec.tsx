import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { createQueryClientWrapper } from '@/__test__/utils'
import B2BAccountRequestPage, { getServerSideProps } from '@/pages/b2b-account-request'

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

// const AccountHierarchyFormMock = () => <div data-testid="account-hierarchy-form-mock" />
// jest.mock(
//   '@/components/b2b/AccountHierarchy/AccountHierarchyForm/AccountHierarchyForm',
//   () => () => AccountHierarchyFormMock()
// )

const mockNextI18Next = {
  initialI18nStore: { 'mock-locale': [{}], en: [{}] },
  initialLocale: 'mock-locale',
  userConfig: { i18n: [{}] },
}

describe('[page] B2B Account Request Page', () => {
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

  it('should render page', () => {
    render(<B2BAccountRequestPage />, {
      wrapper: createQueryClientWrapper(),
    })
  })
})
