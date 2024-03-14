import { useEffect, useState } from 'react'

export const useCheckoutSettings = () => {
  const [merchantAccountId, setMerchantAccountId] = useState(null)

  useEffect(() => {
    const fetchCheckoutSettings = async () => {
      try {
        console.log(`process.env.NEXT_PUBLIC_URL: ${process.env.NEXT_PUBLIC_URL}`)

        const url = `${process.env.NEXT_PUBLIC_URL}/api/paypal-checkout-settings`

        const merchantIdData = await fetch(url, {
          headers: {
            Accept: 'application/json',
          },
        })
        const data = await merchantIdData.json()

        setMerchantAccountId(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchCheckoutSettings()
  }, [])

  return merchantAccountId
}
