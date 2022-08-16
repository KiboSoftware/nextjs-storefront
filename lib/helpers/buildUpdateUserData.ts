import type { UpdateUserData } from '../gql/types'

export const buildUpdateUserData = (
  firstName: string,
  lastNameOrSurname: string,
  emailAddress: string
): UpdateUserData => {
  return {
    firstName,
    lastNameOrSurname,
    emailAddress,
  }
}
