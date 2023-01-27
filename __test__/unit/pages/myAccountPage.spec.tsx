import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { createQueryClientWrapper } from '@/__test__/utils'
import MyAccountPage, { getServerSideProps } from '@/pages/my-account/index'

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

const MyAccountTemplateMock = () => <div data-testid="MyAccountTemplate-mock" />
jest.mock(
  '@/components/page-templates/MyAccountTemplate/MyAccountTemplate.tsx',
  () => () => MyAccountTemplateMock()
)

describe('[page] MyAccount Page', () => {
  it('should run getServerSideProps method', async () => {
    const context = {
      locale: 'mock-locale',
    }

    const response = await getServerSideProps(context as any)
    expect(response).toStrictEqual({
      props: {
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
      },
    })
  })

  it('should render the MyAccount page template', () => {
    render(<MyAccountPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const myAccountTemplate = screen.getByTestId('MyAccountTemplate-mock')
    expect(myAccountTemplate).toBeVisible()
  })
})
