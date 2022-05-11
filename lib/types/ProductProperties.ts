import { Maybe } from '../gql/types'

export interface ProductProperties {
  name: Maybe<string> | undefined
  value: string | undefined
}
