import { renderHook } from '@testing-library/react-hooks'

import { usePriceRangeFormatter } from './usePriceRangeFormatter'

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
    t: (key: string, options: { val: number | string }) => `$${options.val}`,
  }),
}))

describe('usePriceRangeFormatter', () => {
  it('should format the price range correctly', () => {
    const priceRange = {
      lower: {
        price: 100,
        salePrice: 80,
      },
      upper: {
        price: 200,
        salePrice: 180,
      },
    }

    const { result } = renderHook(() => usePriceRangeFormatter(priceRange))
    expect(result.current).toEqual({
      lower: {
        price: '$100',
        salePrice: '$80',
      },
      upper: {
        price: '$200',
        salePrice: '$180',
      },
    })
  })
})
