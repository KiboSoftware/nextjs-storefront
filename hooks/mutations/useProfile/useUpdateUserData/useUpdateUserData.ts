import { useMutation, useQueryClient } from 'react-query'

import { loginKeys } from '../../../../lib/react-query/queryKeys'
import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCustomerData } from '@/lib/gql/mutations/user/updateAccount'

import { CustomerAccountInput } from '@/lib/gql/types'

interface UpdateUserDataProps {
  accountId: number
  customerAccountInput: CustomerAccountInput
}

const updateUserDetails = async (props: UpdateUserDataProps) => {
  const client = makeGraphQLClient()
  const { accountId, customerAccountInput } = props

  const variables = { accountId, customerAccountInput }

  const response = await client.request({
    document: updateCustomerData,
    variables,
  })

  return response
}

export const useUpdateUserDataMutations = () => {
  const queryClient = useQueryClient()
  return {
    updateUserData: useMutation(updateUserDetails, {
      onSuccess: () => {
        queryClient.invalidateQueries(loginKeys.user)
      },
    }),
  }
}
