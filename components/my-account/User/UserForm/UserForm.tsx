import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { Button, CircularProgress, Grid, useMediaQuery, useTheme } from '@mui/material'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { KiboRadio, KiboSwitch, KiboTextBox } from '@/components/common'
import { useAuthContext } from '@/context'
import {
  useAddRoleToCustomerB2bAccountMutation,
  useCreateCustomerB2bUserMutation,
  useDeleteB2bAccountRoleMutation,
  useUpdateCustomerB2bUserMutation,
} from '@/hooks'
import { buildB2bUserRoleParams } from '@/lib/helpers/buildB2bUserRoleParams'
import { buildCreateCustomerB2bUserParams } from '@/lib/helpers/buildCreateCustomerB2bUserParams'
import { buildUpdateCustomerB2bUserParams } from '@/lib/helpers/buildUpdateCustomerB2bUserParams'

import { B2BUser } from '@/lib/gql/types'

interface UserFormProps {
  isEditMode: boolean
  b2BUser?: B2BUser | any
  closeUserForm: () => void
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
  const { isEditMode, b2BUser, closeUserForm } = props

  const { publicRuntimeConfig } = getConfig()

  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const userSchema = useFormSchema()
  const { user } = useAuthContext()
  const userRoles = publicRuntimeConfig.b2bUserRoles
  const userFormRadioOptions = publicRuntimeConfig.userFormRadioOptions
  const { createCustomerB2bUser } = useCreateCustomerB2bUserMutation()
  const { addRoleToCustomerB2bAccount } = useAddRoleToCustomerB2bAccountMutation()
  const { updateCustomerB2bUser } = useUpdateCustomerB2bUserMutation()
  const { deleteB2bAccountUserRole } = useDeleteB2bAccountRoleMutation()

  const [isLoading, setLoading] = useState(false)
  const {
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: { role: '', emailAddress: '', firstName: '', lastName: '', isActive: true },
    resolver: yupResolver(userSchema),
  })
  const onSubmit = async () => {
    if (isLoading) return
    setLoading(true)
    const formValues = getValues()
    if (isEditMode) {
      const variables = buildUpdateCustomerB2bUserParams({ user, b2BUser, values: formValues })
      const updateUserResponse = await updateCustomerB2bUser.mutateAsync({
        ...variables,
      })
      const previousRole = b2BUser?.roles[0]?.roleName
      if (updateUserResponse && b2BUser?.roles.length && formValues.role !== previousRole) {
        await deleteB2bAccountUserRole.mutateAsync(
          buildB2bUserRoleParams({
            user,
            b2BUser,
            values: { role: previousRole },
            roles: userRoles,
          })
        )
      }
      addRoleToB2bUser(updateUserResponse, formValues)
    } else {
      const variables = buildCreateCustomerB2bUserParams({ user, values: formValues })
      const createUserResponse = await createCustomerB2bUser.mutateAsync({
        ...variables,
      })
      if (createUserResponse?.userId) {
        addRoleToB2bUser(createUserResponse, formValues)
      }
    }
    setLoading(false)
    cancelAction()
    // }
  }

  useEffect(() => {
    if (!b2BUser) return
    const { firstName, lastName, emailAddress, isActive, roles } = b2BUser
    setValue('emailAddress', emailAddress)
    setValue('firstName', firstName)
    setValue('lastName', lastName)
    setValue('isActive', isActive)
    setValue('role', roles && roles.length ? roles[0]?.roleName : '')
  }, [b2BUser])

  const addRoleToB2bUser = async (b2BUser: B2BUser, formValues: any) => {
    const addRoleToCustomerB2bAccountVariables = buildB2bUserRoleParams({
      user,
      b2BUser: b2BUser,
      values: formValues,
      roles: userRoles,
    })

    await addRoleToCustomerB2bAccount.mutateAsync({
      ...addRoleToCustomerB2bAccountVariables,
    })
  }
  const cancelAction = () => {
    closeUserForm()
    reset()
  }

  return (
    <>
      {/* Add User Details Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="addUserForm"
        style={{ display: 'flex', paddingLeft: '16px', paddingRight: '16px' }}
      >
        <Grid container spacing={8} style={{ marginTop: '5px' }}>
          <Grid
            item
            xs={12}
            md={3.5}
            sx={{ paddingTop: { xs: '10px !important', md: '64px' } }}
            style={{ display: 'flex', alignItems: 'center' }}
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
            md={1.5}
            sx={{ paddingTop: { xs: '10px !important', md: '64px' } }}
            style={{ display: 'flex', alignItems: 'center' }}
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
            md={1.5}
            sx={{ paddingTop: { xs: '10px !important', md: '64px' } }}
            style={{ display: 'flex', alignItems: 'center' }}
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
          <Grid item xs={12} md={2} sx={{ paddingTop: { xs: '10px !important', md: '64px' } }}>
            <Controller
              name="role"
              control={control}
              defaultValue={getValues('role')}
              render={({ field }) => (
                <KiboRadio
                  {...field}
                  align="center"
                  onChange={(value) => field.onChange(value)}
                  title={mdScreen ? '' : 'Role'}
                  radioOptions={userFormRadioOptions}
                  selected={getValues('role')}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={1}
            sx={{ paddingTop: { sm: '0 !important', md: '50px !important' } }}
          >
            {isEditMode && (
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <KiboSwitch
                    checked={field.value}
                    onLabel={t('active')}
                    offLabel={t('in-active')}
                    title={t('status')}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={2.5}
            sx={{ paddingTop: { xs: '10px !important', md: '64px' } }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          >
            {isEditMode && mdScreen && (
              <>
                <Button
                  variant="outlined"
                  type="reset"
                  onClick={cancelAction}
                  style={{
                    backgroundColor: theme.palette.grey[600],
                    color: theme.palette.secondary.light,
                    marginRight: '8px',
                  }}
                >
                  <ClearIcon />
                </Button>
                <Button
                  variant="contained"
                  disableElevation
                  style={{ height: '37px' }}
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress
                      style={{
                        color: theme.palette.secondary.light,
                        height: '25px',
                        width: '25px',
                      }}
                    />
                  ) : (
                    <CheckIcon />
                  )}
                </Button>
              </>
            )}
            {!isEditMode && mdScreen && (
              <>
                <Button
                  variant="outlined"
                  type="reset"
                  onClick={closeUserForm}
                  style={{ marginRight: '8px' }}
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant="contained"
                  disableElevation
                  style={{ height: '37px', width: '90px' }}
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress
                      size={'small'}
                      style={{
                        color: theme.palette.secondary.light,
                        height: '25px',
                        width: '25px',
                      }}
                    />
                  ) : (
                    t('add-user')
                  )}
                </Button>
              </>
            )}

            {!mdScreen && (
              <Grid
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Button
                  variant="contained"
                  disableElevation
                  style={{ height: '37px', marginBottom: '10px' }}
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress
                      size={'small'}
                      style={{
                        color: theme.palette.secondary.light,
                        height: '25px',
                        width: '25px',
                      }}
                    />
                  ) : (
                    t('save')
                  )}
                </Button>
                <Button variant="outlined" type="reset" onClick={closeUserForm}>
                  {t('cancel')}
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default UserForm
