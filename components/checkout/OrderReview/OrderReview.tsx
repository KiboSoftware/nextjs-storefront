import React, { MouseEvent } from 'react'

import { Typography, Box, Divider, Link, styled, Theme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { AddressDetailsView } from '@/components/checkout'
import { checkoutGetters } from '@/lib/getters'

import type { Order } from '@/lib/gql/types'

interface OrderReviewProps {
  checkout: Order
  steps: string[]
  setActiveStep: (step: number) => void
}

const StyledOrderReview = styled(Box)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme?.palette.grey[100],
  maxWidth: '26.75rem',
  padding: '1.375rem',
}))
const StyledRow = styled(Box)(() => ({
  display: 'flex',
  marginBottom: '2.375rem',
}))
const StyledLabel = styled(Typography)(({ theme }: { theme: Theme }) => ({
  flex: '75%',
  color: theme?.palette.text.primary,
  fontWeight: 600,
}))

const StyledActions = styled(Link)(({ theme }: { theme: Theme }) => ({
  textAlign: 'right',
  flex: '25%',
  color: theme?.palette.text.primary,
  fontWeight: 600,
  fontSize: '1rem',
}))

const OrderReview = (props: OrderReviewProps) => {
  const { checkout, steps, setActiveStep } = props
  const { t } = useTranslation(['checkout', 'common'])
  const { personalDetails, shippingDetails, billingDetails, paymentMethods } =
    checkoutGetters.getCheckoutDetails(checkout)

  const { email: userName } = personalDetails
  const { shippingPhoneHome, shippingAddress } = shippingDetails
  const { billingAddress } = billingDetails

  const handleEditAction = (event: MouseEvent<HTMLElement>) => {
    const redirectStepIndex = steps.findIndex(
      (step: string) => step === event.currentTarget.getAttribute('data-step')
    )

    setActiveStep(redirectStepIndex)
  }

  return (
    <StyledOrderReview>
      <StyledRow sx={{ marginBottom: 0 }}>
        <StyledLabel variant="h2" sx={{ fontWeight: 600 }}>
          {t('order-review')}
        </StyledLabel>
      </StyledRow>
      <Divider sx={{ marginTop: '1.25rem', marginBottom: '1.813rem' }} />
      <StyledRow sx={{ marginBottom: '0.563rem' }}>
        <Typography variant="subtitle2" fontWeight={600}>
          {t('personal-details')}
        </Typography>
        <StyledActions
          data-testid={'edit-personal-details'}
          data-step={t('common:details')}
          variant="caption"
          onClick={handleEditAction}
        >
          {t('edit')}
        </StyledActions>
      </StyledRow>
      <StyledRow sx={{ display: 'inline' }}>
        <Typography variant="body1">{userName} </Typography>
        <Typography variant="body1">{shippingPhoneHome}</Typography>
      </StyledRow>

      <StyledRow sx={{ marginTop: '2.375rem' }}>
        <AddressDetailsView {...shippingAddress} withoutRadioTitle={t('shipping-details')} />
        <StyledActions
          data-testid={'edit-shipping-details'}
          data-step={t('shipping')}
          variant="caption"
          color="text.primary"
          onClick={handleEditAction}
        >
          {t('edit')}
        </StyledActions>
      </StyledRow>

      <StyledRow>
        <AddressDetailsView {...billingAddress} withoutRadioTitle={t('billing-address')} />
        <StyledActions
          data-testid={'edit-billing-address'}
          data-step={t('payment')}
          variant="caption"
          color="text.primary"
          onClick={handleEditAction}
        >
          {t('edit')}
        </StyledActions>
      </StyledRow>
      <StyledRow sx={{ marginBottom: '1rem' }}>
        <StyledLabel variant="h4">{t('payment-method')}</StyledLabel>
        <StyledActions
          data-testid={'edit-payment-method'}
          data-step={t('payment')}
          variant="caption"
          color="text.primary"
          onClick={handleEditAction}
        >
          {t('edit')}
        </StyledActions>
      </StyledRow>
      {paymentMethods.map((paymentMethod) => (
        <StyledRow
          sx={{ display: 'inline' }}
          key={`${paymentMethod.cardNumberPartOrMask}-${paymentMethod.expiry}`}
        >
          <Typography variant="body1">{paymentMethod.cardType}</Typography>
          <Typography variant="body1">{paymentMethod.cardNumberPartOrMask}</Typography>
          <Typography variant="body1">{paymentMethod.expiry} XXX</Typography>
        </StyledRow>
      ))}

      {/* tobe:  promocode component */}
    </StyledOrderReview>
  )
}

export default OrderReview
