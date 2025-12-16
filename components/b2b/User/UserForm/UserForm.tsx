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
import { actions, b2bUserActions, hasComplexPermissionForAccountBehaviors } from '@/lib/helpers'

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
  /** Optional callback when validation state changes */
  onValidationChange?: (isValid: boolean) => void
}

/**
 * Type definition for role change operations per account
 */
interface RoleChangesPerAccount {
  rolesToAdd: string[]
  rolesToRemove: string[]
}

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
    onValidationChange,
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
   * Track if form has been modified
   * Used to enable/disable save button
   */
  const [isFormModified, setIsFormModified] = useState(false)

  /**
   * Memoized callback to update role assignments
   * Notifies parent component of changes via optional callback
   * Stable reference prevents child component re-renders
   */
  const handleRoleAssignmentsChange = React.useCallback(
    (newRoleAssignments: Record<number, string[]>) => {
      setRoleAssignments(newRoleAssignments)
      setIsFormModified(true) // Mark form as modified when roles change
      onRoleAssignmentsChange?.(newRoleAssignments)
    },
    [onRoleAssignmentsChange]
  )

  /**
   * Transform and filter accounts based on ViewRole permission
   * Only includes accounts where user has permission to view/manage roles
   * In edit mode, also filters to only show accounts that have roles in accountRoles
   * and checks for UPDATE_BUYER permission
   * Memoized to prevent recalculation unless dependencies change
   */
  const accountsWithRoles = React.useMemo(
    () =>
      accounts
        .map((account) => {
          const accountId = account.id || 0
          return {
            accountId,
            accountName: account.companyOrOrganization || '',
          }
        })
        .filter((account) => {
          const accountBehaviors = accountUserBehaviors?.[account.accountId] || []

          // In edit mode, check for both VIEW_ROLE and UPDATE_BUYER permissions
          if (isEditMode) {
            const hasRequiredPermissions = hasComplexPermissionForAccountBehaviors(
              accountBehaviors,
              [b2bUserActions.VIEW_ROLE],
              [b2bUserActions.UPDATE_BUYER, actions.EDIT_USERS]
            )
            return hasRequiredPermissions && accountRoles[account.accountId] !== undefined
          }

          // In create mode, only check VIEW_ROLE permission
          return hasComplexPermissionForAccountBehaviors(
            accountBehaviors,
            [b2bUserActions.VIEW_ROLE],
            []
          )
        }) as Array<{
        accountId: number
        accountName: string
      }>,
    [accounts, accountUserBehaviors, isEditMode, accountRoles]
  )

  const {
    getValues,
    handleSubmit,
    formState: { errors, dirtyFields },
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
   * Validate that each account has at least one role assigned
   * In edit mode: all accounts must have at least one role
   * In create mode: at least one account must have at least one role
   * Memoized to prevent recalculation on every render
   */
  const hasRoleValidationError = React.useMemo(() => {
    // Check if each available account (that user has permission to manage) has at least one role
    if (accountsWithRoles.length === 0) return false

    if (isEditMode) {
      // Edit mode: Check each account that should have roles assigned
      for (const account of accountsWithRoles) {
        const assignedRoles = roleAssignments[account.accountId] || []
        if (assignedRoles.length === 0) {
          return true // Validation error: account has no roles
        }
      }
      return false
    } else {
      // Create mode: At least one account must have at least one role
      const hasAnyRoleAssigned = accountsWithRoles.some((account) => {
        const assignedRoles = roleAssignments[account.accountId] || []
        return assignedRoles.length > 0
      })
      return !hasAnyRoleAssigned // Error if no account has any roles
    }
  }, [accountsWithRoles, roleAssignments, isEditMode])

  /**
   * Check if form fields have been modified
   * Memoized to prevent recalculation on every render
   */
  const hasFormFieldsChanged = React.useMemo(() => {
    return Object.keys(dirtyFields).length > 0
  }, [dirtyFields])

  /**
   * State to track form values for real-time validation
   */
  const [formValues, setFormValues] = useState({
    emailAddress: isEditMode && b2BUser ? b2BUser.emailAddress || '' : '',
    firstName: isEditMode && b2BUser ? b2BUser.firstName || '' : '',
    lastName: isEditMode && b2BUser ? b2BUser.lastName || '' : '',
  })

  /**
   * Check if email is valid
   * Memoized to prevent recalculation on every render
   */
  const isEmailValid = React.useMemo(() => {
    const email = formValues.emailAddress?.trim()
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return !!(email && emailPattern.test(email))
  }, [formValues.emailAddress])

  /**
   * Check if all required fields are filled
   * Memoized to prevent recalculation on every render
   */
  const hasRequiredFields = React.useMemo(() => {
    const firstName = formValues.firstName?.trim()
    const lastName = formValues.lastName?.trim()
    return !!(isEmailValid && firstName && lastName)
  }, [formValues, isEmailValid])

  /**
   * Determine if save button should be disabled
   * Disabled when:
   * - Form is submitting
   * - Form has validation errors
   * - Role validation fails (any account without roles)
   * - Required fields (email, firstName, lastName) are not filled
   * - In edit mode and no changes have been made (neither fields nor roles)
   */
  const isSaveDisabled = React.useMemo(() => {
    if (isSubmitting) return true
    if (Object.keys(errors).length > 0) return true
    if (hasRoleValidationError) return true
    if (!hasRequiredFields) return true

    // In edit mode, require at least one change (form fields or role assignments)
    if (isEditMode) {
      return !hasFormFieldsChanged && !isFormModified
    }

    // In create mode, button is disabled by default until form is modified
    return !isFormModified && !hasFormFieldsChanged
  }, [
    isSubmitting,
    errors,
    hasRoleValidationError,
    hasRequiredFields,
    isEditMode,
    hasFormFieldsChanged,
    isFormModified,
  ])

  /**
   * Notify parent component whenever validation state changes
   */
  React.useEffect(() => {
    if (onValidationChange) {
      onValidationChange(!isSaveDisabled)
    }
  }, [isSaveDisabled, onValidationChange])

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
      className={classes.formContainerStyle}
    >
      <Grid container spacing={8} className={classes.gridContainerStyle}>
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
                onChange={(_name, value) => {
                  field.onChange(value)
                  setFormValues((prev) => ({ ...prev, emailAddress: value }))
                }}
                disabled={isEditMode}
                required
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
                required
                onChange={(_name, value) => {
                  field.onChange(value)
                  setFormValues((prev) => ({ ...prev, firstName: value }))
                  setIsFormModified(true)
                }}
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
                required
                onChange={(_name, value) => {
                  field.onChange(value)
                  setFormValues((prev) => ({ ...prev, lastName: value }))
                  setIsFormModified(true)
                }}
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
            <Box className={classes.actionButtonStyle}>
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
                disabled={isSaveDisabled}
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
