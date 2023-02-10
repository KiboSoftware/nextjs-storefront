import type { SavedCard } from '@/lib/types'

import type { SbContact } from '@/lib/gql/types'

export interface BillingInfo {
  formattedAddress: string
  cardInfo: SavedCard
  billingAddressInfo: SbContact
}
