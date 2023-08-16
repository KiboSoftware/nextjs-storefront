import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { quoteMock } from '@/__mocks__/stories'
import { RQNotificationContextProvider } from '@/context'
import * as operations from '@/lib/api/operations'
import QuotePage, { getServerSideProps } from '@/src/pages/my-account/quote/[quoteId]'

import { Quote } from '@/lib/gql/types'

const mockOperations = operations as {
  getQuote(quoteId: string, draft: boolean, req: any, res: any): Promise<Quote>
}

const context = {
  params: {
    quoteId: 'quote-id',
  },
  req: {
    headers: { 'x-forwarded-for': '127.0.0.0' },
    cookies: {
      kibo_at: '',
    },
  },
  locale: 'mock-locale',
}

jest.mock('@/lib/api/operations', () => ({
  __esModule: true,
  getQuote: jest.fn(),
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

const CreateNewQuoteTemplate = () => <div data-testid="create-new-quote-template-mock" />
jest.mock(
  '@/components/page-templates/B2B/CreateNewQuoteTemplate/CreateNewQuoteTemplate.tsx',
  () => () => CreateNewQuoteTemplate()
)

jest.mock('@/lib/api/util/getUserClaimsFromRequest.ts', () => jest.fn(() => null))

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
      isMultiShipEnabled: false,
    },
  })
})

describe('[page] Quote Page', () => {
  it('should run getServerSideProps method', async () => {
    const mockQuote = { quoteId: 'quote-id' }
    mockOperations.getQuote = jest.fn().mockImplementationOnce(async () => mockQuote)
    const response = await getServerSideProps(context as any)
    expect(response).toStrictEqual({
      props: {
        quote: mockQuote,
        quoteId: 'quote-id',
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
      },
    })
  })

  it('should render the create new quote template', () => {
    const props = {
      quoteId: 'quote-id',
      quote: quoteMock?.items?.[0] as Quote,
    }
    render(
      <RQNotificationContextProvider>
        <QuotePage {...props} />
      </RQNotificationContextProvider>
    )

    const createNewQuote = screen.getByTestId('create-new-quote-template-mock')
    expect(createNewQuote).toBeVisible()
  })
})
