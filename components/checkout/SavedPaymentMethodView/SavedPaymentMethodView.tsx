import React from 'react'

import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { AddressDetailsView, PaymentCardDetailsView } from '@/components/checkout'
import { orderGetters } from '@/lib/getters'

import type { Maybe, PaymentCard, CrAddress } from '@/lib/gql/types'

interface SavedPaymentMethodViewProps {
  card: Maybe<PaymentCard> | undefined
  billingAddress: Maybe<CrAddress> | undefined
}

const SavedPaymentMethodView = (props: SavedPaymentMethodViewProps) => {
  const { t } = useTranslation('checkout')
  const { card, billingAddress } = props
  const cardDetails = orderGetters.getCardPaymentDetails(card)

  return (
    <Box
      width={'100%'}
      maxWidth={873}
      display="flex"
      sx={{ flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 3, md: 6 } }}
      pt={2}
    >
      <PaymentCardDetailsView
        withoutRadioTitle={t('payment-method')}
        cardLastFourDigits={cardDetails.cardLastFourDigits}
        expireMonth={cardDetails.expireMonth}
        expireYear={cardDetails.expireYear}
      />
      <AddressDetailsView
        withoutRadioTitle={t('billing-address')}
        address2={billingAddress?.address2 as string}
        address1={billingAddress?.address1 as string}
        cityOrTown={billingAddress?.cityOrTown as string}
        stateOrProvince={billingAddress?.postalOrZipCode as string}
        postalOrZipCode={billingAddress?.stateOrProvince as string}
      />
    </Box>
  )
}

export default SavedPaymentMethodView
