import { renderHook } from '@testing-library/react'

import { usePayPalBearerToken } from './usePayPalBearerToken'

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
    t: (key: string, options: { val: number | string }) => `$${options.val}`,
  }),
}))

describe('usePayPalBearerToken', () => {
  it('should return Paypal bearer token', () => {
    const { result } = renderHook(() => usePayPalBearerToken())
    expect(result.current).toEqual(null)
  })
})
