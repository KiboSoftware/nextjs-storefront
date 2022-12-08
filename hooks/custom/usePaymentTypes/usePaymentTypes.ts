/**
 * @module usePaymentTypes
 */
import getConfig from 'next/config'

/**
 * [Custom Hook] Loads the payment method types
 *
 * Return function and value:
 * 1. loadPaymentTypes() => Returns the paymentTypes available
 * 2. error => default value returned as null
 * 3. loading => It returns true if request is in process and once completed it return false
 */

export const usePaymentTypes = () => {
  const { publicRuntimeConfig } = getConfig()
  const loadPaymentTypes = () => publicRuntimeConfig.paymentTypes

  return {
    loadPaymentTypes,
    error: null,
    loading: false,
  }
}
