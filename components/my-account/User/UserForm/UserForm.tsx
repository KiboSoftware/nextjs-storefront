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
    // role: yup.string().required()
  })
}

const UserForm = (props: UserFormProps) => {
  const { isEditMode, b2BUser, onClose, onSave } = props

  const { publicRuntimeConfig } = getConfig()

  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const userSchema = useFormSchema()
  const userFormRadioOptions = publicRuntimeConfig.userFormRadioOptions

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
      onSave(formValues, b2BUser)
    } else {
      onSave(formValues)
    }
    setLoading(false)
    cancelAction()
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
        style={{
          display: 'flex',
          // paddingLeft: '16px', paddingRight: '16px'
        }}
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
            sx={{
              paddingTop: { xs: '10px !important', md: '64px' },
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '0 !important',
            }}
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
            sx={{
              paddingTop: { xs: '10px !important', md: '64px' },
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '0 !important',
            }}
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
            sx={{
              paddingTop: { xs: '10px !important', md: '64px' },
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '0 !important',
            }}
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
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              paddingTop: { xs: '10px !important', md: '64px' },
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '0 !important',
            }}
          >
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
          {isEditMode && (
            <Grid
              item
              xs={12}
              md={isEditMode && mdScreen ? 1.8 : 1}
              sx={{ paddingTop: { sm: '0 !important', md: '50px !important' } }}
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
            sx={{
              paddingTop: { xs: '10px !important', md: '64px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingLeft: '0 !important',
            }}
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
                  data-testid="submit-button"
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
                  data-testid="reset-button"
                  onClick={onClose}
                  style={{ marginRight: '8px' }}
                >
                  {t('cancel')}
                </Button>
                <Button
                  variant="contained"
                  disableElevation
                  style={{ height: '37px', width: '140px' }}
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
                <Button variant="outlined" type="reset" onClick={onClose}>
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
