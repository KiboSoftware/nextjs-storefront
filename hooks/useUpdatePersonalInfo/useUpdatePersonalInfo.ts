import { useMutation } from 'react-query'
import { useQueryClient } from 'react-query'

import { mockCheckout } from '../../__mocks__/msw/mockData'
import { OrderInput } from '../../lib/gql/types'
import { querykeys } from '../../react-query/queryKeys'
export interface PersonalInfo {
  orderId: string
  updateMode: string
  version?: string
  orderInput: OrderInput
}

const updatePersonalInfo = async (_personalInfo: PersonalInfo) => {
  return mockCheckout
}

export const useUpdatePersonalInfo = () => {
  const queryClient = useQueryClient()

  return useMutation(updatePersonalInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries([querykeys.LOAD_CHECKOUT])
    },
  })
}
