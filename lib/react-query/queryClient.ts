import { QueryClient } from 'react-query'

const queryClientHandler = (error: unknown, showSnackbar: any) => {
  const id = 'react-query-error'
  const title = error instanceof Error ? error.message : 'Unable to connect server'
  const status = 'error'

  console.log(`id: ${id}, title: ${title}, status: ${status}`)

  showSnackbar('Something went wrong', status)
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
