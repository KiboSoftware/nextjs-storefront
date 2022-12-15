import React from 'react'

import { useRouter } from 'next/router'

import { CheckoutHeader } from '@/components/layout'
import { useCheckoutQueries } from '@/hooks'
import { orderGetters } from '@/lib/getters'

import { CrOrder } from '@/lib/gql/types'

const StandardCheckoutHeaderTemplate = () => {
  const router = useRouter()
  const checkoutId = router?.query?.checkoutId
  const { data: checkout } = useCheckoutQueries({
    checkoutId: checkoutId as string,
  })
  const numberOfItems = orderGetters.getCheckoutItemCount(checkout as CrOrder)

  return <CheckoutHeader numberOfItems={numberOfItems as number} />
}

export default StandardCheckoutHeaderTemplate
