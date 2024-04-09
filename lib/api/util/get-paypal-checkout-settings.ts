import { apiAuthClient } from './api-auth-client'

type CheckoutSettingsResponse = {
  userName: string
  password: string
  orderProcessing: string
}
const getCheckoutSettings = (res: any): CheckoutSettingsResponse => {
  const payPalExpress2 = res.paymentSettings.externalPaymentWorkflowDefinitions.find(
    (item: any) => item.name === 'PayPalExpress2'
  )

  const userNameItem = payPalExpress2.credentials.find((item: any) =>
    item.apiName.includes('username')
  )
  const passwordItem = payPalExpress2.credentials.find((item: any) =>
    item.apiName.includes('password')
  )
  const orderProcessingItem = payPalExpress2.credentials.find((item: any) =>
    item.apiName.includes('orderProcessing')
  )

  const userName = userNameItem ? userNameItem.value : null
  const password = passwordItem ? passwordItem.value : null
  const orderProcessing = orderProcessingItem ? orderProcessingItem.value : null

  return {
    userName,
    password,
    orderProcessing,
  }
}

const getPaypalCheckoutSettings = async () => {
  try {
    const authToken = await apiAuthClient.getAccessToken()
    const url = `https://${process.env.KIBO_API_HOST}/api/commerce/settings/checkout`

    const checkoutSettingsRes = await fetch(url, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })

    if (!checkoutSettingsRes.ok)
      throw new Error(`Error fetching checkout settings: ${checkoutSettingsRes}`)

    const checkoutSettingsData = await checkoutSettingsRes.json()
    const checkoutSettings = checkoutSettingsData ? getCheckoutSettings(checkoutSettingsData) : null

    return checkoutSettings
  } catch (error: any) {
    console.error(error)
    throw error
  }
}

export default getPaypalCheckoutSettings
