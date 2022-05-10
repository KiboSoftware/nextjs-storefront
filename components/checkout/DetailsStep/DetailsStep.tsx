/* eslint-disable  jsx-a11y/no-autofocus */
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  ElementRef,
  useEffect,
  useState,
} from 'react'

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

export interface PersonalDetails {
  email: string
  showAccountFields?: boolean
  firstName: string
  lastNameOrSurname: string
  password: string
}
interface DetailsProps {
  setAutoFocus?: boolean
  personalDetails: PersonalDetails
  onPersonalDetailsSave: (personalDetails: PersonalDetails) => void
}

interface DetailsHandler {
  validateForm: () => void
}

type PasswordValidationHandler = ElementRef<typeof PasswordValidation>

const commonStyle = {
  width: '100%',
  maxWidth: '421px',
}

const buttonStyle = {
  ...commonStyle,
  height: '42px',
  fontSize: (theme: Theme) => theme.typography.subtitle1,
} as SxProps<Theme> | undefined

const DetailsStep = forwardRef<DetailsHandler, DetailsProps>((props, ref) => {
  const { setAutoFocus = true, personalDetails, onPersonalDetailsSave } = props
  const passwordValidationRef = useRef<PasswordValidationHandler | null>(null)
  const [isGoToShippingClicked, setIsGoToShippingClicked] = useState<boolean>(false)

  const { t } = useTranslation('checkout')

  const schema = yup.object().shape({
    email: yup.string().email().required('This field is required'),
    showAccountFields: yup.boolean(),
    firstName: yup.string().when('showAccountFields', {
      is: true,
      then: yup.string().required('This field is required'),
    }),
    lastNameOrSurname: yup.string().when('showAccountFields', {
      is: true,
      then: yup.string().required('This field is required'),
    }),
    password: yup.string().when('showAccountFields', {
      is: true,
      then: yup.string().required('This field is required'),
    }),
  })

  const {
    getValues,
    formState: { errors, isValid },
    trigger,
    control,
    watch,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: personalDetails ? personalDetails : undefined,
    resolver: yupResolver(schema),
    shouldFocusError: true,
  })

  const useEnteredPassword = watch(['password']).join('')
  const showAccountFields = watch(['showAccountFields']).join('')

  useImperativeHandle(ref, () => ({
    validateForm,
  }))

  const isPasswordValid = (): boolean =>
    showAccountFields === 'true'
      ? (passwordValidationRef.current?.validatePassword() as boolean)
      : true

  const isFormValid = (): boolean => isValid

  const saveData = () => {
    console.log(`isFormValid: ${isFormValid()}, isPasswordValid: ${isPasswordValid()}`)
    if (isFormValid() && isPasswordValid()) {
      const { email, firstName, lastNameOrSurname, password } = getValues()
      onPersonalDetailsSave({
        email: email,
        firstName: firstName || '',
        lastNameOrSurname: lastNameOrSurname || '',
        password: password || '',
      })
    }
  }

  const validateForm = async () => {
    setIsGoToShippingClicked(true)
    await trigger()
  }

  useEffect(() => {
    if (isGoToShippingClicked) saveData()
  }, [errors, isValid])

  return (
    <Stack gap={2} data-testid="checkout-details">
      <form>
        <Button
          variant="contained"
          color="primary"
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
                />
              )}
            />

            <PasswordValidation ref={passwordValidationRef} password={useEnteredPassword} />
          </FormControl>
        )}
      </form>
    </Stack>
  )
})

export default DetailsStep
DetailsStep.displayName = 'DetailsStep'
