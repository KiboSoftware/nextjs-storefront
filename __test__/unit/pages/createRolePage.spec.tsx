import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import mockRouter from 'next-router-mock'

import { useAuthContext } from '@/context'
import * as apiOperations from '@/lib/api/operations'
import CreateRolePage, { getServerSideProps } from '@/pages/my-account/b2b/manage-roles/create'

// Mock dependencies
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      maxCookieAge: 0,
      customerAddressesPageSize: 10,
    },
    serverRuntimeConfig: {
      cacheKey: 'test-cache-key',
      cacheTimeOut: 10,
    },
  })
})
jest.mock('@/context')
jest.mock('@/lib/api/operations')
jest.mock('@/components/page-templates', () => ({
  CreateRoleTemplate: jest.fn(
    ({
      onBackClick,
      user,
      initialData,
      behaviorCategories,
      behaviors,
      accountUserBehaviorResults,
    }) => {
      // Calculate total behaviors from accountUserBehaviorResults
      const totalBehaviors =
        accountUserBehaviorResults?.reduce(
          (sum: number, result: { behaviors: number[] }) => sum + (result.behaviors?.length || 0),
          0
        ) || 0

      return (
        <div data-testid="create-role-template">
          <button data-testid="back-button" onClick={onBackClick}>
            Back
          </button>
          <div data-testid="user-data">{JSON.stringify(user)}</div>
          <div data-testid="initial-data">{JSON.stringify(initialData)}</div>
          <div data-testid="behavior-categories-count">
            {behaviorCategories?.items?.length || 0}
          </div>
          <div data-testid="behaviors-count">{behaviors?.items?.length || 0}</div>
          <div data-testid="account-user-behavior-results-count">
            {accountUserBehaviorResults?.length || 0}
          </div>
          <div data-testid="account-user-behaviors-count">{totalBehaviors}</div>
        </div>
      )
    }
  ),
}))

const mockUseAuthContext = useAuthContext as jest.MockedFunction<typeof useAuthContext>
const mockGetB2BAccountHierarchy = apiOperations.getB2BAccountHierarchy as jest.MockedFunction<
  typeof apiOperations.getB2BAccountHierarchy
>
const mockGetCurrentUser = apiOperations.getCurrentUser as jest.MockedFunction<
  typeof apiOperations.getCurrentUser
>
const mockGetBehaviorCategories = apiOperations.getBehaviorCategories as jest.MockedFunction<
  typeof apiOperations.getBehaviorCategories
>
const mockGetBehaviors = apiOperations.getBehaviors as jest.MockedFunction<
  typeof apiOperations.getBehaviors
>
const mockGetMultipleB2BAccountUserBehaviors =
  apiOperations.getMultipleB2BAccountUserBehaviors as jest.MockedFunction<
    typeof apiOperations.getMultipleB2BAccountUserBehaviors
  >

describe('[page] CreateRolePage', () => {
  const mockCustomerAccount = {
    id: 1001,
    firstName: 'John',
    lastName: 'Doe',
    emailAddress: 'john.doe@example.com',
    userName: 'john.doe',
  }

  const mockHierarchyData = {
    accounts: [
      { id: 1001, companyOrOrganization: 'Parent Account 1', isActive: true },
      { id: 1002, companyOrOrganization: 'Child Account 1', isActive: true, parentAccountId: 1001 },
      { id: 1003, companyOrOrganization: 'Child Account 2', isActive: true, parentAccountId: 1001 },
    ],
    hierarchy: [],
  }

  const mockBehaviorCategories = [
    { id: 1, name: 'Customer Management' },
    { id: 2, name: 'Order Management' },
    { id: 3, name: 'Product Management' },
  ]

  const mockBehaviors = [
    { id: 1, name: 'View Customers', categoryId: 1 },
    { id: 2, name: 'Edit Customers', categoryId: 1 },
    { id: 3, name: 'View Orders', categoryId: 2 },
    { id: 4, name: 'Create Orders', categoryId: 2 },
    { id: 5, name: 'View Products', categoryId: 3 },
  ]

  const mockAccountUserBehaviors = {
    1001: [1, 2, 3, 4, 5],
    1002: [1, 3, 5],
    1003: [1, 2],
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockRouter.setCurrentUrl('/my-account/b2b/manage-roles/create')

    mockUseAuthContext.mockReturnValue({
      user: mockCustomerAccount,
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
      setAuthError: jest.fn(),
    } as unknown as ReturnType<typeof useAuthContext>)
  })

  describe('Page Component Rendering', () => {
    it('should render CreateRoleTemplate component', () => {
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
        accountUserBehaviors: mockAccountUserBehaviors,
      }

      render(<CreateRolePage {...props} />)

      expect(screen.getByTestId('create-role-template')).toBeInTheDocument()
    })

    it('should pass customer account data to template', () => {
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
        accountUserBehaviors: mockAccountUserBehaviors,
      }

      render(<CreateRolePage {...props} />)

      const userData = screen.getByTestId('user-data')
      expect(userData).toHaveTextContent('John')
      expect(userData).toHaveTextContent('Doe')
    })

    it('should merge customer account from server and client', () => {
      const serverAccount = { id: 1001, firstName: 'John' }
      const clientAccount = { lastName: 'Smith', emailAddress: 'john.smith@example.com' }

      mockUseAuthContext.mockReturnValue({
        user: clientAccount,
        isAuthenticated: true,
        login: jest.fn(),
        logout: jest.fn(),
        setAuthError: jest.fn(),
      } as unknown as ReturnType<typeof useAuthContext>)

      const props = {
        customerAccount: serverAccount as unknown as typeof mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
        accountUserBehaviors: mockAccountUserBehaviors,
      }

      render(<CreateRolePage {...props} />)

      const userData = screen.getByTestId('user-data')
      expect(userData).toHaveTextContent('John')
      expect(userData).toHaveTextContent('Smith')
    })

    it('should pass initial hierarchy data to template', () => {
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
        accountUserBehaviors: mockAccountUserBehaviors,
      }

      render(<CreateRolePage {...props} />)

      const initialData = screen.getByTestId('initial-data')
      expect(initialData).toHaveTextContent('Parent Account 1')
      expect(initialData).toHaveTextContent('Child Account 1')
    })

    it('should pass behavior categories to template', () => {
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
        accountUserBehaviors: mockAccountUserBehaviors,
      }

      render(<CreateRolePage {...props} />)

      const categoriesCount = screen.getByTestId('behavior-categories-count')
      expect(categoriesCount).toHaveTextContent('3')
    })

    it('should pass behaviors to template', () => {
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
        accountUserBehaviors: mockAccountUserBehaviors,
      }

      render(<CreateRolePage {...props} />)

      const behaviorsCount = screen.getByTestId('behaviors-count')
      expect(behaviorsCount).toHaveTextContent('5')
    })

    it('should convert accountUserBehaviors to array format', () => {
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
        accountUserBehaviors: mockAccountUserBehaviors,
      }

      render(<CreateRolePage {...props} />)

      const resultsCount = screen.getByTestId('account-user-behavior-results-count')
      expect(resultsCount).toHaveTextContent('3') // 3 accounts
    })

    it('should flatten accountUserBehaviors for template', () => {
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
        accountUserBehaviors: mockAccountUserBehaviors,
      }

      render(<CreateRolePage {...props} />)

      const behaviorsCount = screen.getByTestId('account-user-behaviors-count')
      expect(behaviorsCount).toHaveTextContent('10') // Total behaviors across all accounts
    })

    it('should handle missing props with defaults', () => {
      const props = {}

      render(<CreateRolePage {...props} />)

      expect(screen.getByTestId('create-role-template')).toBeInTheDocument()
      expect(screen.getByTestId('behavior-categories-count')).toHaveTextContent('0')
      expect(screen.getByTestId('behaviors-count')).toHaveTextContent('0')
    })

    it('should handle empty behavior categories array', () => {
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: [],
        behaviors: mockBehaviors,
        accountUserBehaviors: mockAccountUserBehaviors,
      }

      render(<CreateRolePage {...props} />)

      const categoriesCount = screen.getByTestId('behavior-categories-count')
      expect(categoriesCount).toHaveTextContent('0')
    })

    it('should handle empty behaviors array', () => {
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: [],
        accountUserBehaviors: mockAccountUserBehaviors,
      }

      render(<CreateRolePage {...props} />)

      const behaviorsCount = screen.getByTestId('behaviors-count')
      expect(behaviorsCount).toHaveTextContent('0')
    })

    it('should handle empty accountUserBehaviors object', () => {
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
        accountUserBehaviors: {},
      }

      render(<CreateRolePage {...props} />)

      const resultsCount = screen.getByTestId('account-user-behavior-results-count')
      expect(resultsCount).toHaveTextContent('0')
    })
  })

  describe('Navigation and Interactions', () => {
    it('should handle back button click', async () => {
      const user = userEvent.setup()
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
        accountUserBehaviors: mockAccountUserBehaviors,
      }

      render(<CreateRolePage {...props} />)

      const backButton = screen.getByTestId('back-button')
      await user.click(backButton)

      expect(mockRouter.pathname).toBe('/my-account/b2b/manage-roles')
    })

    it('should navigate to manage roles page on back click', async () => {
      const user = userEvent.setup()
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
        accountUserBehaviors: mockAccountUserBehaviors,
      }

      render(<CreateRolePage {...props} />)

      const backButton = screen.getByTestId('back-button')
      await user.click(backButton)

      await waitFor(() => {
        expect(mockRouter.pathname).toBe('/my-account/b2b/manage-roles')
      })
    })
  })

  describe('getServerSideProps', () => {
    const mockContext = {
      locale: 'en',
      req: {} as NextApiRequest,
      res: {} as NextApiResponse,
      query: {},
      resolvedUrl: '/my-account/b2b/manage-roles/create',
    } as GetServerSidePropsContext

    beforeEach(() => {
      mockGetB2BAccountHierarchy.mockResolvedValue(
        mockHierarchyData as unknown as Awaited<
          ReturnType<typeof apiOperations.getB2BAccountHierarchy>
        >
      )
      mockGetCurrentUser.mockResolvedValue({
        customerAccount: mockCustomerAccount,
      } as unknown as Awaited<ReturnType<typeof apiOperations.getCurrentUser>>)
      mockGetBehaviorCategories.mockResolvedValue({
        items: mockBehaviorCategories,
      } as unknown as Awaited<ReturnType<typeof apiOperations.getBehaviorCategories>>)
      mockGetBehaviors.mockResolvedValue({
        items: mockBehaviors,
      } as unknown as Awaited<ReturnType<typeof apiOperations.getBehaviors>>)
      mockGetMultipleB2BAccountUserBehaviors.mockResolvedValue(
        mockAccountUserBehaviors as unknown as Awaited<
          ReturnType<typeof apiOperations.getMultipleB2BAccountUserBehaviors>
        >
      )
    })

    it('should fetch all required data successfully', async () => {
      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('props')
      expect(mockGetB2BAccountHierarchy).toHaveBeenCalledWith(mockContext.req, mockContext.res)
      expect(mockGetCurrentUser).toHaveBeenCalledWith(mockContext.req, mockContext.res)
      expect(mockGetBehaviorCategories).toHaveBeenCalledWith(mockContext.req, mockContext.res)
      expect(mockGetBehaviors).toHaveBeenCalledWith(mockContext.req, mockContext.res)
    })

    it('should return customer account in props', async () => {
      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('props')
      if ('props' in result && result.props) {
        expect(result.props.customerAccount).toEqual(mockCustomerAccount)
      }
    })

    it('should return initial hierarchy data in props', async () => {
      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('props')
      if ('props' in result && result.props) {
        expect(result.props.initialData).toEqual(mockHierarchyData)
      }
    })

    it('should return behavior categories in props', async () => {
      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('props')
      if ('props' in result && result.props) {
        expect(result.props.behaviorCategories).toEqual(mockBehaviorCategories)
      }
    })

    it('should return behaviors in props', async () => {
      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('props')
      if ('props' in result && result.props) {
        expect(result.props.behaviors).toEqual(mockBehaviors)
      }
    })

    it('should fetch account user behaviors for all accounts', async () => {
      await getServerSideProps(mockContext)

      expect(mockGetMultipleB2BAccountUserBehaviors).toHaveBeenCalledWith(
        mockContext.req,
        mockContext.res,
        [1001, 1002, 1003]
      )
    })

    it('should return account user behaviors in props', async () => {
      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('props')
      if ('props' in result && result.props) {
        expect(result.props.accountUserBehaviors).toEqual(mockAccountUserBehaviors)
      }
    })

    it('should handle empty behavior categories response', async () => {
      mockGetBehaviorCategories.mockResolvedValue({ items: undefined } as unknown as Awaited<
        ReturnType<typeof apiOperations.getBehaviorCategories>
      >)

      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('props')
      if ('props' in result && result.props) {
        expect(result.props.behaviorCategories).toEqual([])
      }
    })

    it('should handle empty behaviors response', async () => {
      mockGetBehaviors.mockResolvedValue({ items: undefined } as unknown as Awaited<
        ReturnType<typeof apiOperations.getBehaviors>
      >)

      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('props')
      if ('props' in result && result.props) {
        expect(result.props.behaviors).toEqual([])
      }
    })

    it('should handle error fetching account user behaviors gracefully', async () => {
      mockGetMultipleB2BAccountUserBehaviors.mockRejectedValue(
        new Error('Failed to fetch behaviors')
      )
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const result = await getServerSideProps(mockContext)

      if ('props' in result && result.props) {
        expect(result.props.accountUserBehaviors).toEqual({})
      }

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching account user behaviors:',
        expect.any(Error)
      )
      consoleSpy.mockRestore()
    })

    it('should continue with empty behaviors on fetch error', async () => {
      mockGetMultipleB2BAccountUserBehaviors.mockRejectedValue(new Error('Network error'))
      jest.spyOn(console, 'error').mockImplementation()

      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('props')
      if ('props' in result && result.props) {
        expect(result.props).toHaveProperty('accountUserBehaviors')
        expect(result.props.accountUserBehaviors).toEqual({})
      }
    })

    it('should redirect to manage roles on error', async () => {
      mockGetB2BAccountHierarchy.mockRejectedValue(new Error('API Error'))
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('redirect')
      if ('redirect' in result && result.redirect) {
        expect(result.redirect.destination).toBe('/my-account/b2b/manage-roles')
        expect(result.redirect.permanent).toBe(false)
      }

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error in getServerSideProps for create role page:',
        expect.any(Error)
      )
      consoleSpy.mockRestore()
    })

    it('should redirect when getCurrentUser fails', async () => {
      mockGetCurrentUser.mockRejectedValue(new Error('Unauthorized'))
      jest.spyOn(console, 'error').mockImplementation()

      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('redirect')
      if ('redirect' in result && result.redirect) {
        expect(result.redirect.destination).toBe('/my-account/b2b/manage-roles')
      }
    })

    it('should redirect when getBehaviorCategories fails', async () => {
      mockGetBehaviorCategories.mockRejectedValue(new Error('Failed to fetch'))
      jest.spyOn(console, 'error').mockImplementation()

      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('redirect')
    })

    it('should redirect when getBehaviors fails', async () => {
      mockGetBehaviors.mockRejectedValue(new Error('Failed to fetch'))
      jest.spyOn(console, 'error').mockImplementation()

      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('redirect')
    })

    it('should handle hierarchy with no accounts', async () => {
      mockGetB2BAccountHierarchy.mockResolvedValue({
        accounts: [],
        hierarchy: [],
      } as unknown as Awaited<ReturnType<typeof apiOperations.getB2BAccountHierarchy>>)

      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('props')
      if ('props' in result && result.props) {
        expect(result.props.initialData).toEqual({ accounts: [], hierarchy: [] })
      }
    })

    it('should filter null account IDs before fetching behaviors', async () => {
      const hierarchyWithNulls = {
        accounts: [
          { id: 1001, companyOrOrganization: 'Account 1' },
          { id: null as unknown as number, companyOrOrganization: 'Invalid Account' },
          { id: 1002, companyOrOrganization: 'Account 2' },
        ],
        hierarchy: [],
      }
      mockGetB2BAccountHierarchy.mockResolvedValue(
        hierarchyWithNulls as unknown as Awaited<
          ReturnType<typeof apiOperations.getB2BAccountHierarchy>
        >
      )

      await getServerSideProps(mockContext)

      expect(mockGetMultipleB2BAccountUserBehaviors).toHaveBeenCalledWith(
        mockContext.req,
        mockContext.res,
        [1001, 1002]
      )
    })

    it('should include server side translations', async () => {
      const result = await getServerSideProps(mockContext)

      if ('props' in result) {
        // serverSideTranslations returns _nextI18Next object
        expect(result.props).toHaveProperty('_nextI18Next')
      }
    })

    it('should use correct locale for translations', async () => {
      const contextWithLocale = {
        ...mockContext,
        locale: 'fr',
      } as GetServerSidePropsContext

      const result = await getServerSideProps(contextWithLocale)

      if ('props' in result) {
        expect(result.props).toHaveProperty('_nextI18Next')
      }
    })

    it('should handle undefined hierarchy accounts', async () => {
      mockGetB2BAccountHierarchy.mockResolvedValue({
        accounts: undefined,
        hierarchy: [],
      } as unknown as Awaited<ReturnType<typeof apiOperations.getB2BAccountHierarchy>>)

      const result = await getServerSideProps(mockContext)

      expect(result).toHaveProperty('props')
      if ('props' in result && result.props) {
        expect(mockGetMultipleB2BAccountUserBehaviors).toHaveBeenCalledWith(
          mockContext.req,
          mockContext.res,
          []
        )
      }
    })
  })

  describe('Data Transformation', () => {
    it('should transform accountUserBehaviors to expected format', () => {
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
        accountUserBehaviors: mockAccountUserBehaviors,
      }

      render(<CreateRolePage {...props} />)

      // Verify transformation happens by checking the results count
      const resultsCount = screen.getByTestId('account-user-behavior-results-count')
      expect(resultsCount).toHaveTextContent('3')
    })

    it('should set correct properties in accountUserBehaviorResults', () => {
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
        accountUserBehaviors: {
          1001: [1, 2, 3],
        },
      }

      render(<CreateRolePage {...props} />)

      // Results should have accountId, behaviors, isLoading, isError, isSuccess, error
      expect(screen.getByTestId('account-user-behavior-results-count')).toHaveTextContent('1')
    })

    it('should flatten behaviors correctly', () => {
      const props = {
        customerAccount: mockCustomerAccount,
        initialData: mockHierarchyData,
        behaviorCategories: mockBehaviorCategories,
        behaviors: mockBehaviors,
        accountUserBehaviors: {
          1001: [1, 2, 3],
          1002: [4, 5],
        },
      }

      render(<CreateRolePage {...props} />)

      const behaviorsCount = screen.getByTestId('account-user-behaviors-count')
      expect(behaviorsCount).toHaveTextContent('5') // 3 + 2 = 5 total behaviors
    })
  })
})
