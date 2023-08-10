import { B2BAccountHierarchyResult } from '@/lib/types/CustomerB2BAccount'

const commerceSummary = {
  totalOrderAmount: {
    amount: 0,
  },
  orderCount: 0,
  wishlistCount: 0,
  visitsCount: 0,
}

const updatedAndCreatedBy = {
  updateBy: 'tbd',
  createBy: 'tbd',
}

const userFlags = {
  isLocked: false,
  isActive: true,
  isRemoved: false,
  acceptsMarketing: false,
  hasExternalPassword: false,
}

const commonAccountDetails = {
  isActive: true,
  salesReps: [],
  rootAccountId: 1004,
  approvalStatus: 'Approved',
  customerSet: 'default',
  commerceSummary,
  segments: [],
  taxExempt: false,
  taxId: '123456',
  accountType: 'B2B',
  migrationRequired: false,
}

export const b2BAccountHierarchyResult: B2BAccountHierarchyResult = {
  accounts: [
    {
      users: [
        {
          emailAddress: 'sushant.jadhav@kibocommerce.com',
          userName: 'sushant.jadhav@kibocommerce.com',
          firstName: 'Sushant',
          lastName: 'Jadhav',
          localeCode: 'en-us',
          userId: '0abbfb8811d94deba8e9f13906173a0f',
          ...userFlags,
        },
        {
          emailAddress: 'geetanshu.chhabra@kibocommerce.com',
          userName: 'geetanshu.chhabra@kibocommerce.com',
          firstName: 'Geetanshu',
          lastName: 'chabbra',
          localeCode: 'en-US',
          userId: 'c0a204d4fce347f1ac059eb4814dfbbd',
          ...userFlags,
        },
      ],
      ...commonAccountDetails,
      id: 1004,
      companyOrOrganization: 'Sushant Account',
      auditInfo: {
        updateDate: '2023-07-20T06:36:32.782Z',
        createDate: '2023-04-17T06:45:26.149Z',
        ...updatedAndCreatedBy,
      },
      customerSinceDate: '2023-04-17T06:45:26.149Z',
    },
    {
      users: [
        {
          emailAddress: 'sushant2006@gmail.com',
          userName: 'sushant2006@gmail.com',
          firstName: 'Jadhav',
          localeCode: 'en-IN',
          userId: 'd05881f3aa3e4fe8b16fd335fac1515d',
          ...userFlags,
        },
      ],
      ...commonAccountDetails,
      parentAccountId: 1004,
      id: 1022,
      companyOrOrganization: 'Child 2',
      auditInfo: {
        updateDate: '2023-07-20T05:24:25.359Z',
        createDate: '2023-07-20T05:24:25.359Z',
        ...updatedAndCreatedBy,
      },
      customerSinceDate: '2023-07-20T05:24:25.355Z',
    },
    {
      users: [
        {
          emailAddress: 'sushant2005@gmail.com',
          userName: 'sushant2005@gmail.com',
          firstName: 'Jadhav',
          localeCode: 'en-IN',
          userId: 'acb5518aa25f469b945eff274561f2df',
          ...userFlags,
        },
      ],
      ...commonAccountDetails,
      parentAccountId: 1022,
      id: 1020,
      companyOrOrganization: 'Child 1',
      auditInfo: {
        updateDate: '2023-07-21T06:39:41.769Z',
        createDate: '2023-07-19T08:38:02.409Z',
        ...updatedAndCreatedBy,
      },
      customerSinceDate: '2023-07-19T08:38:02.403Z',
    },
    {
      users: [
        {
          emailAddress: 'sushant2007@gmail.com',
          userName: 'sushant2007@gmail.com',
          firstName: 'Jadhav',
          localeCode: 'en-IN',
          userId: 'accb4762028b4622af0d5ae99f29bc0c',
          ...userFlags,
        },
      ],
      ...commonAccountDetails,
      parentAccountId: 1022,
      id: 1024,
      companyOrOrganization: 'Child 3',
      auditInfo: {
        updateDate: '2023-07-21T06:54:14.079Z',
        createDate: '2023-07-21T06:15:38.934Z',
        ...updatedAndCreatedBy,
      },
      customerSinceDate: '2023-07-21T06:15:38.931Z',
    },
  ],
  hierarchy: {
    id: 1004,
    children: [
      {
        id: 1022,
        children: [
          {
            id: 1020,
            children: [],
          },
          {
            id: 1024,
            children: [],
          },
        ],
      },
    ],
  },
}
