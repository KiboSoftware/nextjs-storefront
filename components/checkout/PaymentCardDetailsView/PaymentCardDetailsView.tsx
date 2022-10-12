import React from 'react'

import { Box } from '@mui/material'

import { KiboRadio, PaymentCard } from '@/components/common'

interface PaymentCardDetailsViewProps {
  radioGroupTitle?: string
  withoutRadioTitle?: string
  cardNumberPart: string
  expireMonth: number
  expireYear: number
  cardType?: string
  radio?: boolean
  selected?: string
  onPaymentCardSelection?: (value: string) => void
}

const PaymentCardDetailsView = (props: PaymentCardDetailsViewProps) => {
  const {
    radioGroupTitle,
    withoutRadioTitle,
    radio = false,
    cardNumberPart,
    expireMonth,
    expireYear,
    cardType,
    selected = '',
    onPaymentCardSelection,
  } = props

  const paymentCardProps = {
    cardNumberPart: cardNumberPart,
    expireMonth: expireMonth,
    expireYear: expireYear,
    cardType: cardType,
  }

  const radioOptions = [
    {
      value: cardNumberPart,
      name: cardNumberPart,
      label: <PaymentCard {...paymentCardProps} />,
    },
  ]

  return (
    <Box maxWidth={'fit-content'} data-testid="payment-card-details-view">
      {radio && (
        <KiboRadio
          title={radioGroupTitle}
          radioOptions={radioOptions}
          selected={selected}
          onChange={(value) => onPaymentCardSelection && onPaymentCardSelection(value)}
        />
      )}
      {!radio && <PaymentCard title={withoutRadioTitle} {...paymentCardProps} />}
    </Box>
  )
}

export default PaymentCardDetailsView
