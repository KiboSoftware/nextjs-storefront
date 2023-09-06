import { buildUpdateCustomerB2bAccountParams } from '../buildUpdateCustomerB2bAccountParams'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
import { CreateCustomerB2bAccountParams } from '@/lib/types'

import { B2BUser } from '@/lib/gql/types'

describe('[helpers] buildUpdateCustomerB2bAccountParams function', () => {
  it('should return the buildUpdateCustomerB2bAccountParams variables', () => {
    const parentAccount = {
      id: 1174,
    }

    const { id, parentAccountId, companyOrOrganization, taxId, users } =
      b2BAccountHierarchyResult.accounts[1]
    const { firstName, lastName, emailAddress } = users?.[0] as B2BUser

    const values: CreateCustomerB2bAccountParams = {
      parentAccount,
      companyOrOrganization: companyOrOrganization,
      taxId: taxId as string,
      firstName: firstName as string,
      lastName: lastName as string,
      emailAddress: emailAddress as string,
    }

    expect(
      buildUpdateCustomerB2bAccountParams(values, b2BAccountHierarchyResult?.accounts[1])
    ).toStrictEqual({
      accountId: id,
      b2BAccountInput: {
        id,
        parentAccountId,
        companyOrOrganization,
        taxId,
        isActive: true,
      },
    })
  })
})
