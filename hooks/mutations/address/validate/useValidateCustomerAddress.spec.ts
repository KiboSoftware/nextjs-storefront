import { renderHook } from '@testing-library/react'

import { useValidateCustomerAddress } from './useValidateCustomerAddress'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useValidateCustomerAddress', () => {
  it('should use useValidateCustomerAddress ', async () => {
    const { result } = renderHook(() => useValidateCustomerAddress(), {
      wrapper: createQueryClientWrapper(),
    })

    const response = await result.current.validateCustomerAddress.mutateAsync({
      addressValidationRequestInput: {
        address: {
          address1: 'mock-address1',
        },
      },
    })

    expect(response).toStrictEqual('mock-validated-data')
  })
})
