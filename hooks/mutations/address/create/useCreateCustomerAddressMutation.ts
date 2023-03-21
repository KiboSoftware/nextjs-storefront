/**
 * @module useCreateCustomerAddressMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCustomerAccountContact } from '@/lib/gql/mutations'
import { customerAccountContactsKeys } from '@/lib/react-query/queryKeys'

import type { CustomerContactInput } from '@/lib/gql/types'

interface CreateCustomerAccountContactDetailsParams {
  accountId: number
  customerContactInput: CustomerContactInput
}

const addCustomerAccountContactDetails = async (
  params: CreateCustomerAccountContactDetailsParams
) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: createCustomerAccountContact,
    variables: params,
  })
  return response?.createCustomerAccountContact
}

/**
 * [Mutation hook] useCreateCustomerAddressMutation uses the graphQL mutation
 *
 * <b>createCustomerAccountContact(accountId: Int!, customerContactInput: CustomerContactInput): CustomerContact</b>
 *
 * Description : Save the customer's contact (address) to the account which can be used at the time of checkout for shipping and billing address.
 *
 * Parameters passed to function addCustomerAccountContactDetails(params: CreateCustomerAccountContactDetailsParams) => expects object of type CreateCustomerAccountContactDetailsParams containing accountId and customerContactInput.
 *
 * On success, calls invalidateQueries all customerAccountContactsKeys and fetches the updated result.
 *
 * @returns 'response?.createCustomerAccountContact', which contains Customer's contact details like accountId,  Address, firstName, LastName etc.
 */

export const useCreateCustomerAddressMutation = () => {
  const queryClient = useQueryClient()

  return {
    addSavedAddressDetails: useMutation(addCustomerAccountContactDetails, {
      onSuccess: () => {
        queryClient.invalidateQueries(customerAccountContactsKeys.all)
      },
    }),
  }
}
