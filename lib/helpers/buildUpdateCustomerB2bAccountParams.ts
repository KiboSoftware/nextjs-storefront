import { B2BAccount, B2BUser, MutationUpdateCustomerB2bAccountArgs } from '../gql/types'
import { UpdateCustomerB2bAccountParams } from '../types/CustomerB2BAccount'

export const buildUpdateCustomerB2bAccountParams = (
  params: UpdateCustomerB2bAccountParams,
  account: B2BAccount
): MutationUpdateCustomerB2bAccountArgs => {
  const { parentAccount } = params
  const { id, companyOrOrganization, taxId } = account
  const { firstName, lastName, emailAddress } = account?.users?.[0] as B2BUser

  const updateCustomerB2bAccountParam = {
    accountId: id,
    b2BAccountInput: {
      id,
      parentAccountId: parentAccount?.id,
      companyOrOrganization,
      taxId,
      users: [
        {
          firstName,
          lastName,
          emailAddress,
          userName: emailAddress,
          localeCode: 'en-IN',
        },
      ],
    },
  }

  return updateCustomerB2bAccountParam
}
