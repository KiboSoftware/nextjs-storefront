import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, NextPage } from 'next'
import { useRouter } from 'next/router'

import { ManageRolesTemplate } from '@/components/page-templates'
import {
  getCurrentUser,
  getRolesByAccountId,
  getUsersByRoleAsync,
  getRoleByRoleIdAsync,
  getMultipleB2BAccountUserBehaviors,
  getB2BAccountUserBehaviors,
} from '@/lib/api/operations'
import type { GetRolesAsyncResponse } from '@/lib/api/operations/get-roles-by-account-id'
import type { B2BUserByRole } from '@/lib/api/operations/get-users-by-role-async'
import { serverSideTranslations } from '@/lib/helpers/serverSideTranslations'

import type { CustomerAccount } from '@/lib/gql/types'

interface ManageRolesPageProps {
  customerAccount?: CustomerAccount
  rolesData?: GetRolesAsyncResponse
  usersByRole?: Record<string, number>
  accountUserBehaviorsForAllAccounts?: Record<number, number[]>
  accountUserBehaviors?: number[]
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, req, res } = context

  const response = await getCurrentUser(req as NextApiRequest, res as NextApiResponse)
  const rolesData = await getRolesByAccountId(req as NextApiRequest, res as NextApiResponse)

  // Fetch user counts for each role
  const usersByRole: Record<string, number> = {}
  // Collect all unique account IDs from all roles
  const allAccountIds = new Set<number>()
  const currentAccountId = response?.customerAccount?.id

  if (rolesData?.items) {
    // Fetch users for each role in parallel
    const userCountPromises = rolesData.items.map(async (role) => {
      if (role.id && currentAccountId) {
        try {
          allAccountIds.add(currentAccountId)

          const users = await getUsersByRoleAsync(
            req as NextApiRequest,
            res as NextApiResponse,
            currentAccountId,
            role.id as number
          )

          const userCount = users?.length || 0
          return { roleId: role.id.toString(), userCount }
        } catch (error) {
          console.error(
            `Error fetching users for role ${role.id}, account ${currentAccountId}:`,
            error
          )
        }
      }
      return { roleId: role.id?.toString() || '', userCount: 0 }
    })

    const userCounts = await Promise.all(userCountPromises)
    userCounts.forEach(({ roleId, userCount }) => {
      usersByRole[roleId] = userCount
    })
  }

  // Fetch user permissions for all accounts from roleDetails.accountIds
  // This will be used for edit/delete icon visibility on user table
  let accountUserBehaviorsForAllAccounts: Record<number, number[]> = {}
  try {
    if (allAccountIds.size > 0) {
      const accountIdsArray = Array.from(allAccountIds)
      accountUserBehaviorsForAllAccounts = await getMultipleB2BAccountUserBehaviors(
        req as NextApiRequest,
        res as NextApiResponse,
        accountIdsArray
      )
    }
  } catch (error) {
    console.error('Error fetching account user behaviors for all accounts:', error)
  }

  // Fetch user permissions for logged-in user's current account context
  // This will be used for add buyers and view details actions
  let accountUserBehaviors: number[] = []
  try {
    if (response?.customerAccount?.id) {
      const behaviors = await getB2BAccountUserBehaviors(
        req as NextApiRequest,
        res as NextApiResponse,
        response.customerAccount.id
      )
      accountUserBehaviors = behaviors || []
    }
  } catch (error) {
    console.error('Error fetching account user behaviors for current account:', error)
  }

  return {
    props: {
      customerAccount: response?.customerAccount,
      rolesData,
      usersByRole,
      accountUserBehaviorsForAllAccounts,
      accountUserBehaviors,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const ManageRolesPage: NextPage<ManageRolesPageProps> = ({
  customerAccount,
  rolesData,
  usersByRole,
  accountUserBehaviorsForAllAccounts,
  accountUserBehaviors,
}) => {
  const router = useRouter()

  const handleAccountTitleClick = () => {
    router.push('/my-account')
  }

  return (
    <ManageRolesTemplate
      customerAccount={customerAccount}
      initialData={rolesData}
      usersByRole={usersByRole}
      accountUserBehaviorsForAllAccounts={accountUserBehaviorsForAllAccounts}
      accountUserBehaviors={accountUserBehaviors}
      onAccountTitleClick={handleAccountTitleClick}
    />
  )
}

export default ManageRolesPage
