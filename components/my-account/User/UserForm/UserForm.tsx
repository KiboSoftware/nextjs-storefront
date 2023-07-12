import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { Button, CircularProgress, Grid, useMediaQuery, useTheme } from '@mui/material'
import getConfig from 'next/config'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import userFormStyles from './UserForm.styles'
import { KiboRadio, KiboSwitch, KiboTextBox } from '@/components/common'

import { B2BUser, B2BUserInput } from '@/lib/gql/types'

interface UserFormProps {
  isEditMode: boolean
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
  const { isEditMode, b2BUser, onClose, onSave } = props

  const { publicRuntimeConfig } = getConfig()

  const classes = userFormStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const userSchema = useFormSchema()
  const userFormRadioOptions = publicRuntimeConfig.userFormRadioOptions

  const [isLoading, setLoading] = useState(false)
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
      onSave(formValues, b2BUser)
    } else {
      onSave(formValues)
    }
    setLoading(false)
    cancelAction()
  }

  if (b2BUser) {
    const { firstName, lastName, emailAddress, isActive, roles } = b2BUser
    reset({
      emailAddress,
      firstName,
      lastName,
      isActive,
      role: roles && roles.length ? roles[0]?.roleName : '',
    })
  }

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
            md={isEditMode && mdScreen ? 3 : 3.5}
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
            md={isEditMode && mdScreen ? 1.5 : 2}
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
            md={isEditMode && mdScreen ? 1.5 : 2}
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
          <Grid item xs={12} md={2} className={classes.textBoxGridStyle}>
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
              md={isEditMode && mdScreen ? 1.8 : 1}
              sx={{
                paddingTop: { sm: '0 !important', md: '50px !important' },
                paddingLeft: { xs: '0 !important' },
              }}
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
            md={isEditMode && mdScreen ? 1.3 : 2}
            className={classes.buttonGridStyle}
          >
            <Button
              variant="outlined"
              name="reset"
              type="reset"
              onClick={cancelAction}
              className={
                (isEditMode && mdScreen && classes.cancelButtonInDesktopEditMode) ||
                (!isEditMode && mdScreen && classes.cancelButtonInDesktop) ||
                classes.cancelButtonInMobile
              }
            >
              {isEditMode && mdScreen ? <ClearIcon /> : t('cancel')}
            </Button>

            <Button
              variant="contained"
              name="submit"
              disableElevation
              data-testid="submit-button"
              className={
                (isEditMode && mdScreen && classes.submitButtonInDesktopEditMode) ||
                (!isEditMode && mdScreen && classes.submitButtonInDesktop) ||
                classes.submitButtonInMobile
              }
              type="submit"
            >
              {isLoading ? (
                <CircularProgress className={classes.circularProgress} />
              ) : (
                (isEditMode && mdScreen && <CheckIcon />) ||
                (!isEditMode && mdScreen && t('add-user')) ||
                t('save')
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default UserForm
