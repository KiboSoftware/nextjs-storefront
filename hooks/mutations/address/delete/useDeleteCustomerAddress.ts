/**
 * @module useDeleteCustomerAddress
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteCustomerAccountContact } from '@/lib/gql/mutations'
import { customerAccountContactsKeys } from '@/lib/react-query/queryKeys'

import { CustomerContact } from '@/lib/gql/types'

interface DeleteCustomerAccountContactDetailsParams {
  accountId: number
  contactId: number
}

const deleteCustomerAccountContactDetails = async (
  params: DeleteCustomerAccountContactDetailsParams
) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: deleteCustomerAccountContact,
    variables: params,
  })

  return response.deleteCustomerAccountContact
}

/**
 * [Mutation hook] useDeleteCustomerAddress uses the graphQL mutation
 *
 * <b>deleteCustomerAccountContact(accountId: Int!, contactId: Int!): Boolean</b>
 *
 * Description : Delete the customer's contact (address) saved on their account
 *
 * Parameters passed to function deleteCustomerAccountContactDetails(params: DeleteCustomerAccountContactDetailsParams) => expects object of type DeleteCustomerAccountContactDetailsParams containing accountId and contactId.
 *
 * On success, calls invalidateQueries all customerAccountContactsKeys and fetches the updated result.
 *
 * @returns 'response?.deleteCustomerAccountContact', which contains True/False value to identify if customer's contact has been deleted or not.
 */

export const useDeleteCustomerAddress = () => {
  const queryClient = useQueryClient()

  return {
    deleteCustomerAddress: useMutation({
      mutationFn: deleteCustomerAccountContactDetails,
      onMutate: async (deletedAddress) => {
        await queryClient.cancelQueries({
          queryKey: customerAccountContactsKeys.addressById(deletedAddress.accountId),
        })

        const previousAddresses: any = queryClient.getQueryData(
          customerAccountContactsKeys.addressById(deletedAddress.accountId)
        )

        const newAddresses = {
          ...previousAddresses,
          items: previousAddresses?.items?.filter(
            (item: CustomerContact) => item.id !== deletedAddress.contactId
          ),
        }

        queryClient.setQueryData(
          customerAccountContactsKeys.addressById(deletedAddress.accountId),
          newAddresses
        )

        return { previousAddresses }
      },
      onSettled: (deletedAddress, error, _, context) => {
        if (error) {
          queryClient.setQueryData(
            customerAccountContactsKeys.addressById(deletedAddress.accountId),
            context?.previousAddresses
          )
        }
        queryClient.invalidateQueries({
          queryKey: customerAccountContactsKeys.addressById(deletedAddress.accountId),
        })
      },
    }),
  }
}
