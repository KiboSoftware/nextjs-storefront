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
}
interface SavedPaymentMethodViewProps extends PaymentAndBillingCardProps {
  radio?: boolean
  selected?: string
  onPaymentCardSelection?: (value: string) => void | null
}

const PaymentAndBilling = (props: PaymentAndBillingCardProps) => {
  const { t } = useTranslation('checkout')
  const {
    cardNumberPart,
    expireMonth,
    expireYear,
    address1,
    address2,
    cityOrTown,
    postalOrZipCode,
    stateOrProvince,
    displayTitle,
    displayRowDirection,
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
        withoutRadioTitle={displayTitle ? t('payment-method') : ''}
        cardNumberPart={cardNumberPart as string}
        expireMonth={expireMonth as number}
        expireYear={expireYear as number}
        onPaymentCardSelection={() => null}
      />
      <AddressDetailsView
        withoutRadioTitle={displayTitle ? t('billing-address') : ''}
        address1={address1 as string}
        address2={address2 as string}
        cityOrTown={cityOrTown as string}
        stateOrProvince={postalOrZipCode as string}
        postalOrZipCode={stateOrProvince as string}
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
    displayTitle = true,
    selected = '',
    onPaymentCardSelection,
  } = props

  const PaymentBillingComponent = () => {
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
        displayTitle={displayTitle}
      />
    )
  }
  const radioOptions = [
    {
      value: id as string,
      label: <PaymentBillingComponent />,
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
      {!radio && <PaymentBillingComponent />}
    </Box>
  )
}
export default SavedPaymentMethodView
