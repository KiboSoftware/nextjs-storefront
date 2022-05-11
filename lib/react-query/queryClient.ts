import { QueryClient } from 'react-query'

const queryClientHandler = (error: unknown) => {
  const id = 'react-query-error'
  const title = error instanceof Error ? error.message : 'Unable to connect server'
  const status = 'error'

  console.log(`id: ${id}, title: ${title}, status: ${status}`)
}

export const generateQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        onError: queryClientHandler,
      },
      mutations: {
        onError: queryClientHandler,
      },
    },
  })
}

export const queryClient = generateQueryClient()
