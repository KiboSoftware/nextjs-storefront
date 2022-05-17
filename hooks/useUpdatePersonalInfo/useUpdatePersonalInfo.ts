import { useMutation, useQueryClient } from 'react-query'

import { orderMock } from '../../__mocks__/stories/orderMock'
import { OrderInput } from '../../lib/gql/types'
import { querykeys } from '../../lib/react-query/queryKeys'
export interface PersonalInfo {
  orderId: string
  updateMode: string
  version?: string
  orderInput: OrderInput
}

const updatePersonalInfo = async (_personalInfo: PersonalInfo) => {
  return orderMock
}

export const useUpdatePersonalInfo = () => {
  const queryClient = useQueryClient()

  return useMutation(updatePersonalInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries([querykeys.LOAD_CHECKOUT])
    },
  })
}
