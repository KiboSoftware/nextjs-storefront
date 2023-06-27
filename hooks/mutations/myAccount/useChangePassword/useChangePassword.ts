/**
 * @module useChangePassword
 */
import { useMutation } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updatePassword } from '@/lib/gql/mutations/user/updatePassword'

import type { PasswordInfoInput } from '@/lib/gql/types'
interface ChangePasswordProps {
  accountId: number
  passwordInfoInput: PasswordInfoInput
}

const changePassword = async (props: ChangePasswordProps) => {
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
 * [Mutation hook] useChangePassword uses the graphQL mutation
 *
 * <b>changeCustomerAccountPassword(accountId: Int!, unlockAccount: Boolean, userId: String, passwordInfoInput: PasswordInfoInput): Boolean</b>
 *
 * Description : Update the existing customer's account password by passing old password and new password.
 *
 * Parameters passed to internal function changePassword(props: ChangePasswordProps) => expects object containing accountId and passwordInfoInput to update the password.
 *
 * @returns 'response', that is True/False value to identify if password has been changed or not.
 */

export const useChangePassword = () => {
  return {
    changePassword: useMutation({ mutationFn: changePassword }),
  }
}
