import React, { useState, useEffect, ChangeEvent } from 'react'

import {
  Stack,
  Checkbox,
  FormControlLabel,
  styled,
  Radio,
  FormControl,
  RadioGroup,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CardDetailsForm, type Action, type CardData } from '@/components/checkout'
import AddressForm, { Address, Contact } from '@/components/common/AddressForm/AddressForm'
import { usePaymentTypes } from '@/hooks/usePaymentTypes/usePaymentTypes'
import { StepStates } from '@/lib/constants'

import type { Order } from '@/lib/gql/types'

export interface CardPaymentDetails extends CardData {
  isSavePaymentMethod: boolean
}

interface PaymentStepProps {
  stepperStatus: string
  checkout: Order | undefined
  contact?: Contact
  isUserLoggedIn: boolean
  onCompleteCallback: (action: Action) => void
}
interface PaymentMethod {
  id: string
  name: string
}

const StyledHeadings = styled(Typography)(() => ({
  width: '100%',
  paddingLeft: '0.5rem',
  fontWeight: 'bold',
}))

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  width: '100%',
  paddingLeft: '0.5rem',
}))

const formControlLabelStyle = {
  backgroundColor: 'grey.100',
  height: '3.313rem',
  width: '100%',
  marginLeft: '0',
  marginBottom: '1.75rem',
}

const radioStyle = {
  color: 'primary',
  '& .Mui-checked': {
    color: 'primary',
  },
}

const cardPaymentData = {
  card: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardType: '',
    expireMonth: '',
    expireYear: '',
  },
  paymentType: '',
  isCardDetailsValidated: false,
  isSavePaymentMethod: false,
}

const addressData = {
  contact: {
    firstName: '',
    lastNameOrSurname: '',
    address: {
      address1: '',
      address2: '',
      cityOrTown: '',
      stateOrProvince: '',
      postalOrZipCode: '',
      countryCode: '',
    },
    phoneNumbers: {
      home: '',
    },
  },
  saveAddress: false,
}
// Component
const PaymentStep = (props: PaymentStepProps) => {
  const { isUserLoggedIn = false, stepperStatus, onCompleteCallback } = props
  const { t } = useTranslation('checkout')
  const { loadPaymentTypes } = usePaymentTypes()
  const paymentMethods = loadPaymentTypes()
  const [paymentDetails, setPaymentDetails] = useState<CardPaymentDetails>(cardPaymentData)

  const [billingAddress, setBillingAddress] = useState<Address>(addressData)

  const handleCardData = (cardData: CardData) => {
    setPaymentDetails({
      ...paymentDetails,
      ...cardData,
    })
  }

  const handleSavePaymentMethod = () => {
    setPaymentDetails({
      ...paymentDetails,
      isSavePaymentMethod: !paymentDetails.isSavePaymentMethod,
    })
  }

  const handlePaymentMethod = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails({
      ...paymentDetails,
      paymentType: event.target.value,
    })
  }

  const handleSaveAddress = (address: Address) => {
    setBillingAddress(address)
  }

  const createPaymentData = () => {
    return {
      address: { ...billingAddress?.contact },
      cardInput: { ...paymentDetails },
    }
  }

  useEffect(() => {
    if (billingAddress.contact.firstName != '' && paymentDetails.isCardDetailsValidated) {
      createPaymentData() // to be implement save payment data & billing address
      onCompleteCallback({ type: StepStates.COMPLETE })
    }
  }, [billingAddress, paymentDetails])

  return (
    <Stack>
      <StyledHeadings variant="h2" sx={{ paddingBottom: '1.625rem' }}>
        {t('payment-method')}
      </StyledHeadings>
      <FormControl>
        <RadioGroup
          aria-labelledby="payment-types-radio"
          name="radio-buttons-group"
          value={paymentDetails?.paymentType}
          onChange={handlePaymentMethod}
          data-testid="payment-types"
        >
          {paymentMethods.map((paymentMethod: PaymentMethod) => {
            return (
              <FormControlLabel
                key={paymentMethod.id}
                sx={{ ...formControlLabelStyle }}
                value={paymentMethod.id}
                control={<Radio sx={{ ...radioStyle }} />}
                label={paymentMethod.name}
              />
            )
          })}
        </RadioGroup>
      </FormControl>
      {paymentDetails?.paymentType === 'creditcard' && (
        <CardDetailsForm
          stepperStatus={stepperStatus}
          onSaveCardData={handleCardData}
          onCompleteCallback={onCompleteCallback}
        />
      )}

      {isUserLoggedIn && (
        <StyledFormControlLabel
          control={
            <Checkbox
              onChange={handleSavePaymentMethod}
              data-testid="save-payment"
              value={'save-payment'}
            />
          }
          label={`${t('save-payment-method')}`}
        />
      )}
      <StyledHeadings variant="h2" sx={{ paddingTop: '3.125rem' }}>
        {t('billing-address')}
      </StyledHeadings>
      <StyledFormControlLabel
        control={<Checkbox />}
        label={`${t('billing-address-same-as-shipping')}`}
      />
      <AddressForm
        {...props}
        saveAddressLabel={t('save-billing-address')}
        onSaveAddress={handleSaveAddress}
      />
    </Stack>
  )
}

export default PaymentStep
