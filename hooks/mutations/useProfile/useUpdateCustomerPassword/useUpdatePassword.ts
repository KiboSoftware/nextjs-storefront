import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { UpdatePasswordKeys } from '@/lib/react-query/queryKeys'
import { updatePassword } from '@/lib/gql/mutations/user/updatePassword'

export interface UpdateUserPasswordInput {
  oldPassword: string
  newPassword: string
  externalPassword: string
}

interface UpdateUserPasswordProps {
  accountId: number
  passwordInfoInput: UpdateUserPasswordInput
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
  const queryClient = useQueryClient()
  return {
    updateUserPasswordData: useMutation(updateUserPassword, {
      onSuccess: () => {
        queryClient.invalidateQueries(UpdatePasswordKeys.all)
      },
    }),
  }
}
