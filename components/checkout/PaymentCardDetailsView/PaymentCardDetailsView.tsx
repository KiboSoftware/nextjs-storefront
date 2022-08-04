import React from 'react'

import { Box } from '@mui/material'

import KiboRadio from '@/components/common/KiboRadio/KiboRadio'
import PaymentCard from '@/components/common/PaymentCard/PaymentCard'

interface PaymentCardDetailsViewProps {
  radioGroupTitle?: string
  withoutRadioTitle?: string
  cardNumberPart: string
  expireMonth: number
  expireYear: number
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
    selected = '',
    onPaymentCardSelection,
  } = props

  const paymentCardProps = {
    cardNumberPart: cardNumberPart as string,
    expireMonth: expireMonth as number,
    expireYear: expireYear as number,
  }

  const radioOptions = [
    {
      value: cardNumberPart as string,
      name: cardNumberPart as string,
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
