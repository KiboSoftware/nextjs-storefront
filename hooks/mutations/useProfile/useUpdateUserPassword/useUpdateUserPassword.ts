import { useMutation, useQueryClient } from 'react-query'

import { loginKeys } from './../../../../lib/react-query/queryKeys'
import { makeGraphQLClient } from '@/lib/gql/client'
import { updatePassword } from '@/lib/gql/mutations/user/updatePassword'

import { PasswordInfoInput } from '@/lib/gql/types'
interface UpdateUserPasswordProps {
  accountId: number
  passwordInfoInput: PasswordInfoInput
}

const updateUserPassword = async (props: UpdateUserPasswordProps) => {
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
