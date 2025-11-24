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
import { CustomBehaviors } from '@/lib/constants'

import { B2BUserInput, B2BAccount } from '@/lib/gql/types'

interface UserFormProps {
  isUserFormInDialog?: boolean
  accounts?: B2BAccount[]
  accountUserBehaviors?: Record<number, number[]>
  onClose: () => void
  onSave: (formValues: B2BUserInput & { roleAssignments?: Record<number, string[]> }) => void
}

export const useFormSchema = () => {
  const { t } = useTranslation('common')
  return yup.object({
    emailAddress: yup
      .string()
      .required(t('no-email-error'))
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, t('invalid-email-error')),
    firstName: yup.string().required(t('firstname-error')),
    lastName: yup.string().required(t('lastname-error')),
  })
}

const UserForm = (props: UserFormProps) => {
  const { accounts = [], accountUserBehaviors, onClose, onSave } = props

  const classes = userFormStyles()
  const { t } = useTranslation('common')
  const userSchema = useFormSchema()

  const [isLoading, setLoading] = useState(false)
  const [roleAssignments, setRoleAssignments] = useState<Record<number, string[]>>({})

  // Check if user has ViewRole permission for a specific account
  const hasViewRolePermission = React.useCallback(
    (accountId: number): boolean => {
      const behaviors = accountUserBehaviors?.[accountId]
      return behaviors ? behaviors.includes(CustomBehaviors.ViewRole) : false
    },
    [accountUserBehaviors]
  )

  // Transform accounts into the format needed by AccountRoleAssignments
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

  // Memoize default values
  const defaultValues = React.useMemo(() => {
    return { role: 'Admin', emailAddress: '', firstName: '', lastName: '', isActive: true }
  }, [])

  const {
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues,
    resolver: yupResolver(userSchema),
  })

  const onSubmit = React.useCallback(async () => {
    if (isLoading) return
    setLoading(true)
    const formValues = getValues()
    const extendedFormValues = {
      ...formValues,
      roleAssignments,
    }
    await onSave(extendedFormValues)
    setLoading(false)
    onClose()
  }, [isLoading, getValues, roleAssignments, onSave, onClose])

  const cancelAction = React.useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <>
      {/* Add User Details Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="addUserForm"
        data-testid="user-form"
        style={{ display: 'flex', width: '100%' }}
      >
        <Grid
          container
          spacing={8}
          style={{
            marginTop: '5px',
            marginLeft: 0,
            width: '100%',
          }}
        >
          <Grid
            item
            xs={12}
            md={12}
            className={classes.textBoxGridStyle}
          >
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
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            className={classes.textBoxGridStyle}
          >
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
          <Grid
            item
            xs={12}
            md={12}
            className={classes.textBoxGridStyle}
          >
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
          <Grid  xs={12}>
            <AccountRoleAssignments
              accounts={accountsWithRoles}
              selectedRoles={roleAssignments}
              onChange={setRoleAssignments}
            />
          </Grid>

          {/* Action Buttons - Full Width */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 3,
                mb: 2,
              }}
            >
              <LoadingButton
                variant="outlined"
                color="inherit"
                data-testid="reset-button"
                type="reset"
                onClick={cancelAction}
              >
                {t('cancel')}
              </LoadingButton>

              <LoadingButton
                variant="contained"
                disableElevation
                data-testid="submit-button"
                type="submit"
                loading={isLoading}
                disabled={isLoading}
              >
                {t('add-user')}
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default UserForm
