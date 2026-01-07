import React from 'react'

import { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import i18n from 'i18next'
import { I18nextProvider } from 'react-i18next'

import AddUserTemplate, { AddUserTemplateProps } from './AddUserTemplate'
import { AuthContext } from '@/context'
import type { B2BAccountHierarchyResult } from '@/lib/types'

// Initialize i18n for Storybook
i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        users: 'Users',
        'add-new-user': 'Add a New User',
        cancel: 'Cancel',
        'add-user': 'Add User',
        'email-address': 'Email Address',
        'first-name': 'First Name',
        'last-name-or-sur-name': 'Last Name',
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

const meta: Meta<typeof AddUserTemplate> = {
  title: 'Page Templates/B2B/AddUserTemplate',
  component: AddUserTemplate,
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: { retry: false },
          mutations: { retry: false },
        },
      })

      const mockAuthContext = {
        user: {
          userId: 'user-123',
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          emailAddress: 'john.doe@example.com',
        },
        isAuthenticated: true,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        login: () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        logout: () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setAuthError: () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        createAccount: () => {},
      }

      return (
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <AuthContext.Provider value={mockAuthContext as never}>
              <Story />
            </AuthContext.Provider>
          </I18nextProvider>
        </QueryClientProvider>
      )
    },
  ],
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      path: '/my-account/b2b/users/add-user',
      asPath: '/my-account/b2b/users/add-user',
      query: {},
    },
  },
}

export default meta
type Story = StoryObj<AddUserTemplateProps>

// Mock data
const mockSimpleHierarchy: B2BAccountHierarchyResult = {
  accounts: [
    {
      id: 1,
      companyOrOrganization: 'Parent Company',
      parentAccountId: null,
    },
    {
      id: 2,
      companyOrOrganization: 'Child Company A',
      parentAccountId: 1,
    },
    {
      id: 3,
      companyOrOrganization: 'Child Company B',
      parentAccountId: 1,
    },
  ],
  hierarchy: [
    {
      id: 1,
      children: [
        { id: 2, children: [] },
        { id: 3, children: [] },
      ],
    },
  ],
}

const mockComplexHierarchy: B2BAccountHierarchyResult = {
  accounts: [
    {
      id: 1,
      companyOrOrganization: 'Global HQ',
      parentAccountId: null,
    },
    {
      id: 2,
      companyOrOrganization: 'North America Region',
      parentAccountId: 1,
    },
    {
      id: 3,
      companyOrOrganization: 'Europe Region',
      parentAccountId: 1,
    },
    {
      id: 4,
      companyOrOrganization: 'USA Division',
      parentAccountId: 2,
    },
    {
      id: 5,
      companyOrOrganization: 'Canada Division',
      parentAccountId: 2,
    },
    {
      id: 6,
      companyOrOrganization: 'UK Division',
      parentAccountId: 3,
    },
    {
      id: 7,
      companyOrOrganization: 'Germany Division',
      parentAccountId: 3,
    },
    {
      id: 8,
      companyOrOrganization: 'East Coast Office',
      parentAccountId: 4,
    },
    {
      id: 9,
      companyOrOrganization: 'West Coast Office',
      parentAccountId: 4,
    },
  ],
  hierarchy: [
    {
      id: 1,
      children: [
        {
          id: 2,
          children: [
            {
              id: 4,
              children: [
                { id: 8, children: [] },
                { id: 9, children: [] },
              ],
            },
            { id: 5, children: [] },
          ],
        },
        {
          id: 3,
          children: [
            { id: 6, children: [] },
            { id: 7, children: [] },
          ],
        },
      ],
    },
  ],
}

const mockAccountUserBehaviorsFullPermissions = {
  1: [2029, 2027, 1000], // ViewRole, CreateRole, AddUser
  2: [2029, 2027, 1000],
  3: [2029, 2027, 1000],
  4: [2029, 2027, 1000],
  5: [2029, 2027, 1000],
  6: [2029, 2027, 1000],
  7: [2029, 2027, 1000],
  8: [2029, 2027, 1000],
  9: [2029, 2027, 1000],
}

const mockAccountUserBehaviorsViewOnly = {
  1: [2029], // ViewRole only
  2: [2029],
  3: [2029],
}

const mockAccountUserBehaviorsMixed = {
  1: [2029, 2027], // ViewRole, CreateRole
  2: [2029, 1000], // ViewRole, AddUser
  3: [2029], // ViewRole only
}

// Stories
export const Default: Story = {
  args: {
    initialData: mockSimpleHierarchy,
    accountUserBehaviors: mockAccountUserBehaviorsFullPermissions,
  },
}

export const ComplexHierarchy: Story = {
  args: {
    initialData: mockComplexHierarchy,
    accountUserBehaviors: mockAccountUserBehaviorsFullPermissions,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the add user form with a complex multi-level account hierarchy.',
      },
    },
  },
}

export const SingleAccount: Story = {
  args: {
    initialData: {
      accounts: [
        {
          id: 1,
          companyOrOrganization: 'Single Company',
          parentAccountId: null,
        },
      ],
      hierarchy: [{ id: 1, children: [] }],
    },
    accountUserBehaviors: {
      1: [2029, 2027, 1000],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Add user form with only a single account available.',
      },
    },
  },
}

export const ViewOnlyPermissions: Story = {
  args: {
    initialData: mockSimpleHierarchy,
    accountUserBehaviors: mockAccountUserBehaviorsViewOnly,
  },
  parameters: {
    docs: {
      description: {
        story:
          'User can only view roles but cannot create or modify them. Role selection will be in read-only mode.',
      },
    },
  },
}

export const MixedPermissions: Story = {
  args: {
    initialData: mockSimpleHierarchy,
    accountUserBehaviors: mockAccountUserBehaviorsMixed,
  },
  parameters: {
    docs: {
      description: {
        story: 'Different accounts have different permission levels for the user.',
      },
    },
  },
}

export const NoAccounts: Story = {
  args: {
    initialData: {
      accounts: [],
      hierarchy: [],
    },
    accountUserBehaviors: {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Edge case where no accounts are available.',
      },
    },
  },
}

export const LargeHierarchy: Story = {
  args: {
    initialData: {
      accounts: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        companyOrOrganization: `Company ${i + 1}`,
        // Use deterministic parent assignment for test data consistency
        parentAccountId: i === 0 ? null : Math.floor((i * 7) % i) + 1,
      })),
      hierarchy: [{ id: 1, children: [] }],
    },
    accountUserBehaviors: Object.fromEntries(
      Array.from({ length: 50 }, (_, i) => [i + 1, [2029, 2027, 1000]])
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests performance with a large number of accounts (50 accounts).',
      },
    },
  },
}

export const MobileView: Story = {
  args: {
    initialData: mockSimpleHierarchy,
    accountUserBehaviors: mockAccountUserBehaviorsFullPermissions,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile responsive view.',
      },
    },
  },
}

export const TabletView: Story = {
  args: {
    initialData: mockSimpleHierarchy,
    accountUserBehaviors: mockAccountUserBehaviorsFullPermissions,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet responsive view.',
      },
    },
  },
}

export const WithLongCompanyNames: Story = {
  args: {
    initialData: {
      accounts: [
        {
          id: 1,
          companyOrOrganization:
            'Very Long Company Name That Should Wrap or Truncate Properly in the UI',
          parentAccountId: null,
        },
        {
          id: 2,
          companyOrOrganization: 'Another Extremely Long Company Name For Testing Purposes Only',
          parentAccountId: 1,
        },
        {
          id: 3,
          companyOrOrganization: 'Short Name',
          parentAccountId: 1,
        },
      ],
      hierarchy: [
        {
          id: 1,
          children: [
            { id: 2, children: [] },
            { id: 3, children: [] },
          ],
        },
      ],
    },
    accountUserBehaviors: mockAccountUserBehaviorsFullPermissions,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests layout with very long company names.',
      },
    },
  },
}

export const DeepNesting: Story = {
  args: {
    initialData: {
      accounts: [
        { id: 1, companyOrOrganization: 'Level 1', parentAccountId: null },
        { id: 2, companyOrOrganization: 'Level 2', parentAccountId: 1 },
        { id: 3, companyOrOrganization: 'Level 3', parentAccountId: 2 },
        { id: 4, companyOrOrganization: 'Level 4', parentAccountId: 3 },
        { id: 5, companyOrOrganization: 'Level 5', parentAccountId: 4 },
        { id: 6, companyOrOrganization: 'Level 6', parentAccountId: 5 },
      ],
      hierarchy: [
        {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                {
                  id: 3,
                  children: [
                    {
                      id: 4,
                      children: [
                        {
                          id: 5,
                          children: [{ id: 6, children: [] }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    accountUserBehaviors: Object.fromEntries(
      Array.from({ length: 6 }, (_, i) => [i + 1, [2029, 2027, 1000]])
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests deeply nested account hierarchy (6 levels).',
      },
    },
  },
}

export const NoPermissions: Story = {
  args: {
    initialData: mockSimpleHierarchy,
    accountUserBehaviors: {
      1: [],
      2: [],
      3: [],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'User has no permissions on any account. Role selection should be disabled.',
      },
    },
  },
}

export const PartialAccountPermissions: Story = {
  args: {
    initialData: mockComplexHierarchy,
    accountUserBehaviors: {
      1: [2029, 2027, 1000],
      2: [2029, 2027, 1000],
      4: [2029],
      5: [2029],
      8: [2029, 2027, 1000],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'User only has permissions on some accounts in the hierarchy.',
      },
    },
  },
}

// Interactive stories for testing behavior
export const InteractiveUserCreation: Story = {
  args: {
    initialData: mockSimpleHierarchy,
    accountUserBehaviors: mockAccountUserBehaviorsFullPermissions,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive story for testing user creation and role assignment flow.',
      },
    },
  },
  play: async () => {
    // This can be used with @storybook/addon-interactions
    // to test user interactions programmatically
  },
}
