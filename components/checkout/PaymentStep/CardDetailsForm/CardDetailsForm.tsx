import React, { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import HelpIcon from '@mui/icons-material/Help'
import { styled, FormControl } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import { type Action } from '@/components/checkout'
import KiboTextBox from '@/components/common/KiboTextBox/KiboTextBox'
import {
  prepareCardDataParams,
  validateExpiryDate,
  getCardType,
} from '@/lib/components/checkout/PaymentStep/CardDetailsForm'
import { StepStates } from '@/lib/constants'

interface Card {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardType: string
  expireMonth: string
  expireYear: string
}
export interface CardData {
  card: Card
  paymentType: string
  isCardDetailsValidated: boolean
}

export interface CardDetailsFormProps {
  stepperStatus: string
  onSaveCardData: (cardData: CardData) => void
  onCompleteCallback: (action: Action) => void
}

const StyledCardDiv = styled('div')(() => ({
  width: '100%',
  maxWidth: '26.313rem',
  paddingLeft: '0.5rem',
}))

const useCardSchema = () => {
  const { t } = useTranslation('checkout')
  return yup.object({
    cardNumber: yup
      .string()
      .required(t('card-number-required'))
      .matches(/^\d{15,16}$/g, t('invalid-card-number'))
      .test('card-type', t('invalid-card-number'), (value) => getCardType(value)),
    expiryDate: yup
      .string()
      .required(t('expiry-date-required'))
      .matches(/^(0?[1-9]|1[012])[/-]\d{4}$/g, t('invalid-expiry-date-format'))
      .test('expiry-date', t('invalid-expiry-date'), (value) => validateExpiryDate(value)),
    cvv: yup
      .string()
      .required(t('cvv-is-required'))
      .matches(/^\d{3,4}$/g, t('invalid-cvv')),
  })
}
const CardDetailsForm = (props: CardDetailsFormProps) => {
  const { stepperStatus, onSaveCardData, onCompleteCallback } = props
  const { t } = useTranslation('checkout')
  const cardSchema = useCardSchema()

  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: undefined,
    resolver: yupResolver(cardSchema),
    shouldFocusError: true,
  })

  const onValid = async (formData: any) => {
    const cardData = prepareCardDataParams(formData)
    const saveCardData = { ...cardData, isCardDetailsValidated: isValid }
    onSaveCardData(saveCardData)
  }

  // form is invalid, notify parent form is incomplete
  const onInvalidForm = () => {
    onCompleteCallback({ type: StepStates.INCOMPLETE })
  }
  useEffect(() => {
    // if form is valid, onSubmit callback
    if (stepperStatus === StepStates.VALIDATE) {
      handleSubmit(onValid, onInvalidForm)()
    }
  }, [stepperStatus])

  return (
    <StyledCardDiv data-testid="card-details">
      <FormControl sx={{ width: '100%' }}>
        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => (
            <KiboTextBox
              value={field.value}
              label={t('card-number')}
              required={true}
              onChange={(_name, value) => field.onChange(value)}
              onBlur={field.onBlur}
              error={!!errors?.cardNumber}
              helperText={errors?.cardNumber?.message}
              icon={CreditCardIcon}
            />
          )}
        />
        <Controller
          name="expiryDate"
          control={control}
          render={({ field }) => (
            <KiboTextBox
              value={field.value}
              label={t('expiry-date')}
              placeholder={t('expiry-date-placeholder')}
              required={true}
              onChange={(_name, value) => field.onChange(value)}
              onBlur={field.onBlur}
              error={!!errors?.expiryDate}
              helperText={errors?.expiryDate?.message}
            />
          )}
        />
        <Controller
          name="cvv"
          control={control}
          render={({ field }) => (
            <KiboTextBox
              type="password"
              value={field.value}
              label={t('security-code')}
              placeholder={t('security-code-placeholder')}
              required={true}
              onChange={(_name, value) => field.onChange(value)}
              onBlur={field.onBlur}
              error={!!errors?.cvv}
              helperText={errors?.cvv?.message}
              icon={HelpIcon}
            />
          )}
        />
      </FormControl>
    </StyledCardDiv>
  )
}

export default CardDetailsForm
