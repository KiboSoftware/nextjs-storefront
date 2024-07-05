import { renderHook } from '@testing-library/react-hooks'

import { useExecuteTask } from './useExecuteTask'
import { quoteMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'
const mockFetch = jest.fn(() => {
  return {
    json: () => quoteMock?.items?.[0],
  }
}) as any

// Assign the mock fetch implementation to the global object
global.fetch = mockFetch
describe('[hooks] useExecuteTask', () => {
  it('should add a comment in a quote', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useExecuteTask(), {
      wrapper: createQueryClientWrapper(),
    })

    await result.current.executeTask.mutateAsync({
      params: { quoteId: 'quote-id' },
    })

    await waitForNextUpdate()
    expect(result.current.executeTask.data).toEqual(quoteMock?.items?.[0])
  })
})
