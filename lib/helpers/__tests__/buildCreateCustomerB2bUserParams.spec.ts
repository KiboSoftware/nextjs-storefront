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
      localeCode: 'en-IN',
    }

    expect(buildCreateCustomerB2bUserParams({ user, values })).toStrictEqual({
      accountId: 1001,
      b2BUserAndAuthInfoInput: {
        b2BUser: {
          ...values,
        },
      },
    })
  })
})
