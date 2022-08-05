import React from 'react'

import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { AddressDetailsView, PaymentCardDetailsView } from '@/components/checkout'
import { KiboRadio } from '@/components/common'
interface PaymentAndBillingCardProps {
  id?: string
  displayRowDirection?: boolean
  displayTitle?: boolean
  cardNumberPart: string
  expireMonth: number
  expireYear: number
  address1: string
  address2?: string
  cityOrTown: string
  postalOrZipCode: string
  stateOrProvince: string
  withoutRadioPaymentTitle?: string
  withoutRadioBillingTitle?: string
}
interface SavedPaymentMethodViewProps extends PaymentAndBillingCardProps {
  radio?: boolean
  selected?: string
  onPaymentCardSelection?: (value: string) => void | null
}

const PaymentAndBilling = (props: PaymentAndBillingCardProps) => {
  const {
    cardNumberPart,
    expireMonth,
    expireYear,
    address1,
    address2,
    cityOrTown,
    postalOrZipCode,
    stateOrProvince,
    displayRowDirection,
    withoutRadioPaymentTitle,
    withoutRadioBillingTitle,
  } = props

  return (
    <Box
      width={'100%'}
      maxWidth={873}
      display="flex"
      sx={
        displayRowDirection
          ? { flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 3, md: 6 } }
          : { flexDirection: 'column', gap: 1 }
      }
    >
      <PaymentCardDetailsView
        withoutRadioTitle={withoutRadioPaymentTitle}
        cardNumberPart={cardNumberPart}
        expireMonth={expireMonth}
        expireYear={expireYear}
        onPaymentCardSelection={() => null}
      />
      <AddressDetailsView
        withoutRadioTitle={withoutRadioBillingTitle}
        address1={address1}
        address2={address2}
        cityOrTown={cityOrTown}
        stateOrProvince={postalOrZipCode}
        postalOrZipCode={stateOrProvince}
      />
    </Box>
  )
}
const SavedPaymentMethodView = (props: SavedPaymentMethodViewProps) => {
  const {
    id,
    cardNumberPart,
    expireMonth,
    expireYear,
    address1,
    address2,
    cityOrTown,
    postalOrZipCode,
    stateOrProvince,
    radio,
    displayRowDirection = true,
    selected = '',
    onPaymentCardSelection,
  } = props
  const { t } = useTranslation('checkout')

  const PaymentBillingComponent = (props: any) => {
    return (
      <PaymentAndBilling
        cardNumberPart={cardNumberPart}
        expireMonth={expireMonth}
        expireYear={expireYear}
        address1={address1}
        address2={address2}
        cityOrTown={cityOrTown}
        postalOrZipCode={postalOrZipCode}
        stateOrProvince={stateOrProvince}
        displayRowDirection={displayRowDirection}
        {...props}
      />
    )
  }
  const radioOptions = [
    {
      value: id as string,
      label: <PaymentBillingComponent />,
      name: 'payment-billing-view',
    },
  ]

  return (
    <Box maxWidth={'fit-content'} data-testid="payment-card-details-view">
      {radio && (
        <KiboRadio
          radioOptions={radioOptions}
          selected={selected}
          align={'baseline'}
          onChange={(value) => (onPaymentCardSelection ? onPaymentCardSelection(value) : null)}
        />
      )}
      {!radio && (
        <PaymentBillingComponent
          withoutRadioPaymentTitle={t('payment-method')}
          withoutRadioBillingTitle={t('billing-address')}
        />
      )}
    </Box>
  )
}
export default SavedPaymentMethodView
