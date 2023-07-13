import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'

import { createQueryClientWrapper } from '@/__test__/utils'
import UsersPage, { getServerSideProps } from '@/pages/my-account/b2b/users'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { customerB2BUserKeys } from '@/lib/react-query/queryKeys'

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

const UserTableMock = () => <div data-testid="user-table-mock" />
jest.mock('@/components/my-account/User/UserTable/UserTable.tsx', () => () => UserTableMock())

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

  it('should render loader if b2b account user list not available', async () => {
    render(<UsersPage />, {
      wrapper: createQueryClientWrapper(),
    })
    const loader = await screen.getByRole('progressbar')
    expect(loader).toBeVisible()
  })

  it('should check if search bar is available', async () => {
    render(<UsersPage />, {
      wrapper: createQueryClientWrapper(),
    })
    const searchBar = await screen.getByPlaceholderText('user-search-placeholder')
    expect(searchBar).toBeVisible()
  })

  it('should render user table', async () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <UsersPage />
      </QueryClientProvider>,
      {
        wrapper: createQueryClientWrapper(),
      }
    )

    queryClient.setQueryData(
      customerB2BUserKeys.search(0, 5, '', 'isRemoved eq false'),
      customerB2BUserForPage0Mock
    )
    await waitFor(() => {
      const userTable = screen.getByTestId('user-table-mock')
      expect(userTable).toBeVisible()
    })
  })
})
