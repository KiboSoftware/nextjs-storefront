import { Box } from '@mui/material'

import { AddressCard, PaymentCard } from '@/components/common'

interface PaymentBillingCardProps {
  cardNumberPart: string
  expireMonth: number
  expireYear: number
  cardType?: string
  address1: string
  address2?: string
  cityOrTown: string
  postalOrZipCode: string
  stateOrProvince: string
  firstName?: string
  lastNameOrSurname?: string
}

const PaymentBillingCard = (props: PaymentBillingCardProps) => {
  const {
    cardNumberPart,
    expireMonth,
    expireYear,
    cardType,
    address1,
    address2,
    cityOrTown,
    postalOrZipCode,
    stateOrProvince,
    firstName,
    lastNameOrSurname,
  } = props

  return (
    <Box
      width={'100%'}
      maxWidth={873}
      display="flex"
      sx={{
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <PaymentCard
        cardNumberPart={cardNumberPart}
        expireMonth={expireMonth}
        expireYear={expireYear}
        cardType={cardType}
        // onPaymentCardSelection={() => null}
      />

      <AddressCard
        firstName={firstName}
        lastNameOrSurname={lastNameOrSurname}
        address1={address1}
        address2={address2}
        cityOrTown={cityOrTown}
        stateOrProvince={postalOrZipCode}
        postalOrZipCode={stateOrProvince}
      />
    </Box>
  )
}
export default PaymentBillingCard
