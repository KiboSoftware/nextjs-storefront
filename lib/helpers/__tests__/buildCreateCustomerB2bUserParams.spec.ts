import { buildCreateCustomerB2bUserParams } from '../buildCreateCustomerB2bUserParams'

describe('[helpers] buildCreateCustomerB2bUserInput function', () => {
  it('should return the buildCreateCustomerB2bUserParams variables', () => {
    const user = {
      id: 1001,
    }

    const values = {
      firstName: 'Kushagra',
      lastName: 'Agrawal',
      emailAddress: 'kushagra.agarwal@gmail.com',
      userName: 'kushagra.agarwal@gmail.com',
      localeCode: 'en-US',
      role: 'Admin',
    }
    const roles = [
      { roleName: 'Admin', roleId: 1 },
      { roleName: 'Purchaser', roleId: 2 },
      { roleName: 'Nonpurchaser', roleId: 3 },
    ]
    expect(buildCreateCustomerB2bUserParams({ user, values, roles })).toStrictEqual({
      accountId: 1001,
      b2BUserAndAuthInfoInput: {
        b2BUser: {
          firstName: 'Kushagra',
          lastName: 'Agrawal',
          emailAddress: 'kushagra.agarwal@gmail.com',
          userName: 'kushagra.agarwal@gmail.com',
          localeCode: 'en-US',
          roles: [{ roleId: 1 }],
        },
      },
    })
  })
})
