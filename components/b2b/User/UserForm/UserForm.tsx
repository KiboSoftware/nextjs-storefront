import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Box, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import userFormStyles from './UserForm.styles'
import { AccountRoleAssignments } from '@/components/b2b'
import { KiboTextBox } from '@/components/common'
import { useAddRoleToCustomerB2bAccountMutation, useDeleteB2bAccountRoleMutation } from '@/hooks'
import type { GetRolesAsyncResponse } from '@/lib/api/operations/get-roles-across-accounts'
import { CustomBehaviors } from '@/lib/constants'

import { B2BUserInput, B2BAccount, B2BUser, B2BUserCollection } from '@/lib/gql/types'

/**
 * Props for the UserForm component
 * Handles both creation and editing of B2B users with role assignments
 */
interface UserFormProps {
  /** Flag indicating if form is displayed within a dialog */
  isUserFormInDialog?: boolean
  /** Flag indicating if form is in edit mode (vs create mode) */
  isEditMode?: boolean
  /** Existing user data for edit mode */
  b2BUser?: B2BUser | null
  /** Map of account IDs to user collections across accounts */
  b2BUsersAcrossAccounts?: Record<number, B2BUserCollection>
  /** Map of account IDs to available roles for that account */
  accountRoles?: Record<number, GetRolesAsyncResponse>
  /** List of B2B accounts accessible to the current user */
  accounts?: B2BAccount[]
  /** Map of account IDs to user behavior/permission arrays */
  accountUserBehaviors?: Record<number, number[]>
  /** Whether to show action buttons (save/cancel) */
  showButtons?: boolean
  /** Callback when form is closed/cancelled */
  onClose: () => void
  /** Callback when form is submitted with form values and role assignments */
  onSave: (formValues: B2BUserInput & { roleAssignments?: Record<number, string[]> }) => void
  /** Optional callback when role assignments change */
  onRoleAssignmentsChange?: (roleAssignments: Record<number, string[]>) => void
}

/**
 * Type definition for role change operations per account
 */
interface RoleChangesPerAccount {
  rolesToAdd: string[]
  rolesToRemove: string[]
}

/** Inline styles extracted as constants to prevent object recreation */
const FORM_CONTAINER_STYLES = { display: 'flex', width: '100%' } as const
const GRID_CONTAINER_STYLES = { marginTop: '5px', marginLeft: 0, width: '100%' } as const
const ACTION_BUTTON_STYLES = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 2,
  mt: 3,
  mb: 2,
} as const

/**
 * Custom hook to create form validation schema
 * Memoized to prevent recreation unless translations change
 */
export const useFormSchema = () => {
  const { t } = useTranslation('common')
  return React.useMemo(
    () =>
      yup.object({
        emailAddress: yup
          .string()
          .required(t('no-email-error'))
          .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, t('invalid-email-error')),
        firstName: yup.string().required(t('firstname-error')),
        lastName: yup.string().required(t('lastname-error')),
      }),
    [t]
  )
}

/**
 * UserForm Component
 * Enterprise-grade form for creating and editing B2B users with role assignments
 * Optimized for minimal re-renders and maximum performance
 */
const UserForm = (props: UserFormProps) => {
  const {
    accounts = [],
    accountUserBehaviors,
    isEditMode = false,
    b2BUser = null,
    b2BUsersAcrossAccounts = {},
    accountRoles = {},
    showButtons = true,
    onClose,
    onSave,
    onRoleAssignmentsChange,
  } = props

  const classes = userFormStyles()
  const { t } = useTranslation('common')
  const userSchema = useFormSchema()

  const { addRoleToCustomerB2bAccount } = useAddRoleToCustomerB2bAccountMutation()
  const { deleteB2bAccountUserRole } = useDeleteB2bAccountRoleMutation()

  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * Ref to track original role assignments from API
   * Used to calculate delta (additions/removals) on submit
   * Using ref to avoid triggering re-renders
   */
  const originalRolesByAccount = React.useRef<Record<number, string[]>>({})

  /**
   * Extract and map user IDs from b2BUsersAcrossAccounts for each account
   * Memoized to prevent recalculation unless data changes
   * @returns Map of accountId -> userId
   */
  const userIdsByAccount = React.useMemo(() => {
    const userIdMap: Record<number, string> = {}

    Object.entries(b2BUsersAcrossAccounts).forEach(([accountIdStr, userCollection]) => {
      const accountId = Number(accountIdStr)
      const firstUser = userCollection.items?.[0]
      if (firstUser?.userId) {
        userIdMap[accountId] = firstUser.userId
      }
    })

    return userIdMap
  }, [b2BUsersAcrossAccounts])

  /**
   * Initialize role assignments from existing user data in edit mode
   * Extracts roles from both b2BUser.roles and b2BUsersAcrossAccounts
   * Memoized to prevent recalculation unless dependencies change
   * @returns Map of accountId -> array of roleIds
   */
  const initialRoleAssignments = React.useMemo(() => {
    if (isEditMode) {
      const assignments: Record<number, string[]> = {}

      // Extract roles from primary b2BUser object
      if (b2BUser?.roles) {
        b2BUser.roles.forEach((role) => {
          if (role?.assignedInScope?.id && role?.roleId) {
            const accountId = role.assignedInScope.id
            if (!assignments[accountId]) {
              assignments[accountId] = []
            }
            assignments[accountId].push(role.roleId.toString())
          }
        })
      }

      // Also extract from b2BUsersAcrossAccounts if available
      if (b2BUsersAcrossAccounts && Object.keys(b2BUsersAcrossAccounts).length > 0) {
        Object.entries(b2BUsersAcrossAccounts).forEach(([accountIdStr, userCollection]) => {
          const accountId = Number(accountIdStr)
          userCollection.items?.forEach((user) => {
            if (user?.roles) {
              user.roles.forEach((role) => {
                if (role?.roleId) {
                  const roleIdStr = role.roleId.toString()
                  if (!assignments[accountId]) {
                    assignments[accountId] = []
                  }
                  if (!assignments[accountId].includes(roleIdStr)) {
                    assignments[accountId].push(roleIdStr)
                  }
                }
              })
            }
          })
        })
      }

      return assignments
    }
    return {}
  }, [isEditMode, b2BUser, b2BUsersAcrossAccounts])

  const [roleAssignments, setRoleAssignments] =
    useState<Record<number, string[]>>(initialRoleAssignments)

  /**
   * Memoized callback to update role assignments
   * Notifies parent component of changes via optional callback
   * Stable reference prevents child component re-renders
   */
  const handleRoleAssignmentsChange = React.useCallback(
    (newRoleAssignments: Record<number, string[]>) => {
      setRoleAssignments(newRoleAssignments)
      onRoleAssignmentsChange?.(newRoleAssignments)
    },
    [onRoleAssignmentsChange]
  )

  /**
   * Check if user has ViewRole permission for a specific account
   * Memoized callback for stable reference across renders
   * @param accountId - The account ID to check permissions for
   * @returns true if user has ViewRole permission
   */
  const hasViewRolePermission = React.useCallback(
    (accountId: number): boolean => {
      const behaviors = accountUserBehaviors?.[accountId]
      return behaviors ? behaviors.includes(CustomBehaviors.ViewRole) : false
    },
    [accountUserBehaviors]
  )

  /**
   * Transform and filter accounts based on ViewRole permission
   * Only includes accounts where user has permission to view/manage roles
   * Memoized to prevent recalculation unless dependencies change
   */
  const accountsWithRoles = React.useMemo(
    () =>
      accounts
        .map((account) => {
          const accountId = account.id || 0
          const hasPermission = hasViewRolePermission(accountId)

          // Skip accounts without permission
          if (!hasPermission) return null

          return {
            accountId,
            accountName: account.companyOrOrganization || '',
          }
        })
        .filter(Boolean) as Array<{
        accountId: number
        accountName: string
      }>,
    [accounts, hasViewRolePermission]
  )

  const {
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues:
      isEditMode && b2BUser
        ? {
            role: 'Admin',
            emailAddress: b2BUser.emailAddress || '',
            firstName: b2BUser.firstName || '',
            lastName: b2BUser.lastName || '',
            isActive: b2BUser.isActive ?? true,
          }
        : { role: 'Admin', emailAddress: '', firstName: '', lastName: '', isActive: true },
    resolver: yupResolver(userSchema),
  })

  // Initialize originalRolesByAccount ref once on mount
  React.useEffect(() => {
    if (isEditMode && Object.keys(initialRoleAssignments).length > 0) {
      originalRolesByAccount.current = { ...initialRoleAssignments }
    }
  }, [isEditMode, initialRoleAssignments])

  /**
   * Form submission handler
   * Processes role changes and submits form data
   * Memoized to prevent recreation unless dependencies change
   */
  const onSubmit = React.useCallback(async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      const changesPerAccount: Record<number, RoleChangesPerAccount> = {}

      // In edit mode, process role changes before saving
      if (isEditMode) {
        const roleOperations: Promise<unknown>[] = []

        // Compare current roleAssignments with original roles
        const allAccountIds = new Set([
          ...Object.keys(roleAssignments).map(Number),
          ...Object.keys(originalRolesByAccount.current).map(Number),
        ])

        allAccountIds.forEach((accountId) => {
          const newRoles = roleAssignments[accountId] || []
          const originalRoles = originalRolesByAccount.current[accountId] || []

          // Find roles to add (in new but not in original)
          const rolesToAdd = newRoles.filter((roleId) => !originalRoles.includes(roleId))

          // Find roles to remove (in original but not in new)
          const rolesToRemove = originalRoles.filter((roleId) => !newRoles.includes(roleId))

          if (rolesToAdd.length > 0 || rolesToRemove.length > 0) {
            changesPerAccount[accountId] = { rolesToAdd, rolesToRemove }
          }
        })

        // Execute role changes
        Object.entries(changesPerAccount).forEach(
          ([accountIdStr, { rolesToAdd, rolesToRemove }]) => {
            const accountId = Number(accountIdStr)
            const userId = userIdsByAccount[accountId] || b2BUser?.userId

            if (!userId) return

            // Add new roles
            rolesToAdd.forEach((roleId) => {
              roleOperations.push(
                addRoleToCustomerB2bAccount.mutateAsync({
                  accountId,
                  userId: userId as string,
                  roleId: parseInt(roleId),
                })
              )
            })

            // Remove old roles
            rolesToRemove.forEach((roleId) => {
              roleOperations.push(
                deleteB2bAccountUserRole.mutateAsync({
                  accountId,
                  userId: userId as string,
                  roleId: parseInt(roleId),
                })
              )
            })
          }
        )

        // Wait for all role operations to complete
        if (roleOperations.length > 0) {
          await Promise.all(roleOperations).catch((error) => {
            console.error('[UserForm] Role operations failed:', error)
            throw error // Re-throw to be caught by outer catch block
          })
        }
      }

      const formValues = getValues()
      const extendedFormValues = {
        ...formValues,
        roleAssignments,
        userIdsByAccount,
        changesPerAccount,
      }
      await onSave(extendedFormValues)
      setIsSubmitting(false)
      onClose()
    } catch (error) {
      console.error('[UserForm] Error saving user:', error)
      setIsSubmitting(false)
      // Note: Error notification should be handled by parent component
    }
  }, [
    isSubmitting,
    isEditMode,
    getValues,
    roleAssignments,
    onSave,
    onClose,
    b2BUser?.userId,
    userIdsByAccount,
    addRoleToCustomerB2bAccount,
    deleteB2bAccountUserRole,
  ])

  /**
   * Memoized cancel action handler
   * Stable reference prevents unnecessary re-renders of child components
   */
  const handleCancel = React.useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="addUserForm"
      data-testid="user-form"
      style={FORM_CONTAINER_STYLES}
    >
      <Grid container spacing={8} style={GRID_CONTAINER_STYLES}>
        <Grid item xs={12} md={12} className={classes.textBoxGridStyle}>
          <Controller
            name="emailAddress"
            control={control}
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t('invalid-email-error'),
              },
            }}
            render={({ field }) => (
              <KiboTextBox
                fullWidth
                error={!!errors?.emailAddress}
                value={field.value || ''}
                helperText={errors?.emailAddress?.message}
                label={t('email-address')}
                onChange={(_name, value) => field.onChange(value)}
                disabled={isEditMode}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={12} className={classes.textBoxGridStyle}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <KiboTextBox
                fullWidth
                error={!!errors?.firstName}
                value={field.value || ''}
                helperText={errors?.firstName?.message}
                label={t('first-name')}
                onChange={(_name, value) => field.onChange(value)}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={12} className={classes.textBoxGridStyle}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <KiboTextBox
                fullWidth
                error={!!errors?.lastName}
                value={field.value || ''}
                helperText={errors?.lastName?.message}
                label={t('last-name-or-sur-name')}
                onChange={(_name, value) => field.onChange(value)}
              />
            )}
          />
        </Grid>

        {/* Account Role Assignments Section - Full Width */}
        <Grid item xs={12} md={12} className={classes.textBoxGridStyle}>
          <AccountRoleAssignments
            accounts={accountsWithRoles}
            selectedRoles={roleAssignments}
            onChange={handleRoleAssignmentsChange}
            accountRoles={accountRoles}
          />
        </Grid>

        {/* Action Buttons */}
        {showButtons && (
          <Grid item xs={12}>
            <Box sx={ACTION_BUTTON_STYLES}>
              <LoadingButton
                variant="outlined"
                color="inherit"
                data-testid="cancel-button"
                type="button"
                onClick={handleCancel}
              >
                {t('cancel')}
              </LoadingButton>

              <LoadingButton
                variant="contained"
                disableElevation
                data-testid="submit-button"
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {t('save')}
              </LoadingButton>
            </Box>
          </Grid>
        )}
      </Grid>
    </form>
  )
}

export default UserForm
