import { renderHook } from '@testing-library/react'

import { useIsPayPalEnabled } from './useIsPayPalEnabled'

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
    t: (key: string, options: { val: number | string }) => `$${options.val}`,
  }),
}))

describe('usePayPalBearerToken', () => {
  it('should call usePayPalBearerToken', () => {
    const { result } = renderHook(() => useIsPayPalEnabled())
    expect(result.current).toEqual(null)
  })
})
