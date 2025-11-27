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

  it('should return params without roles when role is not provided', () => {
    const user = {
      id: 1001,
    }

    const values = {
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@example.com',
      userName: 'john.doe@example.com',
      localeCode: 'en-US',
    }

    expect(buildCreateCustomerB2bUserParams({ user, values })).toStrictEqual({
      accountId: 1001,
      b2BUserAndAuthInfoInput: {
        b2BUser: {
          firstName: 'John',
          lastName: 'Doe',
          emailAddress: 'john.doe@example.com',
          userName: 'john.doe@example.com',
          localeCode: 'en-US',
        },
      },
    })
  })

  it('should use emailAddress as userName when userName is not provided', () => {
    const user = {
      id: 1001,
    }

    const values = {
      firstName: 'Jane',
      lastName: 'Smith',
      emailAddress: 'jane.smith@example.com',
      localeCode: 'en-US',
      role: 'Purchaser',
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
          firstName: 'Jane',
          lastName: 'Smith',
          emailAddress: 'jane.smith@example.com',
          userName: 'jane.smith@example.com',
          localeCode: 'en-US',
          roles: [{ roleId: 2 }],
        },
      },
    })
  })

  it('should use default localeCode when not provided', () => {
    const user = {
      id: 1001,
    }

    const values = {
      firstName: 'Bob',
      lastName: 'Johnson',
      emailAddress: 'bob.johnson@example.com',
      userName: 'bob.johnson@example.com',
    }

    expect(buildCreateCustomerB2bUserParams({ user, values })).toStrictEqual({
      accountId: 1001,
      b2BUserAndAuthInfoInput: {
        b2BUser: {
          firstName: 'Bob',
          lastName: 'Johnson',
          emailAddress: 'bob.johnson@example.com',
          userName: 'bob.johnson@example.com',
          localeCode: 'en-US',
        },
      },
    })
  })

  it('should not include roles when role does not match any role in the roles array', () => {
    const user = {
      id: 1001,
    }

    const values = {
      firstName: 'Alice',
      lastName: 'Williams',
      emailAddress: 'alice.williams@example.com',
      userName: 'alice.williams@example.com',
      localeCode: 'en-US',
      role: 'NonExistentRole',
    }

    const roles = [
      { roleName: 'Admin', roleId: 1 },
      { roleName: 'Purchaser', roleId: 2 },
    ]

    expect(buildCreateCustomerB2bUserParams({ user, values, roles })).toStrictEqual({
      accountId: 1001,
      b2BUserAndAuthInfoInput: {
        b2BUser: {
          firstName: 'Alice',
          lastName: 'Williams',
          emailAddress: 'alice.williams@example.com',
          userName: 'alice.williams@example.com',
          localeCode: 'en-US',
        },
      },
    })
  })
})
