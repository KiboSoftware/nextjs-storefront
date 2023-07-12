import { renderHook, waitFor } from '@testing-library/react'

import { useGetCustomerAddresses } from './useGetCustomerAddresses'
import { userAddressMock } from '@/__mocks__/stories/userAddressMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetCustomerAddresses', () => {
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
        isMultiShipEnabled: true,
        customerAddressesPageSize: 50,
      },
      serverRuntimeConfig: {
        cacheKey: 'categoryTree',
        cacheTimeOut: 10000,
        isMultiShipEnabled: true,
      },
    })
  })

  it('should return customer saved contacts', async () => {
    const { result } = renderHook(() => useGetCustomerAddresses(1012), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() =>
      expect(result.current.data).toStrictEqual(userAddressMock.customerAccountContacts)
    )
  })
})
