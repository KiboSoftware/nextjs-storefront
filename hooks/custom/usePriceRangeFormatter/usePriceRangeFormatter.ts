/**
 * @module usePriceRangeFormatter
 */
import { useMemo } from 'react'

import { useTranslation } from 'next-i18next'

import { PurchaseTypes } from '@/lib/constants'

import { ProductPriceRange } from '@/lib/gql/types'

/**
 * [Custom Hook] It will format the price range object with translations
 *
 * @param priceRange Excepts price range object received from server
 * @param subscriptionPriceRange Excepts price range object received from server for subscription
 *
 * @returns Translated price range object
 *
 */
export const usePriceRangeFormatter = (
  priceRange: ProductPriceRange,
  subscriptionPriceRange?: ProductPriceRange,
  purchaseType?: string
) => {
  const { t } = useTranslation('common')

  const range = purchaseType === PurchaseTypes.SUBSCRIPTION ? subscriptionPriceRange : priceRange
  const formattedPriceRange = useMemo(() => {
    if (!range) return undefined

    return {
      lower: {
        price: range?.lower?.price ? t<string>('currency', { val: range?.lower?.price }) : null,
        salePrice: range?.lower?.salePrice
          ? t<string>('currency', { val: range?.lower?.salePrice })
          : null,
      },
      upper: {
        price: range?.upper?.price ? t<string>('currency', { val: range?.upper?.price }) : null,
        salePrice: range?.upper?.salePrice
          ? t<string>('currency', { val: range?.upper?.salePrice })
          : null,
      },
    }
  }, [range, t])

  return formattedPriceRange
}
