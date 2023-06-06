/**
 * @module useLogin
 */
import { useMutation, useQueryClient } from 'react-query'

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
    isLoading,
    isError,
    error,
    isSuccess,
  } = useMutation(logoutUser, {
    onMutate: () => {
      queryClient.cancelQueries(loginKeys.user)
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
    isLoading,
    isSuccess,
    isError,
    error,
  }
}
