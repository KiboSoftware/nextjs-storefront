import { userGetters } from '../userGetters'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'

const emailAddress = customerB2BUserForPage0Mock?.items?.[0]?.emailAddress
const firstName = customerB2BUserForPage0Mock?.items?.[0]?.firstName
const lastName = customerB2BUserForPage0Mock?.items?.[0]?.lastName
const isActive = customerB2BUserForPage0Mock?.items?.[0]?.isActive
const role = customerB2BUserForPage0Mock?.items?.[0]?.roles?.[0]?.roleName

describe('[getters] userGetters', () => {
  it('should return email address', () => {
    expect(userGetters.getEmailAddress(customerB2BUserForPage0Mock?.items?.[0])).toEqual(
      emailAddress
    )
  })

  it('should return first name', () => {
    expect(userGetters.getFirstName(customerB2BUserForPage0Mock?.items?.[0])).toEqual(firstName)
  })

  it('should return last name', () => {
    expect(userGetters.getLastName(customerB2BUserForPage0Mock?.items?.[0])).toEqual(lastName)
  })

  it('should return status', () => {
    expect(userGetters.getStatus(customerB2BUserForPage0Mock?.items?.[0])).toEqual(isActive)
  })

  it('should return role', () => {
    expect(userGetters.getRole(customerB2BUserForPage0Mock?.items?.[0])).toEqual(role)
  })
})
