import { B2BUserCollection } from '@/lib/gql/types'

export const customerB2BUserForPage0Mock: B2BUserCollection = {
  items: [
    {
      emailAddress: 'kushagra.agarwal@outlook.com',
      firstName: 'Kushagra',
      lastName: 'Agarwal',
      isActive: true,
      roles: [
        {
          roleId: 1,
          roleName: 'Admin',
        },
      ],
      userId: 'db9c337e8fdf4304b9b3482f4bd3e321',
    },
    {
      emailAddress: 'james.smith@gmail.com',
      firstName: 'James',
      lastName: 'Smith',
      isActive: false,
      roles: [],
      userId: 'db9c337e8fdf4304b9b3482f4bd3e322',
    },
    {
      emailAddress: 'maria.garcia@gmail.com',
      firstName: 'Maria',
      lastName: 'Garcia',
      isActive: true,
      roles: [],
      userId: 'db9c337e8fdf4304b9b3482f4bd3e323',
    },
    {
      emailAddress: 'david.smith@gmail.com',
      firstName: 'David',
      lastName: 'Smith',
      isActive: true,
      roles: [],
      userId: 'db9c337e8fdf4304b9b3482f4bd3e324',
    },
    {
      emailAddress: 'james.johnson@gmail.com',
      firstName: 'James',
      lastName: 'Johnson',
      isActive: false,
      roles: [],
      userId: 'db9c337e8fdf4304b9b3482f4bd3e325',
    },
  ],
  totalCount: 13,
  startIndex: 0,
  pageSize: 5,
  pageCount: 3,
}

export const customerB2BUserForPage1Mock: B2BUserCollection = {
  items: [
    {
      emailAddress: 'Ramesh.Pawar@com',
      firstName: 'Ramesh',
      lastName: 'Pawar',
      isActive: true,
      userId: '076afe3013df4ee897234bcac93c440c',
      roles: [],
    },
    {
      emailAddress: 'addnew@gmail.com',
      firstName: 'add',
      lastName: 'new',
      isActive: true,
      userId: '346e62ecbc5e45139c490a27e0b00755',
      roles: [
        {
          roleId: 3,
          roleName: 'Nonpurchaser',
          roleTags: [],
          assignedInScope: null,
        },
      ],
    },
    {
      emailAddress: 'bruce@wCorp.com',
      firstName: 'Bruce',
      lastName: 'Wayne',
      isActive: true,
      userId: '3d233f17e9814fbca905a60548ba272e',
      roles: [],
    },
    {
      emailAddress: 'kevin.watts@kibocommerce.com',
      firstName: 'kevin',
      lastName: 'watts',
      isActive: true,
      userId: '44a005ddf8c54059a8a7bd65f2bc011d',
      roles: [
        {
          roleId: 1,
          roleName: 'Admin',
          roleTags: [],
          assignedInScope: null,
        },
      ],
    },
    {
      emailAddress: 'Ashish.Kulkarni@com',
      firstName: 'Ashish',
      lastName: 'Kulkarni',
      isActive: false,
      userId: '5a2e5f0215954cf38c84efd12bcd0d14',
      roles: [],
    },
  ],
  totalCount: 13,
  startIndex: 5,
  pageSize: 5,
  pageCount: 3,
}

export const customerB2BUserForPage2Mock: B2BUserCollection = {
  items: [
    {
      emailAddress: 'divya.jain@live.com',
      firstName: 'Divya',
      lastName: 'Jain',
      isActive: true,
      roles: [
        {
          roleId: 2,
          roleName: 'Purchaser',
        },
      ],
      userId: 'db9c337e8fdf4304b9b3482f4bd3e4r5',
    },
    {
      emailAddress: 'ada@gmail.com',
      firstName: 'Ada',
      lastName: 'Maria',
      isActive: false,
      roles: [],
      userId: 'db9c337e8fdf7894b9b3482f4bd3e322',
    },
    {
      emailAddress: 'elizabeth.brown@gmail.com',
      firstName: 'Elizabeth',
      lastName: 'Brown',
      isActive: true,
      roles: [],
      userId: 'db9c337e8fdf5044b9b3482f4bd3e323',
    },
  ],
  totalCount: 13,
  startIndex: 10,
  pageSize: 5,
  pageCount: 3,
}
