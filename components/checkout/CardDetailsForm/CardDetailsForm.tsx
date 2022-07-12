import React, { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { CreditCard, Help } from '@mui/icons-material'
import { styled, FormControl } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import type { Action } from '@/components/checkout'
import KiboTextBox from '@/components/common/KiboTextBox/KiboTextBox'
import { FormStates } from '@/lib/constants'
import { prepareCardDataParams, validateExpiryDate, getCardType } from '@/lib/helpers/credit-card'

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
  validateForm: boolean
  onSaveCardData: (cardData: CardData) => void
  onCompleteCallback: (action: Action) => void
  setValidateForm: (isValidForm: boolean) => void
}

const StyledCardDiv = styled('div')(() => ({
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
  const { validateForm = false, onSaveCardData, onCompleteCallback, setValidateForm } = props
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
    onCompleteCallback({ type: FormStates.INCOMPLETE })
    setValidateForm(false)
  }
  useEffect(() => {
    // if form is valid, onSubmit callback
    if (validateForm) {
      handleSubmit(onValid, onInvalidForm)()
    }
  }, [validateForm])

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
              helperText={errors?.cardNumber?.message as unknown as string}
              icon={<CreditCard />}
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
              helperText={errors?.expiryDate?.message as unknown as string}
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
              helperText={errors?.cvv?.message as unknown as string}
              icon={<Help />}
            />
          )}
        />
      </FormControl>
    </StyledCardDiv>
  )
}

export default CardDetailsForm
