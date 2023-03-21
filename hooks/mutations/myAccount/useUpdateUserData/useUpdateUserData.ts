/**
 * @module useUpdateUserDataMutations
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCustomerData } from '@/lib/gql/mutations/user/updateAccount'
import { loginKeys } from '@/lib/react-query/queryKeys'

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

/**
 * [Mutation hook] useUpdateUserDataMutations uses the graphQL mutation
 *
 * <b>updateCustomerAccount(accountId: Int!, customerAccountInput: CustomerAccountInput): CustomerAccount</b>
 *
 * Description : Update the existing customer's profile information like first name, last name and email address.
 *
 * Parameters passed to internal function updateUserDetails(props: UpdateUserDataProps) => expects object containing accountId and customerAccountInput to update the profile details.
 *
 * On success, calls invalidateQueries loginKeys.user and fetches the updated result.
 *
 * @returns 'response', which has updated customer's profile details like userName, firstName, lastName, emailAddress etc.
 */

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
