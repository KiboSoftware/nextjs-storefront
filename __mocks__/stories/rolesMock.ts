export const rolesMock = {
  totalCount: 5,
  items: [
    {
      id: 1,
      name: 'Admin',
      isSystemRole: true,
      behaviors: [1, 2, 3, 4, 5],
      accountIds: [100],
    },
    {
      id: 2,
      name: 'Purchaser',
      isSystemRole: true,
      behaviors: [1, 2, 3],
      accountIds: [100],
    },
    {
      id: 3,
      name: 'Non-Purchaser',
      isSystemRole: true,
      behaviors: [1],
      accountIds: [100],
    },
    {
      id: 4,
      name: 'Admin_Copy',
      isSystemRole: false,
      behaviors: [1, 2, 3, 4, 5],
      accountIds: [100],
    },
    {
      id: 5,
      name: 'Purchaser_Copy',
      isSystemRole: false,
      behaviors: [1, 2, 3],
      accountIds: [100],
    },
  ],
  pageCount: 1,
  pageSize: 20,
  startIndex: 0,
}
