import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCustomerData } from '@/lib/gql/mutations/user/updateAccout'
import { loginKeys } from '@/lib/react-query/queryKeys'

export interface UpdateCustomerDataInput {
  id: number
  firstName: string
  lastName: string
  emailAddress: string
}

interface UpdateCustomerDataProps {
  accountId: number
  customerAccountInput: UpdateCustomerDataInput
}

const updateUserDetails = async (props: UpdateCustomerDataProps) => {
  const client = makeGraphQLClient()
  const { accountId, customerAccountInput } = props

  const variables = { accountId, customerAccountInput }

  const response = await client.request({
    document: updateCustomerData,
    variables,
  })

  return response
}

export const useUpateUserMutations = () => {
  const queryClient = useQueryClient()
  return {
    updateUserData: useMutation(updateUserDetails, {
      onSuccess: () => {
        queryClient.invalidateQueries(loginKeys.user)
      },
    }),
  }
}
