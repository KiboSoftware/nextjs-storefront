import { renderHook, waitFor } from '@testing-library/react'

import { useIsPayPalEnabled } from './useIsPayPalEnabled'

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ enabled: true }),
  })
) as jest.Mock

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
    t: (key: string, options: { val: number | string }) => `$${options.val}`,
  }),
}))

describe('usePayPalBearerToken', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call usePayPalBearerToken', async () => {
    const { result } = renderHook(() => useIsPayPalEnabled())
    await waitFor(() => {
      expect(result.current).toEqual({ enabled: true })
    })
  })
})
