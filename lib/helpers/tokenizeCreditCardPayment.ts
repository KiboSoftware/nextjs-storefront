import { CardForm } from '../types'

export const tokenizeCreditCardPayment = async (
  creditCardData: CardForm,
  pciHost: string,
  apiHost: string
) => {
  try {
    const { cardNumber, cardType, cvv } = creditCardData
    const ccData = {
      cardNumber,
      cardType,
      cvv,
      persistCard: true,
      cardholderName: creditCardData?.cardholderName,
      cardId: creditCardData?.id,
    }

    const url = creditCardData?.id
      ? `https://${pciHost}/payments/commerce/payments/cards/${creditCardData?.id}`
      : `https://${pciHost}/payments/commerce/payments/cards/`
    const tenantAndSite = apiHost.split('.')[0]
    const tenantId = tenantAndSite.split('-')[0].split('t')[1].toString()
    const siteId = tenantAndSite.split('-')[1].split('s')[1].toString()

    const res = await fetch(url, {
      method: creditCardData?.id ? 'PUT' : 'POST',
      headers: {
        accept: 'application/json',
        'x-vol-tenant': tenantId,
        'Content-Type': 'application/json',
        'x-vol-site': siteId,
      },
      body: JSON.stringify(ccData),
    })
    const tokenizedCCData = await res.json()
    if (tokenizedCCData.isSuccessful) {
      return tokenizedCCData
    }
  } catch (e) {
    console.error(e)
  }
}
