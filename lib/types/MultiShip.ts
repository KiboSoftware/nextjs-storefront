import { CrContact } from '../gql/types'

export type MultiShipAddress = {
  destinationId: string
  address: CrContact
}
export type ShipOption = {
  value: string
  code: string
  name: string
  label: string
  shortName: string
}
