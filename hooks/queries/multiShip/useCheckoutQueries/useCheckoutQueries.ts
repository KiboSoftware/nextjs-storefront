import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCheckoutQuery } from '@/lib/gql/queries'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { Checkout } from '@/lib/gql/types'
interface UseCheckout {
  checkoutId?: string
  initialCheckout?: Checkout
}

export interface UseMultiShipCheckoutResponse {
  data: Checkout | undefined
  isLoading: boolean
  isSuccess: boolean
}

const getCheckout = async (checkoutId?: string | null) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: `query checkout($checkoutId:String!){
  checkout(checkoutId: $checkoutId) {
    id
    siteId
    tenantId
    feeTotal
    subTotal
    itemTaxTotal
    itemTotal
    shippingSubTotal
    shippingTaxTotal
    itemLevelShippingDiscountTotal
    orderLevelShippingDiscountTotal
    shippingTotal
    handlingSubTotal
    itemLevelHandlingDiscountTotal
    orderLevelHandlingDiscountTotal
    handlingTaxTotal
    handlingTotal
    total
    amountRemainingForPayment
    itemLevelProductDiscountTotal
    orderLevelProductDiscountTotal
    items{
      quantity
      product{
        productCode
        name
      }
      
    }
  
    }
}`, //@to-do, multiship query
    variables: { checkoutId },
  })

  return response?.checkout
}

const useCheckoutQueries = ({
  checkoutId,
  initialCheckout,
}: UseCheckout): UseMultiShipCheckoutResponse => {
  const id = checkoutId as string

  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(checkoutKeys.detail(id), () => getCheckout(checkoutId), {
    initialData: initialCheckout,
  })

  return { data, isLoading, isSuccess }
}

export const useMultiShipCheckoutQueries = useCheckoutQueries
