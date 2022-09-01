/** @format */

import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Password, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { KiboTextBox, PasswordValidation } from '@/components/common'
import { useAuthContext } from '@/context'
import { useUpdateUserData, useUpdateUserPasswordMutations } from '@/hooks'

const style = {
  box1: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2.5,
  },
  box2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box3: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'end',
  },
}

const useCustomerDetailsSchema = () => {
  const { t } = useTranslation('checkout')
  // return yup.object().shape({
  //   email: yup.string().email().required(t('this-field-is-required')),
  //   showAccountFields: yup.boolean(),
  //   firstName: yup.string().when('showAccountFields', {
  //     is: true,
  //     then: yup.string().required(t('this-field-is-required')),
  //   }),
  //   lastNameOrSurname: yup.string().when('showAccountFields', {
  //     is: true,
  //     then: yup.string().required(t('this-field-is-required')),
  //   }),
  //   password: yup.string().when('showAccountFields', {
  //     is: true,
  //     then: yup.string().required(t('this-field-is-required')),
  //   }),
  // })

  return yup.object().shape({
    email: yup.string().email().required(t('this-field-is-required')),
    firstName: yup.string().required(t('this-field-is-required')),
    lastNameOrSurname: yup.string().required(t('this-field-is-required')),
    password: yup.string().required(t('this-field-is-required')),
  })
}
const MyProfile = () => {
  const { user, isAuthenticated } = useAuthContext()
  const { t } = useTranslation(['common', 'checkout'])
  const { updateUserData } = useUpdateUserData()
  const { updateUserPasswordData } = useUpdateUserPasswordMutations()
  const kiboTheme = useTheme()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('md'))
  const [edit, setEdit] = useState('')

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [currentUser, setCurrentUser] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    id: 0,
  })
  const [updatedPassword, setUpdatedpassword] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentUser({
        id: user?.id as number,
        firstName: user?.firstName as string,
        lastName: user?.lastName as string,
        emailAddress: user?.emailAddress as string,
      })
    }
  }, [user, isAuthenticated])

  const {
    formState: { errors, isDirty },
    control,
    reset,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(useCustomerDetailsSchema()),
    shouldFocusError: true,
  })

  const handleUpdatUserData = async () => {
    try {
      // let formData = {};
      // const form = new FormData();
      // formData = {
      //   ...formData,
      //   accountId: user?.id,
      //   customerAccountInput: {
      //     id: user?.id,
      //     firstName: firstname,
      //     lastName: lastname,
      //     emailAddress: email
      // }}
      await updateUserData.mutateAsync({
        accountId: user?.id as number,
        customerAccountInput: {
          id: user?.id as number,
          firstName: currentUser.firstName as string,
          lastName: currentUser.lastName as string,
          emailAddress: currentUser.emailAddress,
        },
      })
    } catch (err) {
      console.log(err)
    }
    return setEdit('')
  }

  const handleCancelUserData = async () => {
    setCurrentUser({
      id: user?.id as number,
      firstName: user?.firstName as string,
      lastName: user?.lastName as string,
      emailAddress: user?.emailAddress as string,
    })
  }

  const handleUpdatUserPassword = async () => {
    try {
      await updateUserPasswordData.mutateAsync({
        accountId: user?.id as number,

        passwordInfoInput: {
          oldPassword: updatedPassword.oldPassword,
          newPassword: updatedPassword.newPassword,
          externalPassword: updatedPassword.confirmNewPassword,
        },
      })
    } catch (err) {
      console.log(err)
    }
    return setEdit('')
  }

  return (
    <Box>
      <Box
        data-testid="customer-name"
        sx={style.box1}
        style={{ width: mobileView ? '100%' : '50%' }}
      >
        {edit !== '' ? (
          <>
            {edit === 'EditName' && (
              <>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {t('common:edit-customer-name')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Controller
                    name="firstName"
                    control={control}
                    // defaultValue={currentUser?.firstName}
                    render={({ field }) => (
                      <KiboTextBox
                        {...field}
                        value={currentUser.firstName}
                        label={t('checkout:first-name')}
                        ref={null}
                        size="small"
                        error={!!errors?.firstName}
                        helperText={errors?.firstName?.message}
                        onChange={(_name, value) =>
                          setCurrentUser({ ...currentUser, firstName: value })
                        }
                        onBlur={field.onBlur}
                        required
                      />
                    )}
                  />
                  <Controller
                    name="lastNameOrSurname"
                    control={control}
                    // defaultValue={user?.lastName}
                    render={({ field }) => (
                      <KiboTextBox
                        {...field}
                        value={currentUser.lastName}
                        label={t('checkout:last-name-or-sur-name')}
                        ref={null}
                        error={!!errors?.lastNameOrSurname}
                        helperText={errors?.lastNameOrSurname?.message}
                        onChange={(_name, value) =>
                          setCurrentUser({ ...currentUser, lastName: value })
                        }
                        onBlur={field.onBlur}
                        required
                        size="small"
                      />
                    )}
                  />
                </Box>
                <Box sx={style.box1} width={'50%'}>
                  <Button
                    onClick={() => {
                      setEdit('')
                      reset()
                      setCurrentUser({
                        ...currentUser,
                        firstName: user?.firstName as string,
                        lastName: user?.lastName as string,
                      })
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    {t('common:cancel')}
                  </Button>
                  <Button
                    disabled={!isDirty}
                    onClick={() => handleUpdatUserData()}
                    variant="contained"
                  >
                    {t('common:save')}
                  </Button>
                </Box>
              </>
            )}
            {edit === 'EditEmail' && (
              <>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {t('common:edit-email')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <KiboTextBox
                        name="email"
                        value={currentUser.emailAddress}
                        label={t('checkout:email')}
                        required
                        onBlur={field.onBlur}
                        onChange={(_name, value) =>
                          setCurrentUser({ ...currentUser, emailAddress: value })
                        }
                        error={!!errors?.email}
                        helperText={errors?.email?.message}
                        size="small"
                      />
                    )}
                  />
                </Box>
                <Box sx={style.box1} width={'50%'}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setEdit('')
                      handleCancelUserData()
                    }}
                  >
                    {t('common:cancel')}
                  </Button>
                  <Button
                    disabled={!isDirty}
                    onClick={() => handleUpdatUserData()}
                    variant="contained"
                  >
                    {t('common:save')}
                  </Button>
                </Box>
              </>
            )}
            {edit === 'EditPass' && (
              <>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {t('common:edit-password')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Controller
                    name="old-password"
                    control={control}
                    render={({ field }) => (
                      <KiboTextBox
                        value={field.value}
                        label={t('common:old-password')}
                        required
                        onBlur={field.onBlur}
                        onChange={(_name, value) =>
                          setUpdatedpassword({ ...updatedPassword, oldPassword: value })
                        }
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                        type={showPassword ? 'text' : 'password'}
                        icon={showPassword ? <Visibility /> : <VisibilityOff />}
                        onIconClick={() => setShowPassword(!showPassword)}
                        size="small"
                      />
                    )}
                  />
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <KiboTextBox
                        value={field.value}
                        label={t('common:new-password')}
                        required
                        onBlur={field.onBlur}
                        onChange={(_name, value) =>
                          setUpdatedpassword({ ...updatedPassword, newPassword: value })
                        }
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                        type={showPassword ? 'text' : 'password'}
                        icon={showPassword ? <Visibility /> : <VisibilityOff />}
                        onIconClick={() => setShowPassword(!showPassword)}
                        size="small"
                      />
                    )}
                  />

                  <Controller
                    name="external-password"
                    control={control}
                    render={({ field }) => (
                      <KiboTextBox
                        value={field.value}
                        label={t('common:external-password')}
                        required
                        onBlur={field.onBlur}
                        onChange={(_name, value) =>
                          setUpdatedpassword({ ...updatedPassword, confirmNewPassword: value })
                        }
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                        type={showPassword ? 'text' : 'password'}
                        icon={showPassword ? <Visibility /> : <VisibilityOff />}
                        onIconClick={() => setShowPassword(!showPassword)}
                        size="small"
                      />
                    )}
                  />
                  {updatedPassword.newPassword.length > 0 && (
                    <PasswordValidation password={updatedPassword.newPassword} />
                  )}
                </Box>
                <Box sx={style.box1} width={'50%'}>
                  <Button
                    onClick={() => {
                      setEdit('')
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    {t('common:cancel')}
                  </Button>
                  <Button
                    disabled={!isDirty}
                    onClick={() => handleUpdatUserPassword()}
                    variant="contained"
                  >
                    {t('common:save')}
                  </Button>
                </Box>
              </>
            )}
          </>
        ) : (
          <>
            <Box sx={style.box2}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {t('checkout:customer-name')}
                </Typography>
                <Typography variant="body2">
                  {currentUser?.firstName + ' ' + currentUser?.lastName}
                </Typography>
              </Box>

              <Box sx={style.box3}>
                <Typography
                  variant="body2"
                  onClick={() => {
                    setEdit('EditName')
                  }}
                  sx={{}}
                >
                  {t('common:edit')}
                </Typography>
              </Box>
            </Box>
            <Box sx={style.box2}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {t('checkout:email')}
                </Typography>
                <Typography variant="body2">{currentUser?.emailAddress}</Typography>
              </Box>
              <Box sx={style.box3}>
                <Typography
                  variant="body2"
                  onClick={() => {
                    setEdit('EditEmail')
                  }}
                >
                  {t('common:edit')}
                </Typography>
              </Box>
            </Box>
            <Box sx={style.box2}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {t('checkout:phone-number-home')}
                </Typography>
                <Typography variant="body2">(321)456 7890</Typography>
              </Box>
              <Box sx={style.box3}>
                <Typography variant="body2"> {t('common:edit')}</Typography>
              </Box>
            </Box>
            <Box sx={style.box2}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {t('checkout:password')}
                </Typography>
                <Typography variant="body2">*********</Typography>
              </Box>
              <Box sx={style.box3}>
                <Typography
                  variant="body2"
                  onClick={() => {
                    setEdit('EditPass')
                  }}
                >
                  {t('common:edit')}
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default MyProfile
