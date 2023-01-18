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
import { useStoreLocationsQueries } from '@/hooks'
import { checkoutGetters, orderGetters } from '@/lib/getters'
import { storeLocationGetters } from '@/lib/getters/storeLocationGetters'

import type { CrOrder, Maybe, Location, CustomerContact, Checkout } from '@/lib/gql/types'

interface OrderReviewProps {
  checkout: CrOrder | Checkout
  isMultiShipEnabled?: boolean
}

interface OrderInfoHeaderProps {
  headerName: string
  dataStep: string
  handleEditAction: (event: MouseEvent<HTMLElement>) => void
  children: React.ReactNode
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

const StyledActions = styled(Link)(({ theme }: { theme: Theme }) => ({
  textAlign: 'right',
  flex: '25%',
  color: theme?.palette.text.primary,
  fontSize: theme?.typography.body1.fontSize,
}))

const OrderInfoHeader = (props: OrderInfoHeaderProps) => {
  const { headerName, dataStep, handleEditAction, children } = props
  const { t } = useTranslation('common')

  return (
    <Stack pb={2}>
      <Box display="flex">
        <Typography variant="subtitle2" fontWeight={600}>
          {headerName}
        </Typography>
        <StyledActions
          data-step={dataStep}
          variant="caption"
          color="text.primary"
          onClick={handleEditAction}
        >
          <Typography sx={{ cursor: 'pointer' }} component="span" fontWeight={600}>
            {t('edit')}
          </Typography>
        </StyledActions>
      </Box>

      {children}
    </Stack>
  )
}

const OrderReview = (props: OrderReviewProps) => {
  const { checkout, isMultiShipEnabled } = props

  const { steps, setActiveStep } = useCheckoutStepContext()
  const { t } = useTranslation('common')

  const { personalDetails, shippingDetails, billingDetails, paymentMethods, pickupItems } =
    orderGetters.getCheckoutDetails(checkout as CrOrder) // TODO: change orderGetters type and remove checkoutGetters.getCheckoutDetails

  const fulfillmentLocationCodes = pickupItems
    .map((pickupItem) => `code eq ${pickupItem?.fulfillmentLocationCode}`)
    .join(' or ')

  const { data: locations } = useStoreLocationsQueries({ filter: fulfillmentLocationCodes })
  const storeLocations = storeLocationGetters.getLocations(locations as Maybe<Location>[])

  const { email: userName } = personalDetails
  const { shippingPhoneHome, shippingAddress } = shippingDetails
  const { billingAddress } = billingDetails

  const shippingPersonalDetails = {
    firstName: shippingDetails?.firstName,
    lastNameOrSurname: shippingDetails?.lastNameOrSurname,
  }

  const billingPersonalDetails = {
    firstName: billingDetails?.firstName,
    lastNameOrSurname: billingDetails?.lastNameOrSurname,
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

  const multiShippingAddressesList = checkoutGetters.getOrderAddresses(
    checkout as Checkout
  ) as CustomerContact[]

  return (
    <Accordion
      data-testid="accordion"
      onChange={handleAccordionChange}
      disableGutters
      sx={{ ...style.accordion }}
      defaultExpanded={true}
    >
      <AccordionSummary
        data-testid="accordion-summery"
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

      <AccordionDetails data-testid="accordion-details" sx={{ ...style.accordionDetails }}>
        <Divider sx={{ marginX: '20px' }} />
        <StyledOrderReview>
          <OrderInfoHeader
            headerName={t('personal-details')}
            dataStep={t('details')}
            handleEditAction={handleEditAction}
          >
            <Box display={'inline'} pt={1}>
              <Typography variant="body1">{userName} </Typography>
              <Typography variant="body1">{shippingPhoneHome}</Typography>
            </Box>
          </OrderInfoHeader>

          <OrderInfoHeader
            headerName={t('shipping-details')}
            dataStep={t('shipping')}
            handleEditAction={handleEditAction}
          >
            {!isMultiShipEnabled && (
              <AddressDetailsView
                {...shippingPersonalDetails}
                address1={shippingAddress?.address1 as string}
                address2={shippingAddress?.address2 as string}
                cityOrTown={shippingAddress?.cityOrTown as string}
                stateOrProvince={shippingAddress?.stateOrProvince as string}
                postalOrZipCode={shippingAddress?.postalOrZipCode as string}
              />
            )}

            {isMultiShipEnabled &&
              multiShippingAddressesList &&
              multiShippingAddressesList.length > 0 && (
                <Box sx={{ flexWrap: 'wrap', flexDirection: 'column', marginBottom: '0rem' }}>
                  {multiShippingAddressesList?.map((multiAddress: CustomerContact) => {
                    return (
                      <Box key={multiAddress?.id}>
                        <AddressDetailsView
                          firstName={multiAddress?.firstName as string}
                          lastNameOrSurname={multiAddress?.lastNameOrSurname as string}
                          address1={multiAddress?.address?.address1 as string}
                          address2={multiAddress?.address?.address2 as string}
                          cityOrTown={multiAddress?.address?.cityOrTown as string}
                          stateOrProvince={multiAddress?.address?.stateOrProvince as string}
                          postalOrZipCode={multiAddress?.address?.postalOrZipCode as string}
                        />
                      </Box>
                    )
                  })}
                </Box>
              )}
          </OrderInfoHeader>

          <OrderInfoHeader
            headerName={t('billing-address')}
            dataStep={t('payment')}
            handleEditAction={handleEditAction}
          >
            <>
              <AddressDetailsView
                {...billingPersonalDetails}
                address1={billingAddress?.address1 as string}
                address2={billingAddress?.address2 as string}
                cityOrTown={billingAddress?.cityOrTown as string}
                stateOrProvince={billingAddress?.stateOrProvince as string}
                postalOrZipCode={billingAddress?.postalOrZipCode as string}
              />

              <Stack sx={{ marginBottom: '1rem' }}>
                {storeLocations?.map((storeLocation) => (
                  <Stack direction="column" sx={{ marginBottom: '20px' }} key={storeLocation?.code}>
                    <AddressDetailsView
                      firstName={storeLocation?.name}
                      address1={storeLocation?.address1}
                      address2={storeLocation?.address2}
                      cityOrTown={storeLocation?.city}
                      postalOrZipCode={storeLocation?.zip}
                      stateOrProvince={storeLocation?.state}
                      withoutRadioTitle={t('store-pickup-details')}
                    />
                  </Stack>
                ))}
              </Stack>
            </>
          </OrderInfoHeader>

          <OrderInfoHeader
            headerName={t('payment-method')}
            dataStep={t('payment')}
            handleEditAction={handleEditAction}
          >
            {paymentMethods?.map((paymentMethod) => (
              <Box
                display="inline"
                pt={1}
                key={`${paymentMethod?.cardNumberPartOrMask}-${paymentMethod?.expiry}`}
              >
                <Typography variant="body1">{paymentMethod?.cardType}</Typography>
                <Typography variant="body1">{paymentMethod?.cardNumberPartOrMask}</Typography>
                <Typography variant="body1">{paymentMethod?.expiry} XXX</Typography>
              </Box>
            ))}
          </OrderInfoHeader>

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
