import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { customerB2BUserForPage0Mock, quoteMock } from '@/__mocks__/stories'
import { RQNotificationContextProvider } from '@/context'
import * as operations from '@/lib/api/operations'
import QuotePage, { getServerSideProps } from '@/src/pages/my-account/b2b/quote/[quoteId]'

import { B2BUserCollection, Quote } from '@/lib/gql/types'

const mockOperations = operations as {
  getQuote(quoteId: string, draft: boolean, req: any, res: any): Promise<Quote>
  getB2BUsers(req: any, res: any): Promise<B2BUserCollection>
}

const context = {
  query: {
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
  getB2BUsers: jest.fn(),
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

const QuoteDetailsTemplate = () => <div data-testid="quote-details-template-mock" />
jest.mock(
  '@/components/page-templates/B2B/QuoteDetailsTemplate/QuoteDetailsTemplate.tsx',
  () => () => QuoteDetailsTemplate()
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
    const mockB2BUsers = customerB2BUserForPage0Mock
    mockOperations.getQuote = jest.fn().mockImplementationOnce(async () => mockQuote)
    mockOperations.getB2BUsers = jest.fn().mockImplementation(async () => mockB2BUsers)
    const response = await getServerSideProps(context as any)
    expect(response).toStrictEqual({
      props: {
        quote: mockQuote,
        quoteId: 'quote-id',
        currentB2BUser: customerB2BUserForPage0Mock,
        b2bUsers: customerB2BUserForPage0Mock,
        mode: '',
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
      },
    })
  })

  it('should render the quote details template', () => {
    const props = {
      quoteId: 'quote-id',
      quote: quoteMock?.items?.[0] as Quote,
      mode: '',
      currentB2BUser: customerB2BUserForPage0Mock,
      b2bUsers: customerB2BUserForPage0Mock,
    }
    render(
      <RQNotificationContextProvider>
        <QuotePage {...props} />
      </RQNotificationContextProvider>
    )

    const createNewQuote = screen.getByTestId('quote-details-template-mock')
    expect(createNewQuote).toBeVisible()
  })
})
