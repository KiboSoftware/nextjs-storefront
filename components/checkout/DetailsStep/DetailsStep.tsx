/* eslint-disable  jsx-a11y/no-autofocus */
import React, { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import {
  Box,
  Stack,
  Checkbox,
  FormControl,
  FormControlLabel,
  Button,
  IconButton,
  Typography,
  Grid,
  SxProps,
} from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import KiboTextBox from '@/components/common/KiboTextBox/KiboTextBox'
import PasswordValidation from '@/components/common/PasswordValidation/PasswordValidation'
import { CheckoutDetails, useUpdateCheckout } from '@/hooks'
import { FormStates } from '@/lib/constants'
import { isPasswordValid } from '@/lib/helpers/validations/validations'

import type { Order } from '@/lib/gql/types'
import { OrderInput } from '@/lib/gql/types'

export interface PersonalDetails {
  email: string
  showAccountFields?: boolean
  firstName: string
  lastNameOrSurname: string
  password: string
}

export interface Action {
  type: FormStates.COMPLETE | FormStates.INCOMPLETE | FormStates.VALIDATE
}
interface DetailsProps {
  setAutoFocus?: boolean
  stepperStatus: string
  checkout: Order | undefined
  onCompleteCallback: (action: Action) => void
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
  const { t } = useTranslation('checkout')

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

const DetailsStep = (props: DetailsProps) => {
  const { setAutoFocus = true, stepperStatus, onCompleteCallback, checkout } = props

  const { t } = useTranslation('checkout')
  const updateCheckoutMutation = useUpdateCheckout()

  const fulfillmentInfo = checkout?.fulfillmentInfo
  const fulfillmentContact = fulfillmentInfo && fulfillmentInfo?.fulfillmentContact
  const personalDetails = {
    email: (fulfillmentContact && fulfillmentContact.email) || '',
    showAccountFields: false,
    firstName: (fulfillmentContact && fulfillmentContact.firstName) || '',
    lastNameOrSurname: (fulfillmentContact && fulfillmentContact.lastNameOrSurname) || '',
    password: '',
  }

  const {
    formState: { errors },
    handleSubmit,
    control,
    watch,
    getValues,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: personalDetails ? personalDetails : undefined,
    resolver: yupResolver(useDetailsSchema()),
    shouldFocusError: true,
  })

  const showAccountFields = watch(['showAccountFields']).join('')
  const userEnteredPassword = watch(['password']).join('')
  const isUserEnteredPasswordValid = () => {
    return showAccountFields === 'true' ? isPasswordValid(userEnteredPassword) : true
  }

  const createAccount = async (formData: PersonalDetails) => {
    console.log(`createAccount: ${JSON.stringify(formData)}`)
  }

  const updateCheckout = async (formData: PersonalDetails) => {
    const { email } = formData

    const checkoutDetails: CheckoutDetails = {
      orderId: checkout?.id as string,
      updateMode: 'ApplyToOriginal',
      orderInput: {
        ...(checkout as OrderInput),
        email,
      },
    }
    await updateCheckoutMutation.mutateAsync(checkoutDetails)
  }

  // if form is valid, onSubmit callback
  const onValid = async (formData: PersonalDetails, _e: any) => {
    try {
      await updateCheckout(formData)
      if (formData?.showAccountFields) {
        await createAccount(formData)
      }

      onCompleteCallback({
        type: isUserEnteredPasswordValid() ? FormStates.COMPLETE : FormStates.INCOMPLETE,
      })
    } catch (error) {
      onCompleteCallback({ type: FormStates.INCOMPLETE })
      console.error(error)
    }
  }

  // form is invalid, notify parent form is incomplete
  const onInvalidForm = (_errors?: any, _e?: any) => {
    onCompleteCallback({ type: FormStates.INCOMPLETE })
  }

  useEffect(() => {
    if (stepperStatus === FormStates.VALIDATE) {
      handleSubmit(onValid, onInvalidForm)()
    }
  }, [stepperStatus])

  return (
    <Stack gap={2} data-testid="checkout-details">
      <Button
        variant="contained"
        color="inherit"
        sx={{ ...buttonStyle }}
        style={{ textTransform: 'none' }}
      >
        {t('sign-into-your-account')}
      </Button>
      <br />
      {t('or-fill-the-details-below')}
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
              value={field.value}
              label={t('your-email')}
              required
              autoFocus={setAutoFocus}
              sx={{ ...commonStyle }}
              onBlur={field.onBlur}
              onChange={(_name, value) => field.onChange(value)}
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
          )}
        />
      </Box>
      <Box>{t('enjoy-these-perks-with-your-free-account')}</Box>
      <Grid container>
        <Grid item xs={12} md={4}>
          <IconButton aria-label={t('faster-checkout')}>
            <AccessTimeIcon fontSize="medium" />
          </IconButton>
          {t('faster-checkout')}
        </Grid>
        <Grid item xs={12} md={8}>
          <IconButton aria-label={t('earn-credits-with-every-purchase')}>
            <EmojiEventsIcon fontSize="medium" />
          </IconButton>
          {t('earn-credits-with-every-purchase')}
        </Grid>
        <Grid item xs={12} md={4}>
          <IconButton aria-label={t('full-rewards-program-benifits')}>
            <CardGiftcardIcon fontSize="medium" />
          </IconButton>
          {t('full-rewards-program-benifits')}
        </Grid>
        <Grid item xs={12} md={8}>
          <IconButton aria-label={t('manage-your-wishlist')}>
            <FavoriteBorderIcon fontSize="medium" />
          </IconButton>
          {t('manage-your-wishlist')}
        </Grid>
      </Grid>
      <Box>
        <FormControl>
          <Controller
            name="showAccountFields"
            control={control}
            defaultValue={personalDetails?.showAccountFields}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    inputProps={{
                      'aria-label': 'showAccountFields',
                    }}
                    data-testid="showAccountFields"
                    size="medium"
                    color="primary"
                    onChange={(_name, value) => field.onChange(value)}
                  />
                }
                label={t('i-want-to-create-an-account').toString()}
              />
            )}
          />
        </FormControl>
      </Box>
      {getValues()?.showAccountFields && (
        <FormControl>
          <Controller
            name="firstName"
            control={control}
            defaultValue={personalDetails?.firstName}
            render={({ field }) => (
              <KiboTextBox
                value={field.value}
                label={t('first-name')}
                required
                sx={{ ...commonStyle }}
                onBlur={field.onBlur}
                onChange={(_name, value) => field.onChange(value)}
                error={!!errors?.firstName}
                helperText={errors?.firstName?.message}
              />
            )}
          />
          <Controller
            name="lastNameOrSurname"
            control={control}
            defaultValue={personalDetails?.lastNameOrSurname}
            render={({ field }) => (
              <KiboTextBox
                value={field.value}
                label={t('last-name-or-sur-name')}
                required
                sx={{ ...commonStyle }}
                onBlur={field.onBlur}
                onChange={(_name, value) => field.onChange(value)}
                error={!!errors?.lastNameOrSurname}
                helperText={errors?.lastNameOrSurname?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue={personalDetails?.password}
            render={({ field }) => (
              <KiboTextBox
                value={field.value}
                label={t('password')}
                required
                sx={{ ...commonStyle }}
                onBlur={field.onBlur}
                onChange={(_name, value) => field.onChange(value)}
                error={!!errors?.password}
                helperText={errors?.password?.message}
                type="password"
                placeholder="password"
              />
            )}
          />

          <PasswordValidation password={userEnteredPassword} />
        </FormControl>
      )}
    </Stack>
  )
}

export default DetailsStep
