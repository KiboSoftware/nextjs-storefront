/* eslint-disable  jsx-a11y/no-autofocus */
import React, { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { AccessTime, CardGiftcard, EmojiEvents, FavoriteBorder } from '@mui/icons-material'
import { Box, Stack, Button, IconButton, Typography, Grid, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { KiboTextBox } from '@/components/common'
import { LoginDialog } from '@/components/layout'
import { useAuthContext, useCheckoutStepContext, STEP_STATUS, useModalContext } from '@/context'
import type { PersonalDetails } from '@/lib/types'

import type { Maybe, CrOrder, Checkout } from '@/lib/gql/types'

interface DetailsProps<T> {
  setAutoFocus?: boolean
  checkout: T
  updateCheckoutPersonalInfo: (params: { email: Maybe<string> | undefined }) => Promise<void>
}

const commonStyle = {
  width: '100%',
  maxWidth: '421px',
}

const buttonStyle = {
  ...commonStyle,
  height: '42px',
  fontSize: (theme: Theme) => theme.typography.subtitle1,
} as SxProps<Theme> | undefined

const useDetailsSchema = () => {
  const { t } = useTranslation('common')

  return yup.object().shape({
    email: yup.string().email().required(t('this-field-is-required')),
    showAccountFields: yup.boolean(),
    firstName: yup.string().when('showAccountFields', {
      is: true,
      then: yup.string().required(t('this-field-is-required')),
    }),
    lastNameOrSurname: yup.string().when('showAccountFields', {
      is: true,
      then: yup.string().required(t('this-field-is-required')),
    }),
    password: yup.string().when('showAccountFields', {
      is: true,
      then: yup.string().required(t('this-field-is-required')),
    }),
  })
}

const DetailsStep = <T extends CrOrder | Checkout>(props: DetailsProps<T>) => {
  const { setAutoFocus = true, checkout, updateCheckoutPersonalInfo } = props

  const { t } = useTranslation('common')

  const { isAuthenticated, setAuthError } = useAuthContext()
  const { showModal } = useModalContext()
  const {
    stepStatus,
    setStepNext,
    setStepStatusValid,
    setStepStatusComplete,
    setStepStatusIncomplete,
  } = useCheckoutStepContext()

  const personalDetails = {
    email: checkout && checkout.email,
  }

  const openLoginModal = () => {
    setAuthError('')
    if (!isAuthenticated) showModal({ Component: LoginDialog })
  }

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
    reset,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: personalDetails ? { ...personalDetails, email: checkout?.email } : undefined,
    resolver: yupResolver(useDetailsSchema()),
    shouldFocusError: true,
  })

  const onValid = async (formData: PersonalDetails) => {
    try {
      await updateCheckoutPersonalInfo(formData)
      setStepStatusComplete()
      setStepNext()
    } catch (error) {
      setStepStatusIncomplete()
      console.error(error)
    }
  }

  const onInvalidForm = (_errors?: any, _e?: any) => {
    setStepStatusIncomplete()
  }

  useEffect(() => {
    if (stepStatus === STEP_STATUS.SUBMIT) {
      handleSubmit(onValid, onInvalidForm)()
    }
  }, [stepStatus])

  useEffect(() => {
    reset({ ...personalDetails })
  }, [checkout])

  useEffect(() => {
    isValid ? setStepStatusValid() : setStepStatusIncomplete()
  }, [isValid])

  return (
    <Stack gap={2} data-testid="checkout-details">
      {!isAuthenticated && (
        <div>
          <Button
            variant="contained"
            color="inherit"
            sx={{ ...buttonStyle }}
            style={{ textTransform: 'none' }}
            onClick={openLoginModal}
          >
            {t('sign-into-your-account')}
          </Button>
          <br />
          {t('or-fill-the-details-below')}
        </div>
      )}

      <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
        {t('personal-details')}
      </Typography>

      <Box>
        <Controller
          name="email"
          control={control}
          defaultValue={personalDetails?.email}
          render={({ field }) => (
            <KiboTextBox
              name="email"
              value={field.value || ''}
              label={t('your-email')}
              required
              autoFocus={setAutoFocus}
              sx={{ ...commonStyle }}
              onBlur={field.onBlur}
              onChange={(_name, value) => field.onChange(value)}
              error={!!errors?.email}
              helperText={errors?.email?.message as string}
            />
          )}
        />
      </Box>

      <Stack gap={2}>
        {t('enjoy-these-perks-with-your-free-account')}

        <Grid container>
          <Grid item xs={12}>
            <IconButton aria-label={t('faster-checkout')}>
              <AccessTime fontSize="medium" />
            </IconButton>
            {t('faster-checkout')}
          </Grid>
          <Grid item xs={12}>
            <IconButton aria-label={t('earn-credits-with-every-purchase')}>
              <EmojiEvents fontSize="medium" />
            </IconButton>
            {t('earn-credits-with-every-purchase')}
          </Grid>
          <Grid item xs={12}>
            <IconButton aria-label={t('full-rewards-program-benifits')}>
              <CardGiftcard fontSize="medium" />
            </IconButton>
            {t('full-rewards-program-benifits')}
          </Grid>
          <Grid item xs={12}>
            <IconButton aria-label={t('manage-your-wishlist')}>
              <FavoriteBorder fontSize="medium" />
            </IconButton>
            {t('manage-your-wishlist')}
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  )
}

export default DetailsStep
