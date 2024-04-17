/**
 * @module usePayPalBearerToken
 */

import { useEffect, useState } from 'react'

/**
 * [Custom Hook]
 *
 * Use usePayPalBearerToken to get PayPal bearer token.
 *
 * @returns PayPal bearer token.
 *
 */
export const usePayPalBearerToken = () => {
  const [bearerToken, setBearerToken] = useState(null)

  useEffect(() => {
    const fetchBearerToken = async () => {
      try {
        const url = `${
          process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''
        }/api/paypal-bearer-token`

        const res = await fetch(url, {
          headers: {
            Accept: 'application/json',
          },
        })
        const data = await res.json()

        setBearerToken(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchBearerToken()
  }, [])

  return bearerToken
}
