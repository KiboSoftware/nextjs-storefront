import { buildB2bUserRoleParams } from '../buildB2bUserRoleParams'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'

import { B2BUser } from '@/lib/gql/types'

const mockB2BUserAccount =
  customerB2BUserForPage0Mock?.items && customerB2BUserForPage0Mock?.items[0]

describe('[helpers] buildB2bUserRoleInput function', () => {
  it('should return the buildB2bUserRoleParams variables', () => {
    const user = {
      id: 1001,
    }
    const roles = [
      { roleName: 'Admin', roleId: 1 },
      { roleName: 'Purchaser', roleId: 2 },
      { roleName: 'Nonpurchaser', roleId: 3 },
    ]

    const values = {
      firstName: 'Kushagra',
      lastName: 'Agrawal',
      emailAddress: 'kushagra.agarwal@gmail.com',
      userName: 'kushagra.agarwal@gmail.com',
      localeCode: 'en-IN',
      role: 'Purchaser',
    }

    expect(
      buildB2bUserRoleParams({ user, b2BUser: mockB2BUserAccount as B2BUser, roles, values })
    ).toStrictEqual({
      accountId: 1001,
      userId: 'db9c337e8fdf4304b9b3482f4bd3e321',
      roleId: 2,
    })
  })
})
