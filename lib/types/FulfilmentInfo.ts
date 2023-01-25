import type { SbContact } from '@/lib/gql/types'

export interface FulfillmentInfo {
  formattedAddress: string
  fulfillmentContact: SbContact
}
