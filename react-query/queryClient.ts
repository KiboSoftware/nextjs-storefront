import React from 'react'

import { QueryClient } from 'react-query'

const queryClientHandler = (error: unknown) => {
  const id = 'react-query-error'
  const title = error instanceof Error ? error.message : 'Unable to connect server'
  const status = 'error'

  console.error(`id: ${id}, title: ${title}, status: ${status}`)
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryClientHandler,
    },
  },
})
