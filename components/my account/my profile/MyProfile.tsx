/** @format */

import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { KiboTextBox, PasswordValidation } from '@/components/common'
import { useTranslation } from 'next-i18next'
import { watch } from 'fs'
import { Controller, useForm } from 'react-hook-form'
import { width } from '@mui/system'
import { FormControl } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

function MyProfile() {
  const { t } = useTranslation(['checkout', 'common'])

  const [editName, setEditName] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [editPassword, setEditPassword] = useState(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    formState: { errors, isValid },
    control,
    watch,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    shouldFocusError: true,
  })
  const userEnteredPassword = watch(['password']).join('')

  const data = {
    customerName: 'james Hernandez',
    Email: 'hernandez@gmail.com',
    phoneNumber: 98656545465,
    password: 123545,
  }
  const style = {
    box1: {
      display: 'flex',
      flexDirection: 'column',
      margin: '5px',
    },
    box2: {
      display: 'flex',
      flexDirection: editName || editEmail || editPassword ? 'column' : 'row',
      margin: '5px',
      width: '500px',
      justifyContent: 'space-between',
    },
    box3: {
      display: 'flex',
      alignItems: 'end',
      cursor: 'pointer',
    },
  }

  return (
    <Box sx={{ margin: '20px' }}>
      <Typography>
        {editName || editEmail || editPassword ? 'Edit My Profile' : 'My Profile'}
      </Typography>
      <Box sx={style.box1}>
        <Box sx={style.box2}>
          <Box>
            <Typography variant="h4">
              {editName ? 'Edit Customer Name' : 'Customer Name'}
            </Typography>
            {editName ? (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <KiboTextBox
                  sx={{ height: '50px', width: '300px', margin: '5px' }}
                  id="outlined-basic"
                  label={t('first-name')}
                />
                <KiboTextBox
                  sx={{ height: '50px', width: '300px', margin: '5px' }}
                  id="outlined-basic"
                  label={t('last-name')}
                />
              </Box>
            ) : (
              <Typography>{data.customerName}</Typography>
            )}
          </Box>
          {editName ? (
            <Box
              sx={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'stretch',
                padding: '0 2%',
              }}
            >
              <Button
                sx={{ width: '100%', marginBottom: 1 }}
                onClick={() => setEditName(false)}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
              <Button sx={{ width: '100%' }} onClick={() => setEditName(false)} variant="contained">
                Save
              </Button>
            </Box>
          ) : (
            <Box sx={style.box3}>
              <Typography onClick={() => setEditName(true)}> Edit </Typography>
            </Box>
          )}
        </Box>
        <Box sx={style.box2}>
          <Box>
            <Typography>{editEmail ? 'Edit Email' : 'Email'}</Typography>
            {editEmail ? (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <KiboTextBox
                  sx={{ height: '50px', width: '300px', margin: '5px' }}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
              </Box>
            ) : (
              <Typography>{data.Email}</Typography>
            )}
          </Box>
          {editEmail ? (
            <Box
              sx={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'stretch',
                padding: '0 2%',
              }}
            >
              <Button
                sx={{ width: '100%', marginBottom: 1 }}
                onClick={() => setEditEmail(false)}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                sx={{ width: '100%' }}
                onClick={() => setEditEmail(false)}
                variant="contained"
              >
                Save
              </Button>
            </Box>
          ) : (
            <Box sx={style.box3}>
              <Typography onClick={() => setEditEmail(true)}> Edit </Typography>
            </Box>
          )}
        </Box>
        <Box sx={style.box2}>
          <Box>
            <Typography> phoneNumber</Typography>
            <Typography>{data.phoneNumber}</Typography>
          </Box>
          <Box sx={style.box3}>
            <Typography>Edit</Typography>
          </Box>
        </Box>
        <Box sx={style.box2}>
          <Box>
            <Typography>{editPassword ? 'Edit Password' : 'Password'}</Typography>
            {editPassword ? (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <FormControl sx={{ width: '100%' }}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <KiboTextBox
                        value={field.value}
                        label={t('password')}
                        required
                        sx={{ width: '100%' }}
                        onBlur={field.onBlur}
                        onChange={(_name, value) => {
                          field.onChange(value)
                        }}
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                        type={showPassword ? 'text' : 'password'}
                        icon={showPassword ? <Visibility /> : <VisibilityOff />}
                        onIconClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  />
                  <PasswordValidation password={userEnteredPassword} />
                </FormControl>
              </Box>
            ) : (
              <Typography>{data.password}</Typography>
            )}
          </Box>

          {editPassword ? (
            <Box
              sx={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'stretch',
                padding: '0 2%',
              }}
            >
              <Button
                sx={{ width: '100%', marginBottom: 1 }}
                onClick={() => setEditPassword(false)}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                sx={{ width: '100%' }}
                onClick={() => setEditPassword(false)}
                variant="contained"
              >
                Save
              </Button>
            </Box>
          ) : (
            <Box sx={style.box3}>
              <Typography onClick={() => setEditPassword(true)}> Edit </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default MyProfile
