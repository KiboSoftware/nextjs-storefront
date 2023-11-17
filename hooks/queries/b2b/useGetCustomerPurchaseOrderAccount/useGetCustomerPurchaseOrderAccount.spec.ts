import { renderHook, waitFor } from '@testing-library/react'

import { useGetCustomerPurchaseOrderAccount } from './useGetCustomerPurchaseOrderAccount'
import { customerPurchaseOrderMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useGetCustomerPurchaseOrderAccount', () => {
  it('should return customer purchase order account data', async () => {
    const { result } = renderHook(() => useGetCustomerPurchaseOrderAccount(1012, true), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() =>
      expect(result.current.data).toStrictEqual(
        customerPurchaseOrderMock.customerPurchaseOrderAccount
      )
    )
  })
})
