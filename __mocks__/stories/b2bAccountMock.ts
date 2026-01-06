import { B2BAccount } from '@/lib/gql/types'

// Mock B2B Accounts data - Multi-level hierarchy
export const mockB2BAccountsHierarchy: B2BAccount[] = [
  {
    id: 1001,
    parentAccountId: null,
    taxId: '123456789',
    companyOrOrganization: 'Parent Corporation',
  },
  {
    id: 1002,
    parentAccountId: 1001,
    taxId: '987654321',
    companyOrOrganization: 'Child Company A',
  },
  {
    id: 1003,
    parentAccountId: 1001,
    taxId: '456789123',
    companyOrOrganization: 'Child Company B',
  },
  {
    id: 1004,
    parentAccountId: 1002,
    taxId: '789123456',
    companyOrOrganization: 'Grandchild Company A1',
  },
  {
    id: 1005,
    parentAccountId: 1002,
    taxId: '321654987',
    companyOrOrganization: 'Grandchild Company A2',
  },
  {
    id: 1006,
    parentAccountId: 1003,
    taxId: '654987321',
    companyOrOrganization: 'Grandchild Company B1',
  },
  {
    id: 1007,
    parentAccountId: 1004,
    taxId: '147258369',
    companyOrOrganization: 'Great-Grandchild Company A1-1',
  },
  {
    id: 1008,
    parentAccountId: 1005,
    taxId: '258369147',
    companyOrOrganization: 'Great-Grandchild Company A2-1',
  },
]
