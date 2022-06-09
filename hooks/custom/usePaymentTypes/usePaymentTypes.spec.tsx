import { renderHook } from '@testing-library/react-hooks'
import getConfig from 'next/config'

import { usePaymentTypes } from './usePaymentTypes'

const { publicRuntimeConfig } = getConfig()

describe('usePaymentTypes', () => {
  it('Should provide a payment', () => {
    const { result } = renderHook(usePaymentTypes)
    const { loadPaymentTypes } = result.current

    expect(loadPaymentTypes()).toEqual(publicRuntimeConfig.paymentTypes)
  })
})
