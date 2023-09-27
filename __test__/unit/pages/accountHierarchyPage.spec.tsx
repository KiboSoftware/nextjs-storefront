import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { b2BAccountHierarchyResult, userMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'
import { buildAccountHierarchy } from '@/lib/helpers'
import AccountHierarchyPage, { getServerSideProps } from '@/pages/my-account/b2b/account-hierarchy'

const hierarchy = buildAccountHierarchy(b2BAccountHierarchyResult?.accounts, 123)
const testCookie = `eyJhY2Nlc3NUb2tlbiI6Ik1CQ1YwekRTWnQrc2tNZ3RoampCL0NWN2FnUkpCd2ZRL2p3di9pWCttVk0wYlJxYjRITlNQcm5sdGZzL3dValZpZTA4QkdYc3cyY2ZVeGtIaW82VmxmZjZTU3BpZXRUcGVFUDZXeEFDVVFSMFp1TTBiZnRuRjdwZFFnU3FtVXpDRWFGTW91UjF0cFBxNmZ3TmVOWkRqYmVBOWVrM1JTbyt2QzRzcEZtVGVQNS9JelZPNW9VWndpM0pFKy9mYTdWd2c0SkhlY0k5b01Ld3VEQ2EyRmRmNW9FVXVRd0lwd2JFZ1BYRUYzNGd0RkZvQUc2dzM0Yk13ZTdJOFljQnlxc2xlUlhBZUlhMzEwc1I5Zy9yQ1ZQYkdvWTNxVUhnM0VNNUk5RnAvM25pSXhIUXZ6WUhKUU51RU1NSEF0blU4WjZKR25Yb3RiMXlDZGpjcFcvbVZuTFNpaUhoMW5yc3F5L0VwMjZtRFBUUG1FdnZoNGRWcHhkR2JZM3d2ZDY0T294NHg0SEFNRk5WQ1RGTzZCUVVEc1o2ZlA2MmorWS9Ucy8rNzFaRGJOOSIsImFjY2Vzc1Rva2VuRXhwaXJhdGlvbiI6IjIwMjMtMDgtMjlUMTQ6MzE6MzUuODc2WiIsInJlZnJlc2hUb2tlbiI6ImZmNmRlMGUzYjJhMzQ3MDA5MjY4NjUzNWQ1NzBhYzQ1IiwidXNlcklkIjoiODZlNjEwYTRiNTY0NDgxOThiODd0MGU1ZDc0OThlYTMiLCJyZWZyZXNoVG9rZW5FeHBpcmF0aW9uIjoiMjAyMy0wOC0zMFQwOTowMzozMS4zMDZaIiwiYWNjb3VudElkIjoxNTY0fQ==`
jest.mock('@/lib/api/operations', () => ({
  getB2BAccountHierarchy: jest.fn(() =>
    Promise.resolve({
      accounts: b2BAccountHierarchyResult.accounts,
      hierarchy,
    })
  ),
  getCurrentUser: jest.fn(() => userMock),
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

const AccountHierarchyTemplateMock = () => <div data-testid="account-hierarchy-template-mock" />
jest.mock(
  '@/components/page-templates/B2B/AccountHierarchyTemplate/AccountHierarchyTemplate',
  () => () => AccountHierarchyTemplateMock()
)

const mockNextI18Next = {
  initialI18nStore: { 'mock-locale': [{}], en: [{}] },
  initialLocale: 'mock-locale',
  userConfig: { i18n: [{}] },
}

describe('[page] Account Hierarchy Page', () => {
  it('should run getServerSideProps method', async () => {
    const context = {
      locale: 'mock-locale',
      req: {
        cookies: {
          kibo_at: testCookie,
        },
      },
    }

    const response = await getServerSideProps(context as any)

    expect(response).toStrictEqual({
      props: {
        initialData: {
          accounts: b2BAccountHierarchyResult.accounts,
          hierarchy,
        },
        customerAccount: userMock.customerAccount,
        _nextI18Next: mockNextI18Next,
      },
    })
  })

  it('should render the Account Hierarchy page', () => {
    render(<AccountHierarchyPage />, {
      wrapper: createQueryClientWrapper(),
    })

    const usersTemplate = screen.getByTestId('account-hierarchy-template-mock')
    expect(usersTemplate).toBeVisible()
  })
})
