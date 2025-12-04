// Add User Template - New page for adding B2B users

import React from 'react'

import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Typography, Paper, useMediaQuery, useTheme, Grid, styled, Theme } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { addUserTemplateStyles } from './AddUserTemplate.styles'
import { UserForm } from '@/components/b2b'
import { useAuthContext } from '@/context'
import {
  useAddRoleToCustomerB2bAccountMutation,
  useCreateCustomerB2bUserMutation,
  useUpdateCustomerB2bUserMutation,
} from '@/hooks'
import type { GetRolesAsyncResponse } from '@/lib/api/operations/get-roles-across-accounts'
import { Routes } from '@/lib/constants'
import { buildCreateCustomerB2bUserParams, buildUpdateCustomerB2bUserParams } from '@/lib/helpers'
import { B2BAccountHierarchyResult } from '@/lib/types'
import { B2BUserInput } from '@/lib/types/CustomerB2BUser'

import { B2BUser, B2BUserCollection } from '@/lib/gql/types'

/**
 * Props for the AddUserTemplate component
 */
export interface AddUserTemplateProps {
  /** Initial account hierarchy data */
  initialData?: B2BAccountHierarchyResult
  /** Map of account IDs to user behavior/permission arrays */
  accountUserBehaviors?: Record<number, number[]>
  /** Existing user data for edit mode */
  b2BUser?: B2BUser | null
  /** Map of account IDs to user collections across accounts */
  b2BUsersAcrossAccounts?: Record<number, B2BUserCollection>
  /** Map of account IDs to available roles for that account */
  accountRoles?: Record<number, GetRolesAsyncResponse>
  /** Flag indicating if component is in edit mode (vs create mode) */
  isEditMode?: boolean
}

/**
 * Extended form values including role assignments and user ID mappings
 */
interface ExtendedFormValues extends B2BUserInput {
  roleAssignments?: Record<number, string[]>
  userIdsByAccount?: Record<number, string>
  changesPerAccount?: Record<number, { rolesToAdd: string[]; rolesToRemove: string[] }>
}

/**
 * AddUserTemplate Component
 * Enterprise-grade template for creating and editing B2B users
 * Handles user creation/update and role assignment orchestration
 * Optimized for minimal re-renders and maximum performance
 */

const BackButtonLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  typography: 'body2',
  textDecoration: 'none',
  color: theme.palette.grey[900],
  display: 'flex',
  alignItems: 'center',
  padding: '1rem 0rem',
  cursor: 'pointer',
}))

const AddUserTemplate = ({
  initialData,
  accountUserBehaviors,
  b2BUser = null,
  b2BUsersAcrossAccounts = {},
  accountRoles = {},
  isEditMode = false,
}: AddUserTemplateProps) => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const { user } = useAuthContext()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSaveEnabled, setIsSaveEnabled] = React.useState(false)

  const { createCustomerB2bUser } = useCreateCustomerB2bUserMutation()
  const { updateCustomerB2bUser } = useUpdateCustomerB2bUserMutation()
  const { addRoleToCustomerB2bAccount } = useAddRoleToCustomerB2bAccountMutation()

  const styles = addUserTemplateStyles

  /**
   * Memoize accounts array to prevent unnecessary child re-renders
   * Only recalculates when initialData.accounts actually changes
   */
  const accounts = React.useMemo(() => initialData?.accounts || [], [initialData?.accounts])

  /**
   * Handle user save operation
   * Orchestrates user creation/update and role assignments
   * In edit mode: Updates user details and processes role changes
   * In create mode: Creates user in all accounts with selected roles
   * @param formValues - Extended form values with role assignments and user ID mappings
   * Note: Mutation objects from React Query are stable and excluded from dependencies
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSaveUser = React.useCallback(
    async (formValues: ExtendedFormValues) => {
      setIsSubmitting(true)
      try {
        const roleAssignments = formValues.roleAssignments || {}
        const userIdsByAccount = formValues.userIdsByAccount || {}
        const accountIds = Object.keys(roleAssignments)
          .map(Number)
          .filter((accountId) => roleAssignments[accountId]?.length > 0)

        if (isEditMode && b2BUser) {
          // Check if only name fields changed (no role changes)
          const hasRoleChanges = accountIds.length > 0
          const nameChanged =
            formValues.firstName !== b2BUser.firstName || formValues.lastName !== b2BUser.lastName

          if (nameChanged && !hasRoleChanges) {
            // Only name changed - just update the user in their primary account
            const primaryAccountId = b2BUser.roles?.[0]?.assignedInScope?.id || user?.id || 0
            const primaryUserId = userIdsByAccount[primaryAccountId] || b2BUser.userId

            const updateUserVariables = buildUpdateCustomerB2bUserParams({
              user: { ...user, id: primaryAccountId },
              b2BUser: { ...b2BUser, userId: primaryUserId },
              values: formValues,
            })

            await updateCustomerB2bUser.mutateAsync(updateUserVariables)
            router.replace(Routes.Users)
            return
          }

          // Edit mode - update user in each account where they have roles
          // Note: Role operations are now handled in UserForm before this is called

          // Update user details in each account (if name changed)
          if (nameChanged) {
            const updatePromises = accountIds.map(async (accountId) => {
              const accountUserId = userIdsByAccount[accountId] || b2BUser.userId

              const updateUserVariables = buildUpdateCustomerB2bUserParams({
                user: { ...user, id: accountId },
                b2BUser: { ...b2BUser, userId: accountUserId },
                values: formValues,
              })

              try {
                const response = await updateCustomerB2bUser.mutateAsync(updateUserVariables)
                return { accountId, response, success: true }
              } catch (error) {
                console.error(
                  `[AddUserTemplate] Failed to update user for account ${accountId}:`,
                  error
                )
                return { accountId, response: null, success: false, error }
              }
            })

            await Promise.all(updatePromises)
          }

          // Role operations are already handled in UserForm's onSubmit
          // No need to duplicate role add/delete operations here
        } else {
          // Create mode - create user only in accounts where roles are selected

          // Step 1: Create users in parallel only for accounts with selected roles
          const userCreationPromises = accountIds.map((accountId) => {
            const createUserVariables = buildCreateCustomerB2bUserParams({
              user: { ...user, id: accountId },
              values: formValues,
            })
            return createCustomerB2bUser
              .mutateAsync(createUserVariables)
              .then((response) => ({ accountId, response }))
              .catch((error) => {
                console.error(
                  `[AddUserTemplate] Failed to create user for account ${accountId}:`,
                  error
                )
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
              console.error('[AddUserTemplate] Some role assignments failed:', error)
            })
          }
        }

        // Navigate back to users list after all operations complete
        router.replace(Routes.Users)
      } catch (error) {
        console.error('[AddUserTemplate] Error in handleSaveUser:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    // Mutation objects from React Query are stable and don't need to be in dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isEditMode, b2BUser, user, router]
  )

  /**
   * Handle cancel/close action
   * Navigates back to users list
   */
  const handleClose = React.useCallback(() => {
    router.replace(Routes.Users)
  }, [router])

  /**
   * Handle form submission via external button
   * Triggers form submit programmatically
   */
  const handleFormSubmit = React.useCallback(() => {
    const form = document.getElementById('addUserForm') as HTMLFormElement
    form?.requestSubmit()
  }, [])

  return (
    <Grid>
      <Grid item sx={styles.container}>
        {/* Mobile: Back button and title together */}
        {!mdScreen && (
          <Box sx={styles.mobileHeader}>
            <Box sx={styles.backButtonLink(theme)}>
              <BackButtonLink href="/my-account/b2b/users">
                <ChevronLeftIcon fontSize="inherit" />
              </BackButtonLink>
            </Box>
            <Typography variant="h2" sx={styles.mobileTitle}>
              {isEditMode ? t('edit-user') : t('add-new-user')}
            </Typography>
          </Box>
        )}

        {/* Desktop: Back button and title on same line */}
        {mdScreen && (
          <Box sx={styles.desktopHeader}>
            <Box sx={styles.backButtonLink(theme)}>
              <BackButtonLink href="/my-account/b2b/users">
                <ChevronLeftIcon fontSize="inherit" />
                <Typography variant="body2">{t('users')}</Typography>
              </BackButtonLink>
            </Box>
            <Typography variant="h1" sx={styles.desktopTitle}>
              {isEditMode ? t('edit-user') : t('add-new-user')}
            </Typography>
          </Box>
        )}

        {/* Desktop: Action Buttons at top */}
        {mdScreen && (
          <Box sx={styles.desktopActionButtons}>
            <LoadingButton
              variant="outlined"
              color="inherit"
              onClick={handleClose}
              disabled={isSubmitting}
              sx={styles.actionButton}
            >
              {t('cancel')}
            </LoadingButton>
            <LoadingButton
              variant="contained"
              disableElevation
              onClick={handleFormSubmit}
              loading={isSubmitting}
              disabled={isSubmitting || !isSaveEnabled}
              sx={styles.actionButton}
            >
              {t('save')}
            </LoadingButton>
          </Box>
        )}

        {/* Form Content in Paper */}
        <Paper elevation={0} sx={styles.contentPaper(theme)}>
          <UserForm
            isUserFormInDialog={false}
            isEditMode={isEditMode}
            b2BUser={b2BUser}
            b2BUsersAcrossAccounts={b2BUsersAcrossAccounts}
            accountRoles={accountRoles}
            onSave={handleSaveUser}
            onClose={handleClose}
            accounts={accounts}
            accountUserBehaviors={accountUserBehaviors}
            showButtons={false}
            onValidationChange={setIsSaveEnabled}
          />

          {/* Mobile: Action Buttons at bottom */}
          {!mdScreen && (
            <Box sx={styles.mobileActionButtons}>
              <LoadingButton
                variant="outlined"
                color="inherit"
                onClick={handleClose}
                disabled={isSubmitting}
                fullWidth
              >
                {t('cancel')}
              </LoadingButton>
              <LoadingButton
                variant="contained"
                disableElevation
                onClick={handleFormSubmit}
                loading={isSubmitting}
                disabled={isSubmitting || !isSaveEnabled}
                fullWidth
              >
                {t('save')}
              </LoadingButton>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}

AddUserTemplate.displayName = 'AddUserTemplate'

export default AddUserTemplate
