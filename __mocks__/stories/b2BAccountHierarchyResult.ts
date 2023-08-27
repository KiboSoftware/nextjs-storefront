import { B2BAccountHierarchyResult } from '@/lib/types/CustomerB2BAccount'

const userFlags = {
  isLocked: false,
  isActive: true,
  isRemoved: false,
}

const commonAccountDetails = {
  isActive: true,
  rootAccountId: 1004,
  taxExempt: false,
  taxId: '123456',
  accountType: 'B2B',
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
    },
    {
      users: [
        {
          emailAddress: 'sushant2006@gmail.com',
          userName: 'sushant2006@gmail.com',
          firstName: 'Sushant2',
          lastName: '006',
          localeCode: 'en-IN',
          userId: 'd05881f3aa3e4fe8b16fd335fac1515d',
          ...userFlags,
        },
      ],
      ...commonAccountDetails,
      parentAccountId: 1004,
      id: 1022,
      companyOrOrganization: 'Child 2',
    },
    {
      users: [
        {
          emailAddress: 'ayush.p@gmail.com',
          userName: 'ayush.p@gmail.com',
          firstName: 'Ayush',
          lastName: 'Porwal',
          localeCode: 'en-IN',
          userId: 'acb5518aa25f469b945eff274561f2df',
          ...userFlags,
        },
      ],
      ...commonAccountDetails,
      parentAccountId: 1022,
      id: 1020,
      companyOrOrganization: 'Child 1',
    },
    {
      users: [
        {
          emailAddress: 'saurabh.m@gmail.com',
          userName: 'saurabh.m@gmail.com',
          firstName: 'Saurabh',
          lastName: 'Mishra',
          localeCode: 'en-IN',
          userId: 'accb4762028b4622af0d5ae99f29bc0c',
          ...userFlags,
        },
      ],
      ...commonAccountDetails,
      parentAccountId: 1022,
      id: 1024,
      companyOrOrganization: 'Child 3',
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
