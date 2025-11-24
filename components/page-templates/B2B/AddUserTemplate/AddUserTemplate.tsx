// Add User Template - New page for adding B2B users

import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material'
import {
  Typography,
  Paper,
  styled,
  Theme,
  useMediaQuery,
  useTheme,
  Grid,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { UserForm } from '@/components/b2b'
import { useAuthContext } from '@/context'
import {
  useAddRoleToCustomerB2bAccountMutation,
  useCreateCustomerB2bUserMutation,
} from '@/hooks'
import { Routes } from '@/lib/constants'
import { buildCreateCustomerB2bUserParams } from '@/lib/helpers'
import { B2BAccountHierarchyResult } from '@/lib/types'
import { B2BUserInput } from '@/lib/types/CustomerB2BUser'

const BackButtonLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  typography: 'body2',
  textDecoration: 'none',
  color: theme.palette.grey[900],
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 0rem',
  cursor: 'pointer',
}))

const ContentPaper = styled(Paper)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(2)
}))

interface AddUserTemplateProps {
  initialData?: B2BAccountHierarchyResult
  accountUserBehaviors?: Record<number, number[]>
}

const AddUserTemplate = ({
  initialData,
  accountUserBehaviors,
}: AddUserTemplateProps) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const { user } = useAuthContext()

  const { createCustomerB2bUser } = useCreateCustomerB2bUserMutation()
  const { addRoleToCustomerB2bAccount } = useAddRoleToCustomerB2bAccountMutation()

  const handleAddUser = async (
    formValues: B2BUserInput & { roleAssignments?: Record<number, string[]> }
  ) => {
    try {
      // Create mode - create user in each account where roles are selected
        const roleAssignments = formValues.roleAssignments || {}
        const accountIds = Object.keys(roleAssignments).map(Number)

        if (accountIds.length === 0) {
          console.error('No roles selected for any account')
          return
        }

        // Step 1: Create users in parallel for all accounts
        const userCreationPromises = accountIds.map((accountId) => {
          const createUserVariables = buildCreateCustomerB2bUserParams({
            user: { ...user, id: accountId },
            values: formValues,
          })
          return createCustomerB2bUser
            .mutateAsync(createUserVariables)
            .then((response) => ({ accountId, response }))
            .catch((error) => {
              console.error(`Failed to create user for account ${accountId}:`, error)
              return { accountId, response: null, error }
            })
        })

        const userCreationResults = await Promise.all(userCreationPromises)

        // Step 2: Collect all role assignments for all accounts
        const roleAssignmentPromises: Promise<boolean>[] = []

        userCreationResults.forEach(({ accountId, response }) => {
          if (response?.userId) {
            const roleIds = roleAssignments[accountId] || []
            roleIds.forEach((roleId) => {
              roleAssignmentPromises.push(
                addRoleToCustomerB2bAccount.mutateAsync({
                  accountId,
                  userId: response.userId as string,
                  roleId: parseInt(roleId),
                })
              )
            })
          }
        })

        // Step 3: Execute all role assignments in parallel
        if (roleAssignmentPromises.length > 0) {
          await Promise.all(roleAssignmentPromises).catch((error) => {
            console.error('Some role assignments failed:', error)
          })
        }

      // Navigate back to users list after all operations complete
      router.push(Routes.Users)
    } catch (e) {
      console.error('Error in handleAddUser:', e)
    }
  }

  const handleClose = () => {
    router.push(Routes.Users)
  }

  return (
    <Grid>
      <Grid item style={{ marginTop: '15px', marginBottom: '20px' }}>
        <BackButtonLink aria-label={t('users')} href={Routes.Users}>
          <ChevronLeftIcon />
          {mdScreen && <Typography variant="body1">{t('users')}</Typography>}
        </BackButtonLink>
        <Typography variant={mdScreen ? 'h1' : 'h2'} sx={{ marginTop: 2 }}>
          {t('add-new-user')}
        </Typography>
      </Grid>

      {/* Form Content in Paper */}
      <ContentPaper elevation={0}>
        <UserForm
          isUserFormInDialog={false}
          onSave={handleAddUser}
          onClose={handleClose}
          accounts={initialData?.accounts || []}
          accountUserBehaviors={accountUserBehaviors}
        />
      </ContentPaper>
    </Grid>
  )
}

export default AddUserTemplate
