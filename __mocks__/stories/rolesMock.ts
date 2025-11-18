// Mock customer account for stories
export const mockCustomerAccount = {
  id: 1001,
  companyOrOrganization: 'Acme Corporation',
  emailAddress: 'admin@acme.com',
  firstName: 'John',
  lastName: 'Doe',
}

// Base roles mock with mixed system and custom roles
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

// Mock with only system roles
export const systemRolesOnlyMock = {
  totalCount: 3,
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
  ],
  pageCount: 1,
  pageSize: 20,
  startIndex: 0,
}

// Mock with only custom roles
export const customRolesOnlyMock = {
  totalCount: 3,
  items: [
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
    {
      id: 6,
      name: 'Custom_Manager',
      isSystemRole: false,
      behaviors: [1, 2],
      accountIds: [100],
    },
  ],
  pageCount: 1,
  pageSize: 20,
  startIndex: 0,
}

// Mock with empty roles
export const emptyRolesMock = {
  totalCount: 0,
  items: [],
  pageCount: 0,
  pageSize: 20,
  startIndex: 0,
}

// Mock with many roles for pagination testing
export const manyRolesMock = {
  totalCount: 25,
  items: Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Role_${i + 1}`,
    isSystemRole: i < 3,
    behaviors: [1, 2, 3],
    accountIds: [100],
  })),
  pageCount: 3,
  pageSize: 10,
  startIndex: 0,
}

// Mock with long role names
export const longRoleNamesMock = {
  totalCount: 3,
  items: [
    {
      id: 1,
      name: 'Administrator with Full System Access and Management Privileges',
      isSystemRole: true,
      behaviors: [1, 2, 3, 4, 5],
      accountIds: [100],
    },
    {
      id: 2,
      name: 'Purchaser with Limited Budget and Approval Requirements',
      isSystemRole: false,
      behaviors: [1, 2, 3],
      accountIds: [100],
    },
    {
      id: 3,
      name: 'Non-Purchaser View Only Access Without Any Modification Rights',
      isSystemRole: false,
      behaviors: [1],
      accountIds: [100],
    },
  ],
  pageCount: 1,
  pageSize: 20,
  startIndex: 0,
}

// Mock with roles across multiple accounts
export const multipleAccountsRolesMock = {
  totalCount: 3,
  items: [
    {
      id: 1,
      name: 'Global Admin',
      isSystemRole: true,
      behaviors: [1, 2, 3, 4, 5],
      accountIds: [100, 101, 102, 103],
    },
    {
      id: 2,
      name: 'Multi-Account Purchaser',
      isSystemRole: false,
      behaviors: [1, 2, 3],
      accountIds: [100, 101],
    },
    {
      id: 3,
      name: 'Single Account Manager',
      isSystemRole: false,
      behaviors: [1, 2],
      accountIds: [100],
    },
  ],
  pageCount: 1,
  pageSize: 20,
  startIndex: 0,
}

// Mock with special characters in role names
export const specialCharacterRolesMock = {
  totalCount: 4,
  items: [
    {
      id: 1,
      name: 'Admin & Manager',
      isSystemRole: false,
      behaviors: [1, 2, 3],
      accountIds: [100],
    },
    {
      id: 2,
      name: 'Purchaser (Level-1)',
      isSystemRole: false,
      behaviors: [1, 2],
      accountIds: [100],
    },
    {
      id: 3,
      name: 'Role #3: Special',
      isSystemRole: false,
      behaviors: [1],
      accountIds: [100],
    },
    {
      id: 4,
      name: 'User@Company.com',
      isSystemRole: false,
      behaviors: [1],
      accountIds: [100],
    },
  ],
  pageCount: 1,
  pageSize: 20,
  startIndex: 0,
}
