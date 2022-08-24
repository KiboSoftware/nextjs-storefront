/** @format */

import React, { useEffect, useState } from 'react'

import { Password, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { Controller, useForm } from 'react-hook-form'

import { KiboTextBox ,PasswordValidation} from '@/components/common'
import { useAuthContext } from '@/context'
import { useUpateUserMutations } from '@/hooks/mutations/useProfile/useChangeCustomerData/useUpdateCustomerData'
import { useUpdateUserPasswordMutations } from '@/hooks/mutations/useProfile/useUpdateCustomerPassword/useUpdatePassword'

const MyProfile = () => {
  const { user, isAuthenticated } = useAuthContext()
  const { t } = useTranslation(['checkout', 'common'])
  const { updateUserData } = useUpateUserMutations()
  const { updateUserPasswordData } = useUpdateUserPasswordMutations()
  const [edit, setEdit] = useState(false)
  const [editName, setEditName] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [editPassword, setEditPassword] = useState(false)
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
    externalPassword: '',
  })
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

  const kiboTheme = useTheme()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('md'))

  useEffect(() => {
    if (!isAuthenticated) {
      setCurrentUser({
        id: user?.id as number,
        firstName: user?.firstName as string,
        lastName: user?.lastName as string,
        emailAddress: user?.emailAddress as string,
      })
    }
  }, [user])

  interface disable {
    forName: boolean
    forEmail: boolean
  }

  const [disableButton, setDisableButton] = useState<disable>({
    forName: true,
    forEmail: true,
  })

  useEffect(() => {
    if (
      currentUser.firstName !== user?.firstName ||
      currentUser.lastName !== user?.lastName ||
      currentUser.emailAddress !== user?.emailAddress
    ) {
      setDisableButton({ forName: false, forEmail: false })
    } else {
      setDisableButton({ forName: true, forEmail: true })
    }
  }, [currentUser])

  const {
    formState: { errors },
    control,
    watch,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    shouldFocusError: true,
  })

  const userEnteredPassword = watch(['password']).join('')

  const handleUpdatUserData = async () => {
    try {
      await updateUserData.mutateAsync({
        accountId: currentUser.id,
        customerAccountInput: {
          id: currentUser.id,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          emailAddress: currentUser.emailAddress,
        },
      })
    } catch (err) {
      console.log(err)
    } finally {
      setDisableButton({ forName: true, forEmail: true })
    }
    return setEdit(false)
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
        accountId: currentUser.id,
        passwordInfoInput: {
          oldPassword: updatedPassword.oldPassword,
          newPassword: updatedPassword.newPassword,
          externalPassword: updatedPassword.externalPassword,
        },
      })
    } catch (err) {
      console.log(err)
    }
    return setEdit(false)
  }

  return (
    <Box>
      <Box sx={style.box1} style={{ width: mobileView ? '100%' : '50%' }}>
        {edit ? (
          <>
            {editName && (
              <>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {editName ? 'Edit Customer Name' : 'Customer Name'}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue={currentUser.firstName}
                    render={({ field }) => (
                      <KiboTextBox
                        {...field}
                        value={currentUser.firstName}
                        label={t('first-name')}
                        ref={null}
                        size="small"
                        error={!!errors?.firstName}
                        helperText={errors?.firstName?.message}
                        onChange={(_name, value) =>
                          setCurrentUser({ ...currentUser, firstName: value })
                        }
                        onBlur={field.onBlur}
                        required={true}
                      />
                    )}
                  />
                  <Controller
                    name="lastNameOrSurname"
                    control={control}
                    defaultValue={currentUser.lastName}
                    render={({ field }) => (
                      <KiboTextBox
                        {...field}
                        value={currentUser.lastName}
                        label={t('last-name-or-sur-name')}
                        ref={null}
                        error={!!errors?.lastNameOrSurname}
                        helperText={errors?.lastNameOrSurname?.message}
                        onChange={(_name, value) =>
                          setCurrentUser({ ...currentUser, lastName: value })
                        }
                        onBlur={field.onBlur}
                        required={true}
                        size="small"
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    width: '50%',
                    flexDirection: 'column',
                  }}
                >
                  <Button
                    onClick={() => {
                      setEdit(false)
                      setEditName(false)
                      handleCancelUserData()
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    {t('common:cancel')}
                  </Button>
                  <Button
                    disabled={disableButton.forName}
                    onClick={() => handleUpdatUserData()}
                    variant="contained"
                  >
                    {t('common:save')}
                  </Button>
                </Box>
              </>
            )}
            {editEmail && (
              <>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {editEmail ? 'Edit Email' : 'Email'}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <KiboTextBox
                        name="email"
                        value={currentUser.emailAddress}
                        label={t('your-email')}
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
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    width: '50%',
                    flexDirection: 'column',
                  }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setEdit(false)
                      setEditEmail(false)
                      handleCancelUserData()
                    }}
                  >
                    {t('common:cancel')}
                  </Button>
                  <Button
                    disabled={disableButton.forEmail}
                    onClick={() => handleUpdatUserData()}
                    variant="contained"
                  >
                    {t('common:save')}
                  </Button>
                </Box>
              </>
            )}
            {editPassword && (
              <>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {editPassword ? 'Edit Password' : 'Password'}
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
                        label={t('password')}
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
                          setUpdatedpassword({ ...updatedPassword, externalPassword: value })
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
                  {userEnteredPassword && <PasswordValidation password={userEnteredPassword} />}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    width: '50%',
                    flexDirection: 'column',
                  }}
                >
                  <Button
                    onClick={() => {
                      setEditPassword(false)
                      setEdit(false)
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    {t('common:cancel')}
                  </Button>
                  <Button onClick={() => handleUpdatUserPassword()} variant="contained">
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
                  {currentUser.firstName + ' ' + currentUser.lastName}
                </Typography>
              </Box>

              <Box sx={style.box3}>
                <Typography
                  variant="body2"
                  onClick={() => {
                    setEdit(true)
                    setEditName(true)
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
                <Typography variant="body2">{currentUser.emailAddress}</Typography>
              </Box>
              <Box sx={style.box3}>
                <Typography
                  variant="body2"
                  onClick={() => {
                    setEditEmail(true)
                    setEdit(true)
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
                <Password fontSize='small'></Password>
              </Box>
              <Box sx={style.box3}>
                <Typography
                  variant="body2"
                  onClick={() => {
                    setEditPassword(true)
                    setEdit(true)
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
