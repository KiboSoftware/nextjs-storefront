import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { createQueryClientWrapper } from '@/__test__/utils'
import OrderHistoryPage, { getServerSideProps } from '@/pages/my-account/order-history/index'

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

const orderHistoryTemplateMock = () => <div data-testid="orderHistoryTemplate-mock" />
jest.mock(
  '@/components/page-templates/OrderHistoryTemplate/OrderHistoryTemplate.tsx',
  () => () => orderHistoryTemplateMock()
)

describe('[page] Order History Page', () => {
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

  it('should render the Order History page template', () => {
    render(<OrderHistoryPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const orderHistoryTemplate = screen.getByTestId('orderHistoryTemplate-mock')
    expect(orderHistoryTemplate).toBeVisible()
  })
})
