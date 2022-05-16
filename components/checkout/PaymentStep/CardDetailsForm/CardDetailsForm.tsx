import React, { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import HelpIcon from '@mui/icons-material/Help'
import { styled, FormControl } from '@mui/material'
import creditCardType from 'credit-card-type'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import {
  cardData,
  getCardData,
} from '../../../../lib/components/checkout/PaymentStep/CardDetailsForm'
import KiboTextBox from '../../../common/KiboTextBox/KiboTextBox'

interface Card {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardType: string
  expireMonth: string
  expireYear: string
}
export interface CardDetailsProps {
  card: Card
  paymentType: string
  isCardDetailsValidated: boolean
}
export interface CardDetailsFormProps {
  onCardData: (cardData: CardDetailsProps) => void
}

const StyledCardDiv = styled('div')(() => ({
  width: '100%',
  maxWidth: '26.313rem',
  paddingLeft: '0.5rem',
}))

export const useCardSchema = () => {
  const { t } = useTranslation('common')
  return yup.object({
    cardNumber: yup
      .string()
      .required(t('card-number-required'))
      .matches(/^\d{15,16}$/g, t('invalid-card-number'))
      .test('card-type', t('invalid-card-number'), (value) => {
        if (value != undefined) {
          return creditCardType(value).length !== 0
        }
        return false
      }),
    expiryDate: yup
      .string()
      .required(t('expiry-date-required'))
      .matches(/^(0?[1-9]|1[012])[/-]\d{4}$/g, t('invalid-expiry-date-format'))
      .test('expiry-date', t('invalid-expiry-date'), (value) => {
        if (value != undefined) {
          const monthYear = value.split('/')
          const month = parseInt(monthYear[0])
          const year = parseInt(monthYear[1])
          const currentDate = new Date()
          const someDay = new Date()
          someDay.setFullYear(year, month, 1)
          return someDay >= currentDate
        }
        return false
      }),
    cvv: yup
      .string()
      .required(t('security-code-required'))
      .matches(/^\d{3,4}$/g, t('invalid-security-code')),
  })
}
const CardDetailsForm = (props: CardDetailsFormProps) => {
  const { onCardData } = props
  const { t } = useTranslation('common')
  const cardSchema = useCardSchema()

  const {
    getValues,
    formState: { errors, isValid },
    control,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: undefined,
    resolver: yupResolver(cardSchema),
    shouldFocusError: true,
  })

  useEffect(() => {
    let updatedCardData = cardData
    if (isValid) {
      const { cardNumber, expiryDate, cvv } = getValues()
      updatedCardData = getCardData({ cardNumber, expiryDate, cvv })
    }
    onCardData({ ...updatedCardData, isCardDetailsValidated: isValid })
  }, [isValid, errors, getValues, onCardData])

  return (
    <StyledCardDiv data-testid="card-details">
      <FormControl>
        <Controller
          name="cardNumber"
          control={control}
          render={({ field }) => (
            <KiboTextBox
              value={field.value}
              label={t('card-number')}
              required={true}
              onBlur={field.onBlur}
              onChange={(_name, value) => field.onChange(value)}
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
              onBlur={field.onBlur}
              onChange={(_name, value) => field.onChange(value)}
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
              onBlur={field.onBlur}
              onChange={(_name, value) => field.onChange(value)}
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
