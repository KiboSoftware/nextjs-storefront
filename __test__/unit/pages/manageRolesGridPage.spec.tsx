/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import { NextRouter, useRouter } from 'next/router'

import {
  getCurrentUser,
  getRolesByAccountId,
  getUsersByRoleAsync,
  getRoleByRoleIdAsync,
  getMultipleB2BAccountUserBehaviors,
  getB2BAccountUserBehaviors,
} from '@/lib/api/operations'
import type { GetRolesAsyncResponse } from '@/lib/api/operations/get-roles-by-account-id'
import type { CustomerAccount } from '@/lib/gql/types'
import ManageRolesPage, { getServerSideProps } from '@/src/pages/my-account/b2b/manage-roles'

// Mock dependencies
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/lib/api/operations', () => ({
  getCurrentUser: jest.fn(),
  getRolesByAccountId: jest.fn(),
  getUsersByRoleAsync: jest.fn(),
  getRoleByRoleIdAsync: jest.fn(),
  getMultipleB2BAccountUserBehaviors: jest.fn(),
  getB2BAccountUserBehaviors: jest.fn(),
}))

jest.mock('next-i18next/serverSideTranslations', () => ({
  serverSideTranslations: jest.fn(() => Promise.resolve({ _nextI18Next: {} })),
}))

jest.mock('@/components/page-templates', () => ({
  ManageRolesTemplate: jest.fn(({ customerAccount, initialData, onAccountTitleClick }) => (
    <div data-testid="manage-roles-template">
      <div data-testid="customer-account">
        {customerAccount ? customerAccount.emailAddress : 'No Account'}
      </div>
      <div data-testid="initial-data">
        {initialData ? `Roles: ${initialData.totalCount}` : 'No Data'}
      </div>
      <button data-testid="account-title-click" onClick={onAccountTitleClick}>
        Account Title
      </button>
    </div>
  )),
}))

const mockGetCurrentUser = getCurrentUser as jest.MockedFunction<typeof getCurrentUser>
const mockGetRolesByAccountId = getRolesByAccountId as jest.MockedFunction<
  typeof getRolesByAccountId
>
const mockGetUsersByRoleAsync = getUsersByRoleAsync as jest.MockedFunction<
  typeof getUsersByRoleAsync
>
const mockGetRoleByRoleIdAsync = getRoleByRoleIdAsync as jest.MockedFunction<
  typeof getRoleByRoleIdAsync
>
const mockGetMultipleB2BAccountUserBehaviors =
  getMultipleB2BAccountUserBehaviors as jest.MockedFunction<
    typeof getMultipleB2BAccountUserBehaviors
  >
const mockGetB2BAccountUserBehaviors = getB2BAccountUserBehaviors as jest.MockedFunction<
  typeof getB2BAccountUserBehaviors
>
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>

describe('[Page] ManageRolesPage', () => {
  const mockCustomerAccount: CustomerAccount = {
    id: 1001,
    emailAddress: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    userName: 'admin',
    companyOrOrganization: 'ACME Corporation',
    isActive: true,
  }

  const mockRolesData: GetRolesAsyncResponse = {
    startIndex: 0,
    pageSize: 20,
    pageCount: 1,
    totalCount: 3,
    items: [
      {
        id: 1,
        name: 'Administrator',
        isSystemRole: true,
        behaviors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      {
        id: 2,
        name: 'Store Manager',
        isSystemRole: false,
        behaviors: [1, 2, 3, 5, 7],
      },
      {
        id: 3,
        name: 'Sales Associate',
        isSystemRole: false,
        behaviors: [1, 2],
      },
    ],
  }

  const mockRouter: Partial<NextRouter> = {
    push: jest.fn(),
    pathname: '/my-account/b2b/manage-roles',
    query: {},
    asPath: '/my-account/b2b/manage-roles',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue(mockRouter as NextRouter)

    // Set default mock implementations
    mockGetUsersByRoleAsync.mockResolvedValue([])
    mockGetRoleByRoleIdAsync.mockResolvedValue({
      id: 1,
      name: 'Test Role',
      accountIds: [1001],
    } as any)
    mockGetMultipleB2BAccountUserBehaviors.mockResolvedValue({})
    mockGetB2BAccountUserBehaviors.mockResolvedValue([])
  })

  describe('Component Rendering', () => {
    it('should render ManageRolesPage component without errors', () => {
      render(<ManageRolesPage customerAccount={mockCustomerAccount} rolesData={mockRolesData} />)

      expect(screen.getByTestId('manage-roles-template')).toBeInTheDocument()
    })

    it('should pass customerAccount prop to ManageRolesTemplate', () => {
      render(<ManageRolesPage customerAccount={mockCustomerAccount} rolesData={mockRolesData} />)

      expect(screen.getByTestId('customer-account')).toHaveTextContent('admin@example.com')
    })

    it('should pass rolesData as initialData to ManageRolesTemplate', () => {
      render(<ManageRolesPage customerAccount={mockCustomerAccount} rolesData={mockRolesData} />)

      expect(screen.getByTestId('initial-data')).toHaveTextContent('Roles: 3')
    })

    it('should render without customerAccount when not provided', () => {
      render(<ManageRolesPage rolesData={mockRolesData} />)

      expect(screen.getByTestId('customer-account')).toHaveTextContent('No Account')
    })

    it('should render without rolesData when not provided', () => {
      render(<ManageRolesPage customerAccount={mockCustomerAccount} />)

      expect(screen.getByTestId('initial-data')).toHaveTextContent('No Data')
    })

    it('should render with minimal props', () => {
      render(<ManageRolesPage />)

      expect(screen.getByTestId('manage-roles-template')).toBeInTheDocument()
      expect(screen.getByTestId('customer-account')).toHaveTextContent('No Account')
      expect(screen.getByTestId('initial-data')).toHaveTextContent('No Data')
    })
  })

  describe('Navigation Functionality', () => {
    it('should navigate to My Account page when handleAccountTitleClick is called', async () => {
      render(<ManageRolesPage customerAccount={mockCustomerAccount} rolesData={mockRolesData} />)

      const accountTitleButton = screen.getByTestId('account-title-click')
      accountTitleButton.click()

      await waitFor(() => {
        expect(mockRouter.push).toHaveBeenCalledWith('/my-account')
      })
    })

    it('should pass correct onAccountTitleClick handler to template', () => {
      render(<ManageRolesPage customerAccount={mockCustomerAccount} rolesData={mockRolesData} />)

      const accountTitleButton = screen.getByTestId('account-title-click')
      expect(accountTitleButton).toBeInTheDocument()
    })
  })

  describe('getServerSideProps - Success Scenarios', () => {
    it('should fetch and return customerAccount and rolesData successfully', async () => {
      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      expect(result).toEqual({
        props: {
          customerAccount: mockCustomerAccount,
          rolesData: mockRolesData,
          usersByRole: expect.any(Object),
          accountUserBehaviorsForAllAccounts: expect.any(Object),
          accountUserBehaviors: expect.any(Array),
          _nextI18Next: {},
        },
      })
    })

    it('should call getCurrentUser with correct parameters', async () => {
      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

      const mockReq = { headers: { cookie: 'auth=token' } } as any
      const mockRes = {} as any
      const context = {
        locale: 'en',
        req: mockReq,
        res: mockRes,
      } as any

      await getServerSideProps(context)

      expect(mockGetCurrentUser).toHaveBeenCalledWith(mockReq, mockRes)
    })

    it('should call getRolesByAccountId with correct parameters', async () => {
      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

      const mockReq = { headers: { cookie: 'auth=token' } } as any
      const mockRes = {} as any
      const context = {
        locale: 'en',
        req: mockReq,
        res: mockRes,
      } as any

      await getServerSideProps(context)

      expect(mockGetRolesByAccountId).toHaveBeenCalledWith(mockReq, mockRes)
    })

    it('should handle multiple roles in rolesData', async () => {
      const largeRolesData: GetRolesAsyncResponse = {
        startIndex: 0,
        pageSize: 20,
        pageCount: 1,
        totalCount: 10,
        items: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: `Role ${i + 1}`,
          isSystemRole: false,
          behaviors: [1, 2],
        })),
      }

      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(largeRolesData)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      expect(result.props.rolesData?.totalCount).toBe(10)
      expect(result.props.rolesData?.items).toHaveLength(10)
    })

    it('should handle French locale', async () => {
      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

      const context = {
        locale: 'fr',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      expect(result.props.customerAccount).toEqual(mockCustomerAccount)
      expect(result.props.rolesData).toEqual(mockRolesData)
    })

    it('should handle German locale', async () => {
      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

      const context = {
        locale: 'de',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      expect(result.props.customerAccount).toEqual(mockCustomerAccount)
    })
  })

  describe('getServerSideProps - Error Handling', () => {
    it('should handle undefined customerAccount response', async () => {
      mockGetCurrentUser.mockResolvedValue({})
      mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      expect(result.props.customerAccount).toBeUndefined()
      expect(result.props.rolesData).toEqual(mockRolesData)
    })

    it('should handle null rolesData response', async () => {
      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(null as any)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      expect(result.props.customerAccount).toEqual(mockCustomerAccount)
      expect(result.props.rolesData).toBeNull()
    })

    it('should handle getCurrentUser API error', async () => {
      mockGetCurrentUser.mockRejectedValue(new Error('Unauthorized'))
      mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      await expect(getServerSideProps(context)).rejects.toThrow('Unauthorized')
    })

    it('should handle getRolesByAccountId API error', async () => {
      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockRejectedValue(new Error('Failed to fetch roles'))

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      await expect(getServerSideProps(context)).rejects.toThrow('Failed to fetch roles')
    })

    it('should handle network timeout error', async () => {
      mockGetCurrentUser.mockRejectedValue(new Error('Network timeout'))
      mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      await expect(getServerSideProps(context)).rejects.toThrow('Network timeout')
    })

    it('should handle 401 unauthorized error', async () => {
      const unauthorizedError = new Error('401: Unauthorized access')
      mockGetCurrentUser.mockRejectedValue(unauthorizedError)
      mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      await expect(getServerSideProps(context)).rejects.toThrow('401: Unauthorized access')
    })

    it('should handle 500 internal server error', async () => {
      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockRejectedValue(new Error('500: Internal Server Error'))

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      await expect(getServerSideProps(context)).rejects.toThrow('500: Internal Server Error')
    })
  })

  describe('getServerSideProps - Edge Cases', () => {
    it('should handle empty rolesData items array', async () => {
      const emptyRolesData: GetRolesAsyncResponse = {
        startIndex: 0,
        pageSize: 20,
        pageCount: 0,
        totalCount: 0,
        items: [],
      }

      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(emptyRolesData)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      expect(result.props.rolesData?.totalCount).toBe(0)
      expect(result.props.rolesData?.items).toEqual([])
    })

    it('should handle customerAccount without companyOrOrganization', async () => {
      const minimalCustomerAccount: CustomerAccount = {
        id: 1001,
        emailAddress: 'user@example.com',
        userName: 'user',
        isActive: true,
      }

      mockGetCurrentUser.mockResolvedValue({
        customerAccount: minimalCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      expect(result.props.customerAccount).toEqual(minimalCustomerAccount)
    })

    it('should handle roles with minimal fields', async () => {
      const minimalRolesData: GetRolesAsyncResponse = {
        startIndex: 0,
        pageSize: 20,
        pageCount: 1,
        totalCount: 1,
        items: [
          {
            id: 1,
            name: 'Basic Role',
            isSystemRole: false,
            behaviors: [],
          },
        ],
      }

      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(minimalRolesData)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      // @ts-expect-error - Testing edge case with minimal fields
      expect(result.props.rolesData?.items[0].behaviors).toEqual([])
    })

    it('should handle missing locale (defaults to undefined)', async () => {
      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

      const context = {
        locale: undefined,
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      expect(result.props.customerAccount).toEqual(mockCustomerAccount)
      expect(result.props.rolesData).toEqual(mockRolesData)
    })

    it('should handle system roles only', async () => {
      const systemRolesOnly: GetRolesAsyncResponse = {
        startIndex: 0,
        pageSize: 20,
        pageCount: 1,
        totalCount: 3,
        items: [
          {
            id: 1,
            name: 'Administrator',
            isSystemRole: true,
            behaviors: [1, 2, 3],
          },
          {
            id: 2,
            name: 'Buyer',
            isSystemRole: true,
            behaviors: [1, 2],
          },
          {
            id: 3,
            name: 'Purchaser',
            isSystemRole: true,
            behaviors: [1],
          },
        ],
      }

      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(systemRolesOnly)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      // @ts-expect-error - Testing system roles filtering
      expect(result.props.rolesData?.items.every((role) => role.isSystemRole)).toBe(true)
    })

    it('should handle custom roles only', async () => {
      const customRolesOnly: GetRolesAsyncResponse = {
        startIndex: 0,
        pageSize: 20,
        pageCount: 1,
        totalCount: 2,
        items: [
          {
            id: 101,
            name: 'Regional Manager',
            isSystemRole: false,
            behaviors: [1, 2, 3],
          },
          {
            id: 102,
            name: 'Store Manager',
            isSystemRole: false,
            behaviors: [1, 2],
          },
        ],
      }

      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(customRolesOnly)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      // @ts-expect-error - Testing custom roles filtering
      expect(result.props.rolesData?.items.every((role) => !role.isSystemRole)).toBe(true)
    })

    it('should handle large number of roles (100+ roles)', async () => {
      const largeRolesData: GetRolesAsyncResponse = {
        startIndex: 0,
        pageSize: 100,
        pageCount: 2,
        totalCount: 150,
        items: Array.from({ length: 100 }, (_, i) => ({
          id: i + 1,
          name: `Role ${i + 1}`,
          isSystemRole: false,
          behaviors: [1],
        })),
      }

      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(largeRolesData)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      expect(result.props.rolesData?.totalCount).toBe(150)
      expect(result.props.rolesData?.items).toHaveLength(100)
    })

    it('should handle roles with special characters in names', async () => {
      const specialCharRoles: GetRolesAsyncResponse = {
        startIndex: 0,
        pageSize: 20,
        pageCount: 1,
        totalCount: 3,
        items: [
          {
            id: 1,
            name: "Manager's Role",
            isSystemRole: false,
            behaviors: [1],
          },
          {
            id: 2,
            name: 'Role & Permissions',
            isSystemRole: false,
            behaviors: [2],
          },
          {
            id: 3,
            name: 'Role <Admin>',
            isSystemRole: false,
            behaviors: [3],
          },
        ],
      }

      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(specialCharRoles)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      // @ts-expect-error - Testing special characters in role names
      expect(result.props.rolesData?.items[0].name).toBe("Manager's Role")
      // @ts-expect-error - Testing special characters in role names
      expect(result.props.rolesData?.items[1].name).toBe('Role & Permissions')
      // @ts-expect-error - Testing special characters in role names
      expect(result.props.rolesData?.items[2].name).toBe('Role <Admin>')
    })
  })

  describe('Scenario-Based Tests', () => {
    describe('TC-UT-001: Navigate to Manage Roles Page', () => {
      it('should successfully load the Manage Roles page with all required data', async () => {
        mockGetCurrentUser.mockResolvedValue({
          customerAccount: mockCustomerAccount,
        })
        mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

        const context = {
          locale: 'en',
          req: {} as any,
          res: {} as any,
        } as any

        const result = await getServerSideProps(context)

        // Verify customer account loaded
        expect(result.props.customerAccount).toBeDefined()
        expect(result.props.customerAccount?.emailAddress).toBe('admin@example.com')

        // Verify roles data loaded
        expect(result.props.rolesData).toBeDefined()
        expect(result.props.rolesData?.totalCount).toBe(3)
        expect(result.props.rolesData?.items).toHaveLength(3)

        // Verify translations loaded
        expect(result.props._nextI18Next).toBeDefined()

        // Render page with loaded data
        render(
          <ManageRolesPage
            customerAccount={result.props.customerAccount}
            rolesData={result.props.rolesData || undefined}
          />
        )

        expect(screen.getByTestId('manage-roles-template')).toBeInTheDocument()
      })
    })

    describe('TC-UT-002: View Roles Grid with System and Custom Roles', () => {
      it('should display both system roles and custom roles', async () => {
        const mixedRoles: GetRolesAsyncResponse = {
          startIndex: 0,
          pageSize: 20,
          pageCount: 1,
          totalCount: 5,
          items: [
            { id: 1, name: 'Administrator', isSystemRole: true, behaviors: [1, 2, 3] },
            { id: 2, name: 'Buyer', isSystemRole: true, behaviors: [1, 2] },
            { id: 3, name: 'Purchaser', isSystemRole: true, behaviors: [1] },
            { id: 101, name: 'Regional Manager', isSystemRole: false, behaviors: [1, 2] },
            { id: 102, name: 'Store Manager', isSystemRole: false, behaviors: [1] },
          ],
        }

        mockGetCurrentUser.mockResolvedValue({
          customerAccount: mockCustomerAccount,
        })
        mockGetRolesByAccountId.mockResolvedValue(mixedRoles)

        const context = {
          locale: 'en',
          req: {} as any,
          res: {} as any,
        } as any

        const result = await getServerSideProps(context)

        expect(result.props.rolesData?.items).toHaveLength(5)

        // @ts-expect-error - Testing mixed role types filtering
        const systemRoles = result.props.rolesData?.items.filter((role) => role.isSystemRole)
        // @ts-expect-error - Testing mixed role types filtering
        const customRoles = result.props.rolesData?.items.filter((role) => !role.isSystemRole)

        expect(systemRoles).toHaveLength(3)
        expect(customRoles).toHaveLength(2)
      })
    })

    describe('TC-UT-003: User Navigation Flow', () => {
      it('should navigate to my-account when back button clicked', async () => {
        render(<ManageRolesPage customerAccount={mockCustomerAccount} rolesData={mockRolesData} />)

        const accountTitleButton = screen.getByTestId('account-title-click')
        accountTitleButton.click()

        await waitFor(() => {
          expect(mockRouter.push).toHaveBeenCalledWith('/my-account')
        })
      })
    })

    describe('TC-UT-004: Empty State Scenario', () => {
      it('should handle scenario with no roles', async () => {
        const emptyRoles: GetRolesAsyncResponse = {
          startIndex: 0,
          pageSize: 20,
          pageCount: 0,
          totalCount: 0,
          items: [],
        }

        mockGetCurrentUser.mockResolvedValue({
          customerAccount: mockCustomerAccount,
        })
        mockGetRolesByAccountId.mockResolvedValue(emptyRoles)

        const context = {
          locale: 'en',
          req: {} as any,
          res: {} as any,
        } as any

        const result = await getServerSideProps(context)

        expect(result.props.rolesData?.totalCount).toBe(0)
        expect(result.props.rolesData?.items).toEqual([])

        render(
          <ManageRolesPage
            customerAccount={result.props.customerAccount}
            rolesData={result.props.rolesData || undefined}
          />
        )

        expect(screen.getByTestId('initial-data')).toHaveTextContent('Roles: 0')
      })
    })

    describe('TC-UT-005: Unauthorized User Scenario', () => {
      it('should handle unauthorized access attempt', async () => {
        const unauthorizedError = new Error('User not authorized to view roles')
        mockGetCurrentUser.mockResolvedValue({
          customerAccount: mockCustomerAccount,
        })
        mockGetRolesByAccountId.mockRejectedValue(unauthorizedError)

        const context = {
          locale: 'en',
          req: {} as any,
          res: {} as any,
        } as any

        await expect(getServerSideProps(context)).rejects.toThrow(
          'User not authorized to view roles'
        )
      })
    })

    describe('TC-UT-006: Multi-Account Hierarchy Scenario', () => {
      it('should handle B2B user with parent and child accounts', async () => {
        const hierarchyCustomerAccount: CustomerAccount = {
          id: 1001,
          emailAddress: 'admin@acme.com',
          firstName: 'ACME',
          lastName: 'Admin',
          userName: 'acmeadmin',
          companyOrOrganization: 'ACME Corporation',
          isActive: true,
        }

        const hierarchyRoles: GetRolesAsyncResponse = {
          startIndex: 0,
          pageSize: 20,
          pageCount: 1,
          totalCount: 8,
          items: [
            { id: 1, name: 'Administrator', isSystemRole: true, behaviors: [1, 2, 3] },
            { id: 2, name: 'Buyer', isSystemRole: true, behaviors: [1, 2] },
            { id: 101, name: 'Parent Admin', isSystemRole: false, behaviors: [1, 2, 3] },
            { id: 102, name: 'ACME East Manager', isSystemRole: false, behaviors: [1, 2] },
            { id: 103, name: 'ACME West Manager', isSystemRole: false, behaviors: [1, 2] },
            { id: 104, name: 'Regional Manager', isSystemRole: false, behaviors: [1] },
            { id: 105, name: 'Store Manager', isSystemRole: false, behaviors: [1] },
            { id: 106, name: 'Sales Associate', isSystemRole: false, behaviors: [1] },
          ],
        }

        mockGetCurrentUser.mockResolvedValue({
          customerAccount: hierarchyCustomerAccount,
        })
        mockGetRolesByAccountId.mockResolvedValue(hierarchyRoles)

        const context = {
          locale: 'en',
          req: {} as any,
          res: {} as any,
        } as any

        const result = await getServerSideProps(context)

        expect(result.props.customerAccount?.companyOrOrganization).toBe('ACME Corporation')
        expect(result.props.rolesData?.totalCount).toBe(8)
        // @ts-expect-error - Testing hierarchy roles filtering
        expect(result.props.rolesData?.items.filter((r) => !r.isSystemRole)).toHaveLength(6)
      })
    })

    describe('TC-UT-007: Pagination Data Scenario', () => {
      it('should handle paginated roles data correctly', async () => {
        const paginatedRoles: GetRolesAsyncResponse = {
          startIndex: 0,
          pageSize: 10,
          pageCount: 3,
          totalCount: 25,
          items: Array.from({ length: 10 }, (_, i) => ({
            id: i + 1,
            name: `Role ${i + 1}`,
            isSystemRole: false,
            behaviors: [1],
          })),
        }

        mockGetCurrentUser.mockResolvedValue({
          customerAccount: mockCustomerAccount,
        })
        mockGetRolesByAccountId.mockResolvedValue(paginatedRoles)

        const context = {
          locale: 'en',
          req: {} as any,
          res: {} as any,
        } as any

        const result = await getServerSideProps(context)

        expect(result.props.rolesData?.pageSize).toBe(10)
        expect(result.props.rolesData?.pageCount).toBe(3)
        expect(result.props.rolesData?.totalCount).toBe(25)
        expect(result.props.rolesData?.items).toHaveLength(10)
      })
    })

    describe('TC-UT-008: Concurrent Request Scenario', () => {
      it('should handle concurrent data fetching correctly', async () => {
        let getCurrentUserCallCount = 0
        let getRolesByAccountIdCallCount = 0

        mockGetCurrentUser.mockImplementation(async () => {
          getCurrentUserCallCount++
          return { customerAccount: mockCustomerAccount }
        })

        mockGetRolesByAccountId.mockImplementation(async () => {
          getRolesByAccountIdCallCount++
          return mockRolesData
        })

        const context = {
          locale: 'en',
          req: {} as any,
          res: {} as any,
        } as any

        await getServerSideProps(context)

        expect(getCurrentUserCallCount).toBe(1)
        expect(getRolesByAccountIdCallCount).toBe(1)
      })
    })
  })

  describe('Integration Tests', () => {
    it('should integrate page rendering with server-side data', async () => {
      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const serverSideResult = await getServerSideProps(context)

      render(
        <ManageRolesPage
          customerAccount={serverSideResult.props.customerAccount}
          rolesData={serverSideResult.props.rolesData || undefined}
        />
      )

      expect(screen.getByTestId('manage-roles-template')).toBeInTheDocument()
      expect(screen.getByTestId('customer-account')).toHaveTextContent('admin@example.com')
      expect(screen.getByTestId('initial-data')).toHaveTextContent('Roles: 3')
    })

    it('should maintain data consistency between server and client', async () => {
      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      expect(result.props.customerAccount?.id).toBe(mockCustomerAccount.id)
      expect(result.props.rolesData?.totalCount).toBe(mockRolesData.totalCount)
      expect(result.props.rolesData?.items).toEqual(mockRolesData.items)
    })
  })

  describe('Performance Tests', () => {
    it('should handle getServerSideProps execution time efficiently', async () => {
      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(mockRolesData)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const startTime = Date.now()
      await getServerSideProps(context)
      const endTime = Date.now()

      // Should complete in reasonable time (allowing for mock execution)
      expect(endTime - startTime).toBeLessThan(1000)
    })

    it('should handle large dataset efficiently', async () => {
      const largeDataset: GetRolesAsyncResponse = {
        startIndex: 0,
        pageSize: 100,
        pageCount: 5,
        totalCount: 500,
        items: Array.from({ length: 100 }, (_, i) => ({
          id: i + 1,
          name: `Role ${i + 1}`,
          isSystemRole: false,
          behaviors: Array.from({ length: 20 }, (_, j) => j + 1),
        })),
      }

      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      })
      mockGetRolesByAccountId.mockResolvedValue(largeDataset)

      const context = {
        locale: 'en',
        req: {} as any,
        res: {} as any,
      } as any

      const result = await getServerSideProps(context)

      expect(result.props.rolesData?.items).toHaveLength(100)
      expect(result.props.rolesData?.totalCount).toBe(500)
    })
  })
})
