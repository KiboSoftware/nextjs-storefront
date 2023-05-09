/**
 * @module useB2bUserMutations
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { customerB2BUserKeys } from '@/lib/react-query/queryKeys'

import { B2BUserAndAuthInfoInput, B2BUserInput } from '@/lib/gql/types'
import {
  addCustomerB2bUserMutation,
  updateCustomerB2bUserMutation,
  removeCustomerB2bUserMutation,
} from '@/lib/gql/mutations'

const client = makeGraphQLClient()

const createCustomerB2bUser = async (b2BUserAndAuthInfoInput: B2BUserAndAuthInfoInput) => {
  const response = await client.request({
    document: addCustomerB2bUserMutation,
    variables: b2BUserAndAuthInfoInput,
  })
  return response?.account
}

const updateCustomerB2bUser = async (b2BUserInput: B2BUserInput) => {
  const response = await client.request({
    document: updateCustomerB2bUserMutation,
    variables: b2BUserInput,
  })
  return response?.account
}

const deleteCustomerB2bUser = async (b2BUserInput: B2BUserInput) => {
  const response = await client.request({
    document: removeCustomerB2bUserMutation,
    variables: b2BUserInput,
  })
  return response
}

export const useAddCustomerB2bUserMutations = () => {
  const queryClient = useQueryClient()
  const {
    mutate,
    mutateAsync,
    data = {},
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation(createCustomerB2bUser, {
    onSuccess: () => {
      queryClient.refetchQueries(customerB2BUserKeys.users)
    },
  })

  return {
    mutate,
    mutateAsync,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  }
}

export const useUpdateCustomerB2bUserMutations = () => {
  const queryClient = useQueryClient()
  const {
    mutate,
    mutateAsync,
    data = {},
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation(updateCustomerB2bUser, {
    onMutate: () => {},
    retry: 0,
  })

  return {
    mutate,
    mutateAsync,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  }
}

export const useRemoveCustomerB2bUserMutations = () => {
  const queryClient = useQueryClient()
  const {
    mutate,
    mutateAsync,
    data = {},
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation(deleteCustomerB2bUser, {
    retry: 0,
    onSuccess: (data) => {
      if (data && data?.removeCustomerB2bAccountUser)
        queryClient.refetchQueries(customerB2BUserKeys.users)
    },
  })

  return {
    mutate,
    mutateAsync,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  }
}
