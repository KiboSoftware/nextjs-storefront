import { B2BUser, B2BUserCollection } from '@/lib/gql/types'

export const customerB2bUserMock = {
  items: [
    {
      id: 1,
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
      id: 2,
      emailAddress: 'james.smith@gmail.com',
      firstName: 'James',
      lastName: 'Smith',
      isActive: false,
      roles: [],
      userId: 'db9c337e8fdf4304b9b3482f4bd3e322',
    },
    {
      id: 3,
      emailAddress: 'maria.garcia@gmail.com',
      firstName: 'Maria',
      lastName: 'Garcia',
      isActive: true,
      roles: [],
      userId: 'db9c337e8fdf4304b9b3482f4bd3e323',
    },
    {
      id: 4,
      emailAddress: 'david.smith@gmail.com',
      firstName: 'David',
      lastName: 'Smith',
      isActive: true,
      roles: [],
      userId: 'db9c337e8fdf4304b9b3482f4bd3e324',
    },
    {
      id: 5,
      emailAddress: 'james.johnson@gmail.com',
      firstName: 'James',
      lastName: 'Johnson',
      isActive: false,
      roles: [],
      userId: 'db9c337e8fdf4304b9b3482f4bd3e325',
    },
  ],
  totalCount: 5,
  startIndex: 0,
  pageSize: 5,
  pageCount: 1,
}
