import { FormStates } from '../constants'

import type { CrContact, Maybe } from '../gql/types'

export interface PersonalDetails {
  email: Maybe<string> | undefined
}

export interface Action {
  type: FormStates.COMPLETE | FormStates.INCOMPLETE | FormStates.VALIDATE
}

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

export interface CustomDestinationInput extends CrContact {
  destinationId?: string
  itemId: string
}
