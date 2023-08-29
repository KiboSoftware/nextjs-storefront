import { B2BAccount, MutationUpdateCustomerB2bAccountArgs } from '../gql/types'
import { CreateCustomerB2bAccountParams } from '../types/CustomerB2BAccount'

export const buildUpdateCustomerB2bAccountParams = (
  params: CreateCustomerB2bAccountParams,
  account: B2BAccount
): MutationUpdateCustomerB2bAccountArgs => {
  const { parentAccount, companyOrOrganization, taxId } = params

  const updateCustomerB2bAccountParam = {
    accountId: account?.id,
    b2BAccountInput: {
      id: account?.id,
      parentAccountId: parentAccount?.id,
      companyOrOrganization,
      taxId,
      isActive: true,
    },
  }

  return updateCustomerB2bAccountParam
}
