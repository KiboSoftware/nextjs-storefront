import { MutationCreateCustomerB2bAccountArgs } from '../gql/types'
import { CreateCustomerB2bAccountParams } from '../types/CustomerB2BAccount'

export const buildCreateCustomerB2bAccountParams = (
  params: CreateCustomerB2bAccountParams,
  isAccountHierarchy?: boolean
): MutationCreateCustomerB2bAccountArgs => {
  const { parentAccount, companyOrOrganization, taxId, firstName, lastName, emailAddress } = params

  const createCustomerB2bAccountParam = {
    b2BAccountInput: {
      id: 0,
      parentAccountId: parentAccount?.id,
      companyOrOrganization,
      taxId,
      accountType: 'B2B',
      ...(!isAccountHierarchy ? { approvalStatus: 'PendingApproval' } : {}),
      users: [
        {
          firstName,
          lastName,
          emailAddress,
          userName: emailAddress,
          localeCode: 'en-US',
        },
      ],
    },
  }

  return createCustomerB2bAccountParam
}
