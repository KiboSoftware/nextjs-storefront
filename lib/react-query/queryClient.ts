import { QueryClient, MutationCache, QueryCache } from '@tanstack/react-query'

const getErrorMessage = (code: string) => {
  const messages: any = {
    GRAPHQL_VALIDATION_FAILED: 'Something went wrong',
    UNAUTHENTICATED: 'Invalid Credentials',
  }

  return messages[code] || 'Unable to connect server'
}

const queryClientHandler = (error: any, showSnackbar: any) => {
  const id = 'react-query-error'
  const code = error?.response?.errors ? error?.response?.errors[0]?.extensions?.code : null

  const status = 'error'

  console.log(`id: ${id}, title: ${code}, status: ${status}`)

  showSnackbar(getErrorMessage(code), status)
}

export const generateQueryClient = (showSnackbar?: any): QueryClient => {
  const mutationCache = new MutationCache({
    onError: (error) => queryClientHandler(error, showSnackbar),
  })

  const queryCache = new QueryCache({
    onError: (error) => queryClientHandler(error, showSnackbar),
  })

  return new QueryClient({ mutationCache, queryCache })
}

export const queryClient = generateQueryClient()
