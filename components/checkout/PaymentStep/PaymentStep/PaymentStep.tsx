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

import { usePaymentTypes } from '../../../../hooks/usePaymentTypes/usePaymentTypes'
import { Action } from '../../DetailsStep/DetailsStep'
import CardDetailsForm, {
  CardDetailsProps,
} from '@/components/checkout/PaymentStep/CardDetailsForm/CardDetailsForm'
import AddressForm, { Address, Contact } from '@/components/common/AddressForm/AddressForm'

import type { Order } from '@/lib/gql/types'

export interface CardPaymentDetails extends CardDetailsProps {
  isSavePaymentMethod: boolean
}

interface PaymentStepProps {
  setAutoFocus?: boolean
  stepperStatus: string
  checkout: Order | undefined
  onCompleteCallback: (action: Action) => void
  contact?: Contact
  countries: string[]
  isUserLoggedIn: boolean
  saveAddressLabel?: string
  onSaveAddress: (data: Address) => void
  onSaveCardPayment: (data: CardPaymentDetails) => void
}
interface PaymentTypeProps {
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

// Component
const PaymentStep = (props: PaymentStepProps) => {
  const { isUserLoggedIn = false, onCompleteCallback } = props
  const { t } = useTranslation('checkout')
  const { loadPaymentTypes } = usePaymentTypes()
  const paymentMethods = loadPaymentTypes()
  const [paymentDetails, setPaymentDetails] = useState({
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
  })

  const [billingAddress, setBillingAddress] = useState({
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
  })

  const handleCardData = (cardData: CardDetailsProps) => {
    setPaymentDetails(Object.assign(paymentDetails, cardData))
  }

  const handleSavePaymentMethod = () => {
    setPaymentDetails(
      Object.assign(paymentDetails, { isSavePaymentMethod: !paymentDetails.isSavePaymentMethod })
    )
  }

  const handlePaymentMethod = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails({
      ...paymentDetails,
      ['paymentType']: event.target.value,
    })
  }

  const handleSaveAddress = (addressData: Address) => {
    setBillingAddress(addressData)
  }

  const createPaymentData = () => {
    return {
      address: { ...billingAddress?.contact },
      cardInput: { ...paymentDetails },
    }
  }

  useEffect(() => {
    if (billingAddress.contact.firstName != '' && paymentDetails.isCardDetailsValidated) {
      createPaymentData()
      onCompleteCallback({ type: 'COMPLETE' })
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
          {paymentMethods.map((paymentMethod: PaymentTypeProps) => {
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
        <CardDetailsForm {...props} onSaveCardData={handleCardData} />
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
      <StyledFormControlLabel control={<Checkbox />} label={`${t('copy-shipping-address')}`} />
      <AddressForm {...props} onSaveAddress={handleSaveAddress} />
    </Stack>
  )
}

export default PaymentStep
