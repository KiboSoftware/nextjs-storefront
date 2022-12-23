import { CrContact } from "../gql/types"

export type MultiShipAddress = {
  destinationId: string
  address: CrContact
}