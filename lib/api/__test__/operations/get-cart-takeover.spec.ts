import { NextApiRequest } from 'next'

import getCartTakeover from '@/lib/api/operations/get-cart-takeover'
import { fetcher, getAdditionalHeader } from '@/lib/api/util'
import { getOneTimeSecretQuery as query } from '@/lib/gql/queries'

jest.mock('@/lib/api/util')
jest.mock('@/lib/gql/queries', () => ({
  getOneTimeSecretQuery: 'test-query',
}))

describe('getCartTakeover', () => {
  let req: NextApiRequest

  beforeEach(() => {
    req = {
      headers: {
        cookie: 'test-cookie',
      },
    } as NextApiRequest
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should make API call with headers when req is provided', async () => {
    const secretId = 'test-secret-id'
    const headers = { Authorization: 'Bearer test-token' }
    const response = { data: 'test-data' }

    ;(getAdditionalHeader as jest.Mock).mockReturnValue(headers)
    ;(fetcher as jest.Mock).mockResolvedValueOnce(response)

    const result = await getCartTakeover(secretId, req)

    expect(getAdditionalHeader).toHaveBeenCalledWith(req)
    expect(fetcher).toHaveBeenCalledWith(
      { query: 'test-query', variables: { secretId } },
      { headers }
    )
    expect(result).toEqual(response)
  })

  it('should make API call without headers when req is not provided', async () => {
    const secretId = 'test-secret-id'
    const response = { data: 'test-data' }

    ;(fetcher as jest.Mock).mockResolvedValueOnce(response)

    const result = await getCartTakeover(secretId, {} as NextApiRequest)

    expect(getAdditionalHeader).toHaveBeenCalled()
    expect(fetcher).toHaveBeenCalledWith(
      { query: 'test-query', variables: { secretId } },
      { headers: { Authorization: 'Bearer test-token' } }
    )
    expect(result).toEqual(response)
  })

  it('should handle fetcher errors', async () => {
    const secretId = 'test-secret-id'
    const error = new Error('Test Error')

    ;(fetcher as jest.Mock).mockRejectedValueOnce(error)

    await expect(getCartTakeover(secretId, req)).rejects.toThrow(error)

    expect(fetcher).toHaveBeenCalledWith(
      { query: 'test-query', variables: { secretId } },
      { headers: expect.any(Object) }
    )
  })
})
