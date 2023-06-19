import { CardForm } from '../types'

export const reTokenizeCreditCardPayment = async (
  creditCardData: CardForm,
  pciHost: string,
  apiHost: string
) => {
  try {
    const { id, cardType, cvv, cardNumber, cardholderName } = creditCardData
    const ccData = {
      cardNumber: cardNumber,
      persistCard: true,
      cardholderName,
      cardType,
      cardId: id,
      cvv,
    }
    const url = `https://${pciHost}/payments/commerce/payments/cards/${id}`
    const tenantAndSite = apiHost.split('.')[0]
    const tenantId = tenantAndSite.split('-')[0].split('t')[1].toString()
    const siteId = tenantAndSite.split('-')[1].split('s')[1].toString()

    const res = await fetch(url, {
      method: 'PUT',
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