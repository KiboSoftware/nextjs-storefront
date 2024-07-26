/**
 * @module useIsPayPalEnabled
 */

import { useEffect, useState } from 'react'

/**
 * [Custom Hook]
 *
 * Use useIsPayPalEnabled to check whether PayPal is enabled at backend or not.
 *
 * @returns true or false.
 *
 */
export const useIsPayPalEnabled = () => {
  const [isPayPalEnabled, setIsPayPalEnabled] = useState(null)

  useEffect(() => {
    const checkIsPayPalEnabled = async () => {
      try {
        const url = `${
          process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''
        }/api/is-paypal-enabled`

        const res = await fetch(url, {
          headers: {
            Accept: 'application/json',
          },
        })
        const data = await res.json()

        setIsPayPalEnabled(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    checkIsPayPalEnabled()
  }, [])

  return isPayPalEnabled
}
