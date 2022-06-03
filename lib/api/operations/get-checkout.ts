import { fetcher } from '@/lib/api/util'
import { getCheckoutQuery as query } from '@/lib/gql/queries'

import type { Order } from '@/lib/gql/types'

export default async function getCheckout(checkoutId: string): Promise<Order> {
  const variables = {
    checkoutId,
  }
  const response = await fetcher({ query, variables })
  return response.data?.checkout
}
