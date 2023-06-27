/**
 * @module useUpdateCustomerProfile
 */
import { useMutation } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateForgottenAccountPassword } from '@/lib/gql/mutations'

interface UpdateForgottenPasswordProps {
  userName: string
  confirmationCode: string
  newPassword: string
}

const updateForgottenPassword = async (props: UpdateForgottenPasswordProps) => {
  const client = makeGraphQLClient()
  const { userName, confirmationCode, newPassword } = props

  const variables = { confirmationInfoInput: { userName, confirmationCode, newPassword } }

  const response = await client.request({
    document: updateForgottenAccountPassword,
    variables: variables,
  })

  return response?.updatePassword
}

/**
 * [Mutation hook] useUpdateForgottenPassword uses the graphQL mutation
 *
 * <b>updateForgottenCustomerAccountPassword(confirmationInfoInput: ConfirmationInfoInput): Boolean</b>
 *
 * Description : Update forgotten password by providing user name, token and new password.
 *
 * Parameters passed to internal function updateForgottenPassword(props: UpdateForgottenPasswordProps) => expects object containing userName, confirmationCode, newPassword to reset the password.
 *
 * @returns 'response', which has updated customer's profile details like userName, firstName, lastName, emailAddress etc.
 */

export const useUpdateForgottenPassword = () => {
  return {
    updateForgottenPassword: useMutation({
      mutationFn: updateForgottenPassword,
    }),
  }
}
