import getConfig from 'next/config'

import { apiAuthClient } from '../api/util/api-auth-client'

export const getEDDSuggestion = async (productAndShippingData: any) => {
  try {
    const res = await fetch('/api/get-edd-suggestions', {
      method: 'POST',
      body: JSON.stringify(productAndShippingData),
    })

    const eddSuggestionData = await res.json()

    return eddSuggestionData
  } catch (e) {
    console.error(e)
  }
}
