let bearerToken: undefined | string

const getPaypalBearerToken = async () => {
  try {
    if (bearerToken) {
      return bearerToken
    }

    const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
    const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET

    const url = process.env.NEXT_PUBLIC_PAYPAL_URL || 'https://api-m.sandbox.paypal.com'

    const response = await fetch(url + '/v1/oauth2/token', {
      method: 'post',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization:
          'Basic ' + Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString('base64'),
      },
    })

    const data = await response.json()
    bearerToken = data.access_token

    return bearerToken
  } catch (error: any) {
    throw error
  }
}

export default getPaypalBearerToken
