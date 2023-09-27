import { buildCreateCustomerB2bAccountParams } from '../buildCreateCustomerB2bAccountParams'

describe('[helpers] buildCreateCustomerB2bUserInput function', () => {
  it('should return the buildCreateCustomerB2bAccountParams variables', () => {
    const parentAccount = {
      id: 1001,
    }

    const values = {
      parentAccount,
      companyOrOrganization: 'ABC Organization',
      taxId: 'AS5678Q',
      firstName: 'Kushagra',
      lastName: 'Agrawal',
      emailAddress: 'kushagra.agarwal@gmail.com',
    }

    expect(buildCreateCustomerB2bAccountParams(values)).toStrictEqual({
      b2BAccountInput: {
        accountType: 'B2B',
        approvalStatus: 'PendingApproval',
        id: 0,
        parentAccountId: values.parentAccount.id,
        companyOrOrganization: values.companyOrOrganization,
        taxId: values.taxId,
        users: [
          {
            firstName: values.firstName,
            lastName: values.lastName,
            emailAddress: values.emailAddress,
            userName: values.emailAddress,
            localeCode: 'en-US',
          },
        ],
      },
    })
  })
})
