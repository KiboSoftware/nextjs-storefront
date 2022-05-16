import React, { useState, useRef, ElementRef, ChangeEvent } from 'react'

import {
  Stack,
  Checkbox,
  FormControlLabel,
  styled,
  Button,
  Radio,
  FormControl,
  RadioGroup,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { usePaymentTypes } from '../../../../hooks/usePaymentTypes'
import CardDetailsForm, {
  CardDetailsProps,
} from '@/components/checkout/PaymentStep/CardDetailsForm/CardDetailsForm'
import AddressForm, { Address, Contact } from '@/components/common/AddressForm/AddressForm'

export interface CardPaymentDetails extends CardDetailsProps {
  isSavePaymentMethod: boolean
}
interface PaymentStepProps {
  contact?: Contact
  countries: string[]
  isUserLoggedIn: boolean
  saveAddressLabel?: string
  onSave: (data: Address) => void
  onSaveCardPayment: (data: CardPaymentDetails) => void
}

const StyledHeadings = styled('h2')(() => ({
  width: '100%',
  paddingLeft: '0.5rem',
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
  const { isUserLoggedIn = false, onSaveCardPayment } = props
  const { t } = useTranslation('common')
  const { loadPaymentTypes } = usePaymentTypes()
  const paymentMethods = loadPaymentTypes()
  type AddressFormHanlder = ElementRef<typeof AddressForm>
  const addressRef = useRef<AddressFormHanlder | null>(null)

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

  const handleCardData = (cardData: CardDetailsProps) => {
    setPaymentDetails(Object.assign(paymentDetails, cardData))
  }

  const handleSavePaymentMethod = () => {
    setPaymentDetails(
      Object.assign(paymentDetails, { isSavePaymentMethod: !paymentDetails.isSavePaymentMethod })
    )
  }

  const handleSavePayment = () => {
    addressRef.current && addressRef.current.listener()
    onSaveCardPayment(paymentDetails)
  }

  const handlePaymentMethod = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails({
      ...paymentDetails,
      ['paymentType']: event.target.value,
    })
  }

  return (
    <Stack>
      <StyledHeadings>{t('payment-method')}</StyledHeadings>

      <FormControl>
        <RadioGroup
          aria-labelledby="payment-types-radio"
          name="radio-buttons-group"
          value={paymentDetails?.paymentType}
          onChange={handlePaymentMethod}
          data-testid="payment-types"
        >
          {paymentMethods.map((paymentMethod) => {
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
        <CardDetailsForm onCardData={handleCardData} />
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
      <StyledHeadings>{t('billing-address')}</StyledHeadings>
      <StyledFormControlLabel control={<Checkbox />} label={`${t('copy-shipping-address')}`} />
      <AddressForm {...props} ref={addressRef} />
      <Button variant="contained" onClick={handleSavePayment}>
        Save
      </Button>
    </Stack>
  )
}

export default PaymentStep
