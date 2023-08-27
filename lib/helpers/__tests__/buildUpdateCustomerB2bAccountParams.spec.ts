import { buildUpdateCustomerB2bAccountParams } from '../buildUpdateCustomerB2bAccountParams'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'

import { B2BUser } from '@/lib/gql/types'

describe('[helpers] buildUpdateCustomerB2bAccountParams function', () => {
  it('should return the buildUpdateCustomerB2bAccountParams variables', () => {
    const parentAccount = {
      id: 1004,
    }

    const values = { parentAccount }

    const { id, parentAccountId, companyOrOrganization, taxId, users } =
      b2BAccountHierarchyResult.accounts[1]
    const { firstName, lastName, emailAddress, userName, localeCode } = users?.[0] as B2BUser

    expect(
      buildUpdateCustomerB2bAccountParams(values, b2BAccountHierarchyResult?.accounts[1])
    ).toStrictEqual({
      accountId: id,
      b2BAccountInput: {
        id,
        parentAccountId,
        companyOrOrganization,
        taxId,
        users: [
          {
            firstName,
            lastName,
            emailAddress,
            userName,
            localeCode,
          },
        ],
      },
    })
  })
})
