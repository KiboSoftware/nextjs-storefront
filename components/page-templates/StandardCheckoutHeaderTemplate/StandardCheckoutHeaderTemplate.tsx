import React from 'react'

import { useRouter } from 'next/router'

import { CheckoutHeader } from '@/components/layout'
import { useCheckoutQueries } from '@/hooks'
import { orderGetters } from '@/lib/getters'

import { Order } from '@/lib/gql/types'

const StandardCheckoutHeaderTemplate = () => {
  const router = useRouter()
  const { checkoutId } = router.query
  const { data: checkout } = useCheckoutQueries({
    checkoutId: checkoutId as string,
  })
  const numberOfItems = orderGetters.getCheckoutItemCount(checkout as Order)

  return <CheckoutHeader numberOfItems={numberOfItems as number} />
}

export default StandardCheckoutHeaderTemplate
