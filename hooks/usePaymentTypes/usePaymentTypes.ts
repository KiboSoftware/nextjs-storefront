import { publicRuntimeConfig } from '../../next.config'

export const usePaymentTypes = () => {
  const loadPaymentTypes = () => publicRuntimeConfig.paymentTypes

  return {
    loadPaymentTypes,
    error: null,
    loading: false,
  }
}
