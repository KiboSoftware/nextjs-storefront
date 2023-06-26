/**
 * @module useUpdateCustomerProfile
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCustomerData } from '@/lib/gql/mutations/user/updateAccount'
import { loginKeys } from '@/lib/react-query/queryKeys'

import type { CustomerAccountInput } from '@/lib/gql/types'

interface UpdateCustomerProfileProps {
  accountId: number
  customerAccountInput: CustomerAccountInput
}

const updateCustomerProfile = async (props: UpdateCustomerProfileProps) => {
  const client = makeGraphQLClient()
  const { accountId, customerAccountInput } = props

  const variables = { accountId, customerAccountInput }

  const response = await client.request({
    document: updateCustomerData,
    variables,
  })

  return response
}

/**
 * [Mutation hook] useUpdateCustomerProfile uses the graphQL mutation
 *
 * <b>updateCustomerAccount(accountId: Int!, customerAccountInput: CustomerAccountInput): CustomerAccount</b>
 *
 * Description : Update the existing customer's profile information like first name, last name and email address.
 *
 * Parameters passed to internal function updateCustomerProfile(props: UpdateCustomerProfileProps) => expects object containing accountId and customerAccountInput to update the profile details.
 *
 * On success, calls invalidateQueries loginKeys.user and fetches the updated result.
 *
 * @returns 'response', which has updated customer's profile details like userName, firstName, lastName, emailAddress etc.
 */

export const useUpdateCustomerProfile = () => {
  const queryClient = useQueryClient()
  return {
    updateUserData: useMutation({
      mutationFn: updateCustomerProfile,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: loginKeys.user })
      },
    }),
  }
}
