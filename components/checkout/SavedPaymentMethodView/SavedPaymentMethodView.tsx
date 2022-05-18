import React from 'react'

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { AddressDetailsView, PaymentCardDetailsView } from '@/components/checkout'

import { Card, CrAddress } from '@/lib/gql/types'

interface SavedPaymentMethodViewProps {
  customerAccountCards: Card
  billingAddress: CrAddress
}

const SavedPaymentMethodView = (props: SavedPaymentMethodViewProps) => {
  const { t } = useTranslation('checkout')
  const { customerAccountCards, billingAddress } = props

  //   Should be fetched from Getters
  const cardNumberLength = customerAccountCards.cardNumberPart?.length as number
  const cardLastFourDigits = customerAccountCards.cardNumberPart?.slice(
    cardNumberLength - 4,
    cardNumberLength
  )
  const expireMonth = customerAccountCards.expireMonth as number
  const expireYear = customerAccountCards.expireYear as number

  const streetAddress = billingAddress.address1 as string
  const apartment = billingAddress.address2 as string
  const city = billingAddress.cityOrTown as string
  const state = billingAddress.stateOrProvince as string
  const zipCode = billingAddress.postalOrZipCode as string

  return (
    <Box width={'100%'} maxWidth={873}>
      <Typography variant="h3" fontWeight={'bold'}>
        {t('payment-information')}
      </Typography>
      <Box display="flex" gap={6} pt={2}>
        <PaymentCardDetailsView
          withoutRadioTitle={t('payment-method')}
          cardLastFourDigits={cardLastFourDigits}
          expireMonth={expireMonth}
          expireYear={expireYear}
        />
        <AddressDetailsView
          withoutRadioTitle={t('billing-address')}
          address2={apartment}
          address1={streetAddress}
          cityOrTown={city}
          stateOrProvince={zipCode}
          postalOrZipCode={state}
        />
      </Box>
    </Box>
  )
}

export default SavedPaymentMethodView
