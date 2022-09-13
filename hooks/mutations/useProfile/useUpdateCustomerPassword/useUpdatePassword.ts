import { useMutation } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updatePassword } from '@/lib/gql/mutations/user/updatePassword'

export interface UpdateCustomerPasswordInput {
  oldPassword: string
  newPassword: string
  externalPassword: string
}

interface UpdateCustomerPasswordProps {
  accountId: number
  passwordInfoInput: UpdateCustomerPasswordInput
}

const updateUserPassword = async (props: UpdateCustomerPasswordProps) => {
  const client = makeGraphQLClient()
  const { accountId, passwordInfoInput } = props

  const variables = { accountId, passwordInfoInput }

  const response = await client.request({
    document: updatePassword,
    variables,
  })

  return response
}

export const useUpdateUserPasswordMutations = () => {
  return {
    updateUserPasswordData: useMutation(updateUserPassword),
  }
}
