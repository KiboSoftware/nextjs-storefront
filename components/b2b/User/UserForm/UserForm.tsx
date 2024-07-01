import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Grid, Stack } from '@mui/material'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import GroupTransferList from '../../GroupTransferText/GroupTransferList'
import { KiboRadio, KiboSwitch, KiboTextBox } from '@/components/common'
import { useGetGroups } from '@/hooks/queries/groups/useGetGroups/useGetGroups'

import { B2BUser, B2BUserInput } from '@/lib/gql/types'

interface UserFormProps {
  isEditMode: boolean
  isUserFormInDialog?: boolean
  b2BUser?: B2BUser
  onClose: () => void
  onSave: (formValues: B2BUserInput, b2BUser?: B2BUser) => void
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
  const { isEditMode, b2BUser, onClose, onSave } = props

  const { publicRuntimeConfig } = getConfig()

  const { t } = useTranslation('common')
  const userSchema = useFormSchema()
  const userFormRadioOptions = publicRuntimeConfig.userFormRadioOptions

  const [isLoading, setLoading] = useState(false)

  const { data: groups } = useGetGroups()

  const {
    getValues,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: { role: 'Admin', emailAddress: '', firstName: '', lastName: '', isActive: true },
    resolver: yupResolver(userSchema),
  })
  const onSubmit = async () => {
    if (isLoading) return
    setLoading(true)
    const formValues = getValues()
    if (isEditMode) {
      await onSave(formValues, b2BUser)
    } else {
      await onSave(formValues)
    }
    setLoading(false)
    cancelAction()
  }

  useEffect(() => {
    if (!b2BUser) return
    const { firstName, lastName, emailAddress, isActive, roles } = b2BUser
    reset({
      emailAddress: emailAddress as string,
      firstName: firstName as string,
      lastName: lastName as string,
      isActive: isActive as boolean,
      role: roles?.length ? roles[0]?.roleName as string : '',
    })
  }, [b2BUser])

  const cancelAction = () => {
    onClose()
    reset()
  }

  return (
    <>
      {/* Add User Details Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="addUserForm"
        data-testid="user-form"
        style={{ display: 'flex' }}
      >
        <Grid
          container
          rowSpacing={1}
          columnSpacing={1}
        >
          <Grid
            item
            xs={12}
            md={12}
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
            md={6}
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
            md={6}
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
        
          <Grid item xs={12} md={12}>
            <Controller
              name="role"
              control={control}
              defaultValue={getValues('role')}
              render={({ field }) => (
                <KiboRadio
                  {...field}
                  align="center"
                  row
                  onChange={(value) => field.onChange(value)}
                  title={t('role')}
                  radioOptions={userFormRadioOptions}
                  selected={getValues('role')}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <GroupTransferList groupsList={groups?.filter((group: any) => !(b2BUser as any)?.groups.includes(group.code))} selectedGroups={groups?.filter((group: any) => (b2BUser as any)?.groups.includes(group.code))}  />
          </Grid>

          {isEditMode && (
            <Grid
              item
              xs={12}
              md={12}
            >
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
            </Grid>
          )}
          <Grid
            item
            xs={12}
            md={12}
            sx={{ paddingLeft: '0 !important', paddingTop: { xs: '15px !important' } }}
          >
            <Stack
              gap={1}
              sx={{
                width: { xs: '100%' },
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'end',
              }}
            >
              <LoadingButton
                variant="outlined"
                color="inherit"
                data-testid="reset-button"
                type="reset"
                onClick={cancelAction}
                sx={{ marginTop: { xs: 1.5, md: 0 } }}
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
                {(isEditMode ? t('save') : t('add-user'))}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default UserForm
