import React, { useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { CreditCard, Help } from '@mui/icons-material'
import { styled, FormControl } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'

import KiboTextBox from '@/components/common/KiboTextBox/KiboTextBox'
import { prepareCardDataParams, validateExpiryDate, getCardType } from '@/lib/helpers/credit-card'
import type { CardForm } from '@/lib/types'

export interface CardDetailsFormProps {
  cardValue?: CardForm
  validateForm: boolean
  onSaveCardData: (cardData: CardForm) => void
  onFormStatusChange?: (status: boolean) => void
}

const StyledCardDiv = styled('div')(() => ({
  maxWidth: '26.313rem',
  paddingLeft: '0.5rem',
}))

const useCardSchema = () => {
  const { t } = useTranslation('checkout')
  return yup.object({
    cardNumber: yup.string().when('$isEdit', (isEdit, schema) => {
      if (!isEdit) {
        return schema
          .required(t('card-number-required'))
          .matches(/^\d{15,16}$/g, t('invalid-card-number'))
          .test('card-type', t('invalid-card-number'), (value: string) => getCardType(value))
      } else {
        return schema
          .required(t('card-number-required'))
          .matches(/\*{11,12}\d{4}/g, t('invalid-card-number'))
      }
    }),
    expiryDate: yup
      .string()
      .required(t('expiry-date-required'))
      .matches(/^(0?[1-9]|1[012])[/-]\d{4}$/g, t('invalid-expiry-date-format'))
      .test('expiry-date', t('invalid-expiry-date'), (value) => validateExpiryDate(value)),
    cvv: yup.string().when('$isEdit', (isEdit, schema) => {
      if (!isEdit) {
        return schema.required(t('cvv-is-required')).matches(/^\d{3,4}$/g, t('invalid-cvv'))
      }
    }),
  })
}
const CardDetailsForm = (props: CardDetailsFormProps) => {
  const { validateForm = false, onSaveCardData, onFormStatusChange, cardValue } = props
  const { t } = useTranslation('checkout')
  const cardSchema = useCardSchema()

  const {
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: cardValue ? cardValue : undefined,
    resolver: yupResolver(cardSchema),
    shouldFocusError: true,
    context: { isEdit: cardValue?.cardNumber?.includes('*') },
  })

  const onValid = async (formData: CardForm) => {
    const cardData = prepareCardDataParams(formData)
    const cardDataParams = { ...cardData, isCardDetailsValidated: isValid, isDataUpdated: true }
    onSaveCardData(cardDataParams)
  }

  useEffect(() => {
    if (onFormStatusChange) onFormStatusChange(isValid)
    if (validateForm) handleSubmit(onValid)()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, validateForm])

  return (
    <StyledCardDiv data-testid="card-details">
      <FormControl sx={{ width: '100%' }}>
        <Controller
          name="cardNumber"
          control={control}
          defaultValue={cardValue?.cardNumber}
          render={({ field }) => (
            <KiboTextBox
              value={field.value || ''}
              label={t('card-number')}
              required={true}
              onChange={(_name, value) => field.onChange(value)}
              onBlur={field.onBlur}
              error={!!errors?.cardNumber}
              helperText={errors?.cardNumber?.message as unknown as string}
              icon={<CreditCard color="disabled" />}
              {...(cardValue && { disabled: true })}
            />
          )}
        />
        <Controller
          name="expiryDate"
          control={control}
          defaultValue={cardValue?.expiryDate}
          render={({ field }) => (
            <KiboTextBox
              value={field.value || ''}
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
          defaultValue={cardValue?.cvv}
          render={({ field }) => (
            <KiboTextBox
              type="password"
              value={field.value || ''}
              label={t('security-code')}
              placeholder={t('security-code-placeholder')}
              required={true}
              onChange={(_name, value) => field.onChange(value)}
              onBlur={field.onBlur}
              error={!!errors?.cvv}
              helperText={errors?.cvv?.message as unknown as string}
              icon={<Help color="disabled" />}
              {...(cardValue && { disabled: true })}
            />
          )}
        />
      </FormControl>
    </StyledCardDiv>
  )
}

export default CardDetailsForm
