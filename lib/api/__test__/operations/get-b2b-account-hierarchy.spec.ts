import { NextApiRequest, NextApiResponse } from 'next'

import getB2BAccountHierarchy from '../../operations/get-b2b-account-hierarchy'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
import { buildAccountHierarchy } from '@/lib/helpers'

// Mock fetcher and getUserClaimsFromRequest
jest.mock('@/lib/api/util', () => ({
  getUserClaimsFromRequest: () => jest.fn(),
  getAdditionalHeader: () => jest.fn(),
  fetcher: jest.fn(() =>
    Promise.resolve({ data: { getB2BAccountHierarchy: b2BAccountHierarchyResult } })
  ),
}))

jest.mock('next/config', () => {
  return () => {
    return {
      publicRuntimeConfig: {
        userCookieKey: 'kibo_at',
      },
    }
  }
})
const testCookie = `eyJhY2Nlc3NUb2tlbiI6Ik1CQ1YwekRTWnQrc2tNZ3RoampCL0NWN2FnUkpCd2ZRL2p3di9pWCttVk0wYlJxYjRITlNQcm5sdGZzL3dValZpZTA4QkdYc3cyY2ZVeGtIaW82VmxmZjZTU3BpZXRUcGVFUDZXeEFDVVFSMFp1TTBiZnRuRjdwZFFnU3FtVXpDRWFGTW91UjF0cFBxNmZ3TmVOWkRqYmVBOWVrM1JTbyt2QzRzcEZtVGVQNS9JelZPNW9VWndpM0pFKy9mYTdWd2c0SkhlY0k5b01Ld3VEQ2EyRmRmNW9FVXVRd0lwd2JFZ1BYRUYzNGd0RkZvQUc2dzM0Yk13ZTdJOFljQnlxc2xlUlhBZUlhMzEwc1I5Zy9yQ1ZQYkdvWTNxVUhnM0VNNUk5RnAvM25pSXhIUXZ6WUhKUU51RU1NSEF0blU4WjZKR25Yb3RiMXlDZGpjcFcvbVZuTFNpaUhoMW5yc3F5L0VwMjZtRFBUUG1FdnZoNGRWcHhkR2JZM3d2ZDY0T294NHg0SEFNRk5WQ1RGTzZCUVVEc1o2ZlA2MmorWS9Ucy8rNzFaRGJOOSIsImFjY2Vzc1Rva2VuRXhwaXJhdGlvbiI6IjIwMjMtMDgtMjlUMTQ6MzE6MzUuODc2WiIsInJlZnJlc2hUb2tlbiI6ImZmNmRlMGUzYjJhMzQ3MDA5MjY4NjUzNWQ1NzBhYzQ1IiwidXNlcklkIjoiODZlNjEwYTRiNTY0NDgxOThiODd0MGU1ZDc0OThlYTMiLCJyZWZyZXNoVG9rZW5FeHBpcmF0aW9uIjoiMjAyMy0wOC0zMFQwOTowMzozMS4zMDZaIiwiYWNjb3VudElkIjoxNTY0fQ==`

describe('getB2bAccountHierarchy API route', () => {
  it('should return b2b account hierarchy successfully', async () => {
    const req: jest.Mocked<NextApiRequest> = {
      cookies: {
        kibo_at: testCookie,
      },
    } as unknown as jest.Mocked<NextApiRequest>
    const res = {} as NextApiResponse

    const response = await getB2BAccountHierarchy(req, res)

    const hierarchy = buildAccountHierarchy(b2BAccountHierarchyResult?.accounts, 123)
    jest.mock('@/lib/api/operations', () => ({
      getB2BAccountHierarchy: jest.fn(() =>
        Promise.resolve({
          accounts: b2BAccountHierarchyResult.accounts,
          hierarchy,
        })
      ),
    }))

    expect(response).toEqual({
      accounts: b2BAccountHierarchyResult.accounts,
      hierarchy,
    })
  })
})
