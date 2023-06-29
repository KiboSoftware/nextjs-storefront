import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { createQueryClientWrapper } from '@/__test__/utils'
import ResetPasswordConfirmationPage, {
  getServerSideProps,
} from '@/pages/user/resetpasswordconfirm/index'

const customerAccountsMock = {
  customerAccounts: {
    items: [
      {
        userId: 'mock-user-id',
        userName: 'mock-user-name',
        firstName: 'mock-first-name',
        lastName: 'mock-last-name',
      },
    ],
  },
}

jest.mock('@/lib/api/operations', () => ({
  getCustomerAccount: jest.fn(() => {
    return customerAccountsMock
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

const ResetPasswordConfirmationTemplate = () => (
  <div data-testid="reset-password-confirm-template-mock" />
)
jest.mock(
  '@/components/page-templates/ResetPasswordConfirmationTemplate/ResetPasswordConfirmationTemplate.tsx',
  () => () => ResetPasswordConfirmationTemplate()
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
      isMultiShipEnabled: true,
    },
  })
})

describe('[page] Reset Password Confirm Page', () => {
  it('should run getServerSideProps method', async () => {
    const response = await getServerSideProps({ params: {} } as any)
    expect(response).toStrictEqual({
      props: {
        customerAccount: customerAccountsMock,
        _nextI18Next: {
          initialI18nStore: { 'mock-locale': [{}], en: [{}] },
          initialLocale: 'mock-locale',
          userConfig: { i18n: [{}] },
        },
      },
    })
  })

  it('should render the reset password confirmation template', () => {
    render(<ResetPasswordConfirmationPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const resetPasswordTemplate = screen.getByTestId('reset-password-confirm-template-mock')
    expect(resetPasswordTemplate).toBeVisible()
  })
})
