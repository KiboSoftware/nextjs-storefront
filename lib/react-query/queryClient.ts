import { QueryClient } from 'react-query'

const getErrorMessage = (code: string, message: string) => {
  const messages: any = {
    GRAPHQL_VALIDATION_FAILED: 'Something went wrong',
    UNAUTHENTICATED: 'Invalid Credentials',
  }

  return message || messages[code] || 'Unable to connect server'
}

const queryClientHandler = (error: any, showSnackbar: any) => {
  const id = 'react-query-error'
  const code = error?.response?.errors
    ? error?.response?.errors[0]?.extensions?.response?.body?.errorCode
    : null
  const message = error?.response?.errors
    ? error?.response?.errors[0]?.extensions?.response?.body?.message
    : null

  const status = 'error'

  console.log(`id: ${id}, title: ${code}, status: ${status}`)

  showSnackbar(getErrorMessage(code, message), status)
}

export const generateQueryClient = (showSnackbar?: any): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        onError: (error) => queryClientHandler(error, showSnackbar),
      },
      mutations: {
        onError: (error) => queryClientHandler(error, showSnackbar),
      },
    },
  })
}

export const queryClient = generateQueryClient()
