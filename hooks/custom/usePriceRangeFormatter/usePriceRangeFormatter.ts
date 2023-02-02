/**
 * @module usePriceRangeFormatter
 */
import { useMemo } from 'react'

import { useTranslation } from 'next-i18next'

import { ProductPriceRange } from '@/lib/gql/types'

/**
 * [Custom Hook] It will format the price range object with translations
 *
 * @param priceRange Excepts price range object received from server
 *
 * @returns Translated price range object
 *
 */
export const usePriceRangeFormatter = (priceRange: ProductPriceRange) => {
  const { t } = useTranslation('common')

  const formattedPriceRange = useMemo(() => {
    if (!priceRange) return undefined

    return {
      lower: {
        price: priceRange?.lower?.price
          ? t<string>('currency', { val: priceRange?.lower?.price })
          : null,
        salePrice: priceRange?.lower?.salePrice
          ? t<string>('currency', { val: priceRange?.lower?.salePrice })
          : null,
      },
      upper: {
        price: priceRange?.upper?.price
          ? t<string>('currency', { val: priceRange?.upper?.price })
          : null,
        salePrice: priceRange?.upper?.salePrice
          ? t<string>('currency', { val: priceRange?.upper?.salePrice })
          : null,
      },
    }
  }, [priceRange, t])

  return formattedPriceRange
}
