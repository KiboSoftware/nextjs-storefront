import { useMutation } from 'react-query'

import { queryClient } from '@/react-query/queryClient'
import { querykeys } from '@/react-query/queryKeys'

import { OrderInput } from '@/lib/gql/types'

export interface PersonalInfo {
  orderId: string
  updateMode: string
  version?: string
  orderInput: OrderInput
}

const updatePersonalInfo = async (_personalInfo: PersonalInfo) => {
  // call the mutation
}

export const useUpdatePersonalInfo = () => {
  return useMutation(updatePersonalInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries([querykeys.LOAD_CHECKOUT])
    },
  })
}
