/**
 * @module useDebounce
 */
import { useEffect, useState } from 'react'

/**
 * [Custom Hook] The debounced value will reflect the latest value when the useDebounce hook called for the specified time period.
 *
 * Uses of useDebounce to prevent API calls from being fired on every keystroke.
 *
 * setDebouncedValue(value) will update debounced value after delay
 *
 * clearTimeout(handler) will cancel the timeout if value changes. Timeout gets cleared and restarted
 *
 * @param value Excepts user entered value on search suggestions feature
 * @param delay Expect debounce timeout value
 *
 * @returns The latest debounced value on specified time period.
 *
 */

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
