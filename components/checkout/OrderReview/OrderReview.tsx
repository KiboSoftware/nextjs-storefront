import React, { MouseEvent } from 'react'

import { ExpandMore } from '@mui/icons-material'
import {
  Typography,
  Box,
  Divider,
  Link,
  styled,
  Theme,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { AddressDetailsView, PromoCodeBadge } from '@/components/common'
import { useCheckoutStepContext } from '@/context'
import { useStoreLocations } from '@/hooks'
import { checkoutGetters } from '@/lib/getters'
import { storeLocationGetters } from '@/lib/getters/storeLocationGetters'

import type { Order, Maybe, Location } from '@/lib/gql/types'

interface OrderReviewProps {
  checkout: Order
}

const style = {
  accordion: {
    ':before': {
      backgroundColor: 'transparent',
    },
    boxShadow: 0,
    borderRadius: 0,
  },

  accordionDetails: {
    p: 0,
  },
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
  const { checkout } = props

  const { steps, setActiveStep } = useCheckoutStepContext()
  const { t } = useTranslation('checkout')

  const { personalDetails, shippingDetails, billingDetails, paymentMethods, pickupItems } =
    checkoutGetters.getCheckoutDetails(checkout)

  const fulfillmentLocationCodes = pickupItems
    .map((pickupItem) => `code eq ${pickupItem?.fulfillmentLocationCode}`)
    .join(' or ')

  const { data: locations } = useStoreLocations({ filter: fulfillmentLocationCodes })
  const storeLocations = storeLocationGetters.getLocations(locations as Maybe<Location>[])

  const { email: userName } = personalDetails
  const { shippingPhoneHome, shippingAddress } = shippingDetails
  const { billingAddress } = billingDetails

  const shippingPersonalDetails = {
    firstName: shippingDetails.firstName,
    middleNameOrInitial: shippingDetails.middleNameOrInitial,
    lastNameOrSurname: shippingDetails.lastNameOrSurname,
  }

  const billingPersonalDetails = {
    firstName: billingDetails.firstName,
    middleNameOrInitial: billingDetails.middleNameOrInitial,
    lastNameOrSurname: billingDetails.lastNameOrSurname,
  }

  const handleEditAction = (event: MouseEvent<HTMLElement>) => {
    const redirectStepIndex = steps.findIndex(
      (step: string) => step === event.currentTarget.getAttribute('data-step')
    )
    setActiveStep(redirectStepIndex)
  }

  const handleAccordionChange = (
    _event: React.SyntheticEvent<Element, Event>,
    expanded: boolean
  ) => {
    if (!expanded) return
  }

  return (
    <Accordion
      data-testid="accordian"
      onChange={handleAccordionChange}
      disableGutters
      sx={{ ...style.accordion }}
      defaultExpanded={true}
    >
      <AccordionSummary
        data-testid="accordian-summery"
        expandIcon={<ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={(theme) => ({
          backgroundColor: theme?.palette.grey[100],
          paddingLeft: '20px',
          paddingY: '5px',
        })}
      >
        <Typography variant="h2" fontWeight={600}>
          {t('order-review')}
        </Typography>
      </AccordionSummary>

      <AccordionDetails data-testid="accordian-details" sx={{ ...style.accordionDetails }}>
        <Divider sx={{ marginX: '20px' }} />
        <StyledOrderReview>
          <StyledRow sx={{ marginBottom: '0.563rem' }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {t('personal-details')}
            </Typography>
            <StyledActions
              data-testid={'edit-personal-details'}
              data-step={t('details')}
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
            <AddressDetailsView
              {...shippingPersonalDetails}
              address1={shippingAddress.address1 as string}
              address2={shippingAddress.address2 as string}
              withoutRadioTitle={t('shipping-details')}
            />
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
            <AddressDetailsView
              {...billingPersonalDetails}
              address1={billingAddress.address1 as string}
              address2={billingAddress.address2 as string}
              withoutRadioTitle={t('billing-address')}
            />
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

          <Stack sx={{ marginBottom: '1rem' }}>
            {storeLocations.map((storeLocation) => (
              <Stack direction="column" sx={{ marginBottom: '20px' }} key={storeLocation.code}>
                <AddressDetailsView
                  firstName={storeLocation.name}
                  address1={storeLocation.address1}
                  address2={storeLocation.address2}
                  cityOrTown={storeLocation.city}
                  postalOrZipCode={storeLocation.zip}
                  stateOrProvince={storeLocation.state}
                  withoutRadioTitle={t('store-pickup-details')}
                />
              </Stack>
            ))}
          </Stack>

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

          <Divider sx={{ marginTop: '1.25rem', marginBottom: '1.813rem' }} />
          <PromoCodeBadge
            onApplyCouponCode={() => ''}
            onRemoveCouponCode={() => ''}
            promoList={[]}
            promoError={false}
          />
        </StyledOrderReview>
      </AccordionDetails>
    </Accordion>
  )
}

export default OrderReview
