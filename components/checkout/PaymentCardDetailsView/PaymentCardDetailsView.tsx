import React from 'react'

import { Box } from '@mui/material'

import KiboRadio from '@/components/common/KiboRadio/KiboRadio'
import PaymentCard from '@/components/common/PaymentCard/PaymentCard'

interface PaymentCardDetailsViewProps {
  radioGroupTitle?: string
  withoutRadioTitle?: string
  cardLastFourDigits?: string
  expireMonth?: number
  expireYear?: number
  radio?: boolean
}

const PaymentCardDetailsView = (props: PaymentCardDetailsViewProps) => {
  const {
    radioGroupTitle,
    withoutRadioTitle,
    radio = false,
    cardLastFourDigits,
    expireMonth,
    expireYear,
  } = props

  const paymentCardProps = {
    cardLastFourDigits: cardLastFourDigits,
    expireMonth: expireMonth,
    expireYear: expireYear,
  }

  const radioOptions = [
    {
      value: cardLastFourDigits as string,
      label: <PaymentCard {...paymentCardProps} />,
    },
  ]

  const [selectedRadio, setSelectedRadio] = React.useState('')

  const handleChange = (value: string) => {
    setSelectedRadio(value)
  }

  return (
    <Box maxWidth={'fit-content'} data-testid="payment-card-details-view">
      {radio && (
        <KiboRadio
          title={radioGroupTitle}
          radioOptions={radioOptions}
          onChange={handleChange}
          selected={selectedRadio}
        />
      )}
      {!radio && <PaymentCard title={withoutRadioTitle} {...paymentCardProps} />}
    </Box>
  )
}

export default PaymentCardDetailsView
