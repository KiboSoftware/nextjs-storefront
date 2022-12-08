/**
 * @module useUpdateUserPasswordMutations
 */
import { useMutation } from 'react-query'

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

/**
 * [Mutation hook] useUpdateUserPasswordMutations uses the graphQL mutation
 *
 * <b>changeCustomerAccountPassword(accountId: Int!, unlockAccount: Boolean, userId: String, passwordInfoInput: PasswordInfoInput): Boolean</b>
 *
 * Description : Update the existing customer's account password by passing old password and new password.
 *
 * Parameters passed to internal function updateUserPassword(props: UpdateUserPasswordProps) => expects object containing accountId and passwordInfoInput to update the password.
 *
 * @returns 'response', that is True/False value to identify if password has been changed or not.
 */

export const useUpdateUserPasswordMutations = () => {
  return {
    updateUserPasswordData: useMutation(updateUserPassword),
  }
}
