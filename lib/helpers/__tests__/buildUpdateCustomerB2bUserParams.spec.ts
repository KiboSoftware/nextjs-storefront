import { buildUpdateCustomerB2bUserParams } from '../buildUpdateCustomerB2bUserParams'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'

const mockB2BUserAccount =
  customerB2BUserForPage0Mock?.items && customerB2BUserForPage0Mock?.items[0]

describe('[helpers] buildUpdateCustomerB2bUserInput function', () => {
  it('should return the buildUpdateCustomerB2bUserParams variables', () => {
    const user = {
      id: 1001,
    }

    const values = {
      firstName: 'Kushagra',
      lastName: 'Agrawal',
      emailAddress: 'kushagra.agarwal@gmail.com',
      userName: 'kushagra.agarwal@gmail.com',
      isActive: true,
    }

    expect(
      buildUpdateCustomerB2bUserParams({ user, b2BUser: mockB2BUserAccount, values })
    ).toStrictEqual({
      accountId: 1001,
      userId: 'db9c337e8fdf4304b9b3482f4bd3e321',
      b2BUserInput: {
        ...values,
      },
    })
  })
})
