import '@testing-library/jest-dom'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextApiRequest } from 'next'
import getConfig from 'next/config'

import { userMock } from '@/__mocks__/stories'
import { quotesMock } from '@/__mocks__/stories/quotesMock'
import { renderWithQueryClient } from '@/__test__/utils'
import ManageQuotesPage, { getServerSideProps } from '@/pages/my-account/b2b/seller/manage-quotes'

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

jest.mock('@/components/page-templates/B2B/QuotesTemplate/QuotesTemplate.tsx', () => ({
  __esModule: true,
  default: ({ quoteCollection, sortingValues, filters, setQuotesSearchParam }: any) => (
    <div data-testid="QuotesTemplate-mock">
      <div data-testid="quoteCollection">{JSON.stringify(quoteCollection)}</div>
      <div data-testid="sortingValues">{JSON.stringify(sortingValues)}</div>
      <div data-testid="filters">{JSON.stringify(filters)}</div>
      <button
        onClick={() => {
          setQuotesSearchParam({ filter: 'name cont quote' })
        }}
      >
        setQuotesSearchParam
      </button>
    </div>
  ),
}))

jest.mock('@/components/b2b/seller/AccountsTable/AccountsTable.tsx', () => ({
  __esModule: true,
  default: ({ b2bContacts, setB2BContactsSearchParam }: any) => (
    <div data-testid="AccountsTable-mock"></div>
  ),
}))

jest.mock('@/lib/helpers/cookieHelper', () => ({
  decodeParseCookieValue: jest.fn(() => ({
    userId: 'mock-sales-rep-id',
  })),
}))

jest.mock('@/lib/api/operations', () => ({
  getQuotes: () => ['quotesMock'],
  getB2BContacts: () => ({
    b2bContactsResponse: 'b2bContactsResponse',
  }),
}))

const user = userEvent.setup()

const { publicRuntimeConfig } = getConfig()

describe('[page] B2B Seller Manage Quotes Page', () => {
  it('should run getServerSideProps method', async () => {
    const context = {
      locale: 'mock-locale',
      req: {
        cookies: {
          kibo_at: 'mock-cookie',
        },
      },
    }

    const response = await getServerSideProps(context as any)
    expect(response).toStrictEqual({
      props: {
        quotes: ['quotesMock'],
        b2bContactsCollection: { b2bContactsResponse: 'b2bContactsResponse' },
        salesRepUserId: 'mock-sales-rep-id',
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
      },
    })
  })

  it('should render the Quotes page template', async () => {
    const sortingValuesMock = {
      options: publicRuntimeConfig.B2BQuotes.sortOptions,
      selected: 'number desc',
    }

    renderWithQueryClient(
      <ManageQuotesPage
        quotes={quotesMock}
        b2bContactsCollection={''}
        salesRepUserId="mock-sales-rep-id"
      />
    )

    const QuotesTemplate = screen.getByTestId('QuotesTemplate-mock')

    expect(QuotesTemplate).toBeVisible()

    expect(screen.getByTestId('sortingValues')).toHaveTextContent(JSON.stringify(sortingValuesMock))
    expect(screen.getByTestId('filters')).toHaveTextContent(
      JSON.stringify({
        name: '',
        number: '',
        expirationDate: '',
        status: '',
        others: ``,
      })
    )

    await waitFor(() => {
      expect(screen.getByTestId('quoteCollection')).toHaveTextContent(JSON.stringify(quotesMock))
    })

    expect(screen.getByRole('button', { name: /setQuotesSearchParam/i })).toBeVisible()

    await user.click(screen.getByRole('button', { name: /setQuotesSearchParam/i }))

    expect(screen.getByTestId('filters')).toHaveTextContent(
      JSON.stringify({
        name: 'quote',
        number: '',
        expirationDate: '',
        status: '',
        others: '',
      })
    )
  })

  it('should render the AccountsTable component', async () => {
    renderWithQueryClient(
      <ManageQuotesPage
        quotes={quotesMock}
        b2bContactsCollection={''}
        salesRepUserId="mock-sales-rep-id"
      />
    )

    const AccountsTable = screen.getByTestId('AccountsTable-mock')

    expect(AccountsTable).toBeVisible()
  })
})
