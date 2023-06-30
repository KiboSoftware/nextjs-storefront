/**
 * @module useResetPassword
 */
import { useMutation } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { resetAccountPassword } from '@/lib/gql/mutations/user/resetAccountPassword'

interface ResetPasswordProps {
  emailAddress: string
  userName: string
  customerSetCode: string
}

const resetPassword = async (props: ResetPasswordProps) => {
  const client = makeGraphQLClient()
  const { emailAddress, userName, customerSetCode } = props

  const variables = { resetPasswordInfoInput: { emailAddress, userName, customerSetCode } }

  const response = await client.request({
    document: resetAccountPassword,
    variables,
  })

  return response
}

/**
 * [Mutation hook] useResetPassword uses the graphQL mutation
 *
 * <b>resetCustomerAccountPassword(emailAddress: string, userName: String, customerSetCode: string): Boolean</b>
 *
 * Description : Update the existing customer's account password by passing new password.
 *
 * Parameters passed to internal function resetPassword(props: ResetPasswordProps) => expects object containing emailAddress, userName and customerSetCode to update the password.
 *
 * @returns 'response', that is True/False value to identify if password has been reset or not.
 */

export const useResetPassword = () => {
  return {
    resetPassword: useMutation({
      mutationFn: resetPassword,
    }),
  }
}
