import { NextApiRequest, NextApiResponse } from 'next'

import getB2BAccountHierarchy from '../../operations/get-b2b-account-hierarchy'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'

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

describe('getB2bAccountHierarchy API route', () => {
  it('should return b2b account hierarchy successfully', async () => {
    const req: jest.Mocked<NextApiRequest> = {
      cookies: {
        kibo_at: 'kibo_at',
      },
    } as unknown as jest.Mocked<NextApiRequest>
    const res = {} as NextApiResponse

    const response = await getB2BAccountHierarchy(req, res)

    expect(response).toEqual(b2BAccountHierarchyResult)
  })
})
