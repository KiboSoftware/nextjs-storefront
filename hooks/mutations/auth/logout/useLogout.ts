/**
 * @module useLogin
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import fetch from 'node-fetch'

import { LOGOUT_ENDPOINT } from '@/lib/gql/client'
import { loginKeys } from '@/lib/react-query/queryKeys'

const logoutUser = async () => {
  const response = await fetch(LOGOUT_ENDPOINT, {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return await response.json()
}

/**
 * [Mutation hook] useLogout clears the cookie
 *
 *
 * Description : Logs out the user by clearing serverside cookie
 *
 * No parameter is passed to function logoutUser()
 *
 * On success, calls invalidateQueries on loginKeys and fetches the updated result.
 *
 * @returns 'void'
 */

export const useLogout = (callbackFn: () => void) => {
  const queryClient = useQueryClient()

  const {
    mutate,
    mutateAsync,
    data = {},
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: logoutUser,
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: loginKeys.user })
    },
    onSuccess: () => {
      if (callbackFn) callbackFn()
    },
    retry: 0,
  })

  return {
    mutate,
    mutateAsync,
    data,
    isPending,
    isSuccess,
    isError,
    error,
  }
}
