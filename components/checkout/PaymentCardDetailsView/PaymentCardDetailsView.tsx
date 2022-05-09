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
  const radioOptions = [
    {
      value: cardLastFourDigits as string,
      label: (
        <PaymentCard
          cardLastFourDigits={cardLastFourDigits}
          expireMonth={expireMonth}
          expireYear={expireYear}
          radio={radio}
        />
      ),
    },
  ]

  const [selectedRadio, setSelectedRadio] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio((event.target as HTMLInputElement).value)
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
      {!radio && (
        <PaymentCard
          title={withoutRadioTitle}
          radio={radio}
          cardLastFourDigits={cardLastFourDigits}
          expireMonth={expireMonth}
          expireYear={expireYear}
        />
      )}
    </Box>
  )
}

export default PaymentCardDetailsView
