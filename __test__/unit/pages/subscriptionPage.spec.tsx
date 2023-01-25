import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { createQueryClientWrapper } from '@/__test__/utils'
import SubscriptionPage, { getServerSideProps } from '@/pages/my-account/subscription/index'

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

const SubscriptionListMock = () => <div data-testid="SubscriptionList-mock" />
jest.mock(
  '@/components/my-account/Subscription/SubscriptionList/SubscriptionList.tsx',
  () => () => SubscriptionListMock()
)

describe('[page] Subscription Page', () => {
  it('should run getServerSideProps method for subscription page', async () => {
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

  it('should render the SubscriptionPage', () => {
    render(<SubscriptionPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const SubscriptionList = screen.getByTestId('SubscriptionList-mock')
    expect(SubscriptionList).toBeVisible()
  })
})
