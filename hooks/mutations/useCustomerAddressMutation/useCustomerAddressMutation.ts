import { useMutation } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import {
  createCustomerAccountContact,
  deleteCustomerAccountContact,
  updateCustomerAccountContact,
} from '@/lib/gql/mutations'

import { CustomerContactInput } from '@/lib/gql/types'

interface DeleteCustomerAccountContactDetailsParams {
  accountId: number
  contactId: number
}

interface CreateUpdateCustomerAccountContactDetailsParams {
  accountId: number
  customerContactInput: CustomerContactInput
}

const updateCustomerAccountContactDetails = async (
  params: CreateUpdateCustomerAccountContactDetailsParams
) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateCustomerAccountContact,
    variables: params,
  })

  return response?.updateCustomerAccountContact
}

const addCustomerAccountContactDetails = async (
  params: CreateUpdateCustomerAccountContactDetailsParams
) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: createCustomerAccountContact,
    variables: params,
  })

  return response?.createCustomerAccountContact
}

const deleteCustomerAccountContactDetails = async (
  params: DeleteCustomerAccountContactDetailsParams
) => {
  const client = makeGraphQLClient()

  await client.request({
    document: deleteCustomerAccountContact,
    variables: params,
  })
}

export const useCustomerAddressMutation = () => {
  return {
    updateSavedAddressDetails: useMutation(updateCustomerAccountContactDetails),
    addSavedAddressDetails: useMutation(addCustomerAccountContactDetails),
    deleteSavedAddressDetails: useMutation(deleteCustomerAccountContactDetails),
  }
}
