import getConfig from 'next/config'
export const usePaymentTypes = () => {
  const { publicRuntimeConfig } = getConfig()
  const loadPaymentTypes = () => publicRuntimeConfig.paymentTypes

  return {
    loadPaymentTypes,
    error: null,
    loading: false,
  }
}
