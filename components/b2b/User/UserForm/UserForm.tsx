import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { LoadingButton } from '@mui/lab'
import { Box, Grid, Stack, useMediaQuery, useTheme } from '@mui/material'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import userFormStyles from './UserForm.styles'
import { KiboRadio, KiboSwitch, KiboTextBox } from '@/components/common'

import { B2BUser, B2BUserInput } from '@/lib/gql/types'

interface UserFormProps {
  isEditMode: boolean
  isUserFormInDialog?: boolean
  b2BUser?: B2BUser | any
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
  const { isEditMode, isUserFormInDialog, b2BUser, onClose, onSave } = props

  const { publicRuntimeConfig } = getConfig()

  const classes = userFormStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const userSchema = useFormSchema()
  const userFormRadioOptions = publicRuntimeConfig.userFormRadioOptions

  const [isLoading, setLoading] = useState(false)

  const isDesktopView = !isEditMode && mdScreen
  const isDesktopEditView = isEditMode && mdScreen
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
      emailAddress,
      firstName,
      lastName,
      isActive,
      role: roles?.length ? roles[0]?.roleName : '',
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
          spacing={8}
          style={{
            marginTop: '5px',
            marginLeft: 0,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Grid
            item
            xs={12}
            md={isUserFormInDialog ? 12 : isDesktopEditView ? 3 : 3.5}
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
            md={isUserFormInDialog ? 12 : isDesktopEditView ? 1.5 : 2}
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
            md={isUserFormInDialog ? 12 : isDesktopEditView ? 1.5 : 2}
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
          <Grid item xs={12} md={isUserFormInDialog ? 12 : 2} className={classes.textBoxGridStyle}>
            <Controller
              name="role"
              control={control}
              defaultValue={getValues('role')}
              render={({ field }) => (
                <KiboRadio
                  {...field}
                  align="center"
                  onChange={(value) => field.onChange(value)}
                  title={t('role')}
                  radioOptions={userFormRadioOptions}
                  selected={getValues('role')}
                />
              )}
            />
          </Grid>
          {isEditMode && (
            <Grid
              item
              xs={12}
              md={isUserFormInDialog ? 12 : isDesktopEditView ? 1.7 : 1}
              className={classes.kiboSwitchGridStyle}
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
            md={isUserFormInDialog ? 12 : isDesktopEditView ? 1.1 : 1.4}
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
                {isDesktopEditView && !isUserFormInDialog ? <ClearIcon /> : t('cancel')}
              </LoadingButton>

              <LoadingButton
                variant="contained"
                disableElevation
                data-testid="submit-button"
                type="submit"
                loading={isLoading}
                disabled={isLoading}
              >
                {(isDesktopEditView && !isUserFormInDialog && <CheckIcon />) ||
                  (isDesktopView && t('add-user')) ||
                  t('save')}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default UserForm
