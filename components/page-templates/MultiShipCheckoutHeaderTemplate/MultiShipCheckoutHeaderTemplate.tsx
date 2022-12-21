import React from 'react'

import { useRouter } from 'next/router'

import { CheckoutHeader } from '@/components/layout'
import { useMultiShipCheckoutQueries } from '@/hooks'
import { checkoutGetters } from '@/lib/getters'

import type { Checkout } from '@/lib/gql/types'

const MultiShipCheckoutHeaderTemplate = () => {
  const router = useRouter()
  const { checkoutId } = router.query
  const { data: checkout } = useMultiShipCheckoutQueries({
    checkoutId: checkoutId as string,
    initialCheckout: {} as Checkout,
  })
  const numberOfItems = checkoutGetters.getCheckoutItemCount(checkout as Checkout)

  return <CheckoutHeader numberOfItems={numberOfItems as number} />
}

export default MultiShipCheckoutHeaderTemplate
