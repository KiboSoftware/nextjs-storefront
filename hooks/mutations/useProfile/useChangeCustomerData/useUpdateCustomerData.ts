import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { UpdateUserDataKeys } from '@/lib/react-query/queryKeys'
import { updateCustomerData } from '@/lib/gql/mutations/user/updateAccout'
import { buildUpdateUserData } from '@/lib/helpers/buildUpdateUserData'

export interface UpdateCustomerDataInput {
  firstName: string
  lastName: string
  emailAddress: string
}

const updateUserDetails = async (props: UpdateCustomerDataInput) => {
  const client = makeGraphQLClient()
  const { firstName, lastName, emailAddress } = props

  const variables = { firstName, lastName, emailAddress }

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
        queryClient.invalidateQueries(UpdateUserDataKeys.all)
      },
    }),
  }
}
