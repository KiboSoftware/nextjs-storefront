import { ReactElement } from 'react'

import { render, RenderResult } from '@testing-library/react'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'

import { generateQueryClient } from '../../lib/react-query/queryClient'

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {
    // swallow errors without printing them
  },
})

// make a function to generate unique query client for each test
const generateTestQueryClient = () => {
  const client = generateQueryClient()
  const options = client.getDefaultOptions()
  options.queries = { ...options.queries, retry: false }

  return client
}

export const renderWithQueryClient = (ui: ReactElement, client?: QueryClient): RenderResult => {
  const queryClient = client ?? generateTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouterProvider>{ui}</MemoryRouterProvider>
    </QueryClientProvider>
  )
}

export const createQueryClientWrapper = () => {
  const queryClient = generateTestQueryClient()

  return ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
