import { useState } from 'react'

import { act } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { useDebounce } from './useDebounce'

describe('[hooks] useDebounce', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should be defined', () => {
    expect(useDebounce).toBeDefined()
  })

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

  it('should return last value if calling debouncing sequencially within 500ms', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'Test 1', delay: 500 },
    })

    rerender({ value: 'Test 2', delay: 500 })
    rerender({ value: 'Test 3', delay: 500 })
    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(result.current).toBe('Test 3')
  })

  it('should return actual value if calling debouncing in every 500ms', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'Test 1', delay: 500 },
    })

    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(result.current).toBe('Test 1')
    rerender({ value: 'Test 2', delay: 500 })
    act(() => {
      jest.advanceTimersByTime(500)
    })
    expect(result.current).toBe('Test 2')
  })
})
