import { ReactElement } from 'react'

import { render, RenderResult } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

// make a function to generate unique query client for each test
const generateQueryClient = () => {
  return new QueryClient()
}

export const renderWithQueryClient = (ui: ReactElement, client?: QueryClient): RenderResult => {
  const queryClient = client ?? generateQueryClient()
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}
