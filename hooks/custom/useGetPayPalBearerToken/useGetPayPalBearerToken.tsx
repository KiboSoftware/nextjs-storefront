import { useEffect, useState } from 'react'

export const useGetPayPalBearerToken = () => {
  const [paypalBearerToken, setPaypalBearerToken] = useState('')

  useEffect(() => {
    const getBearerToken = async () => {
      try {
        const url = `${
          process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''
        }/api/paypal-bearer-token`

        const response = await fetch(url)
        const data = await response.json()
        setPaypalBearerToken(data)
      } catch (error) {
        console.error('Error while fetching Paypal bearer token:', error)
      }
    }

    getBearerToken()
  }, [])

  return paypalBearerToken
}
