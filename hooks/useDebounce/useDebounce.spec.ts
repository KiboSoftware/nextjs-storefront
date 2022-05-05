import { useState } from 'react'

import { renderHook } from '@testing-library/react-hooks'

describe('[hooks] useDebounce', () => {
  it('should use useDebounce', async () => {
    let data
    const userEnteredText = 'Test'

    const { result, waitFor } = renderHook(() => {
      const [searchTerm, setSearchTerm] = useState(userEnteredText)
      jest.fn((v) => setSearchTerm(v))

      data = searchTerm
    })

    await waitFor(() => result.current)

    expect(data).toBe(userEnteredText)
  })
})
