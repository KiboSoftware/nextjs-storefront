import React, { useState } from 'react'

import InfoIcon from '@mui/icons-material/Info'
import {
  Typography,
  Box,
  Divider,
  Button,
  Stack,
  styled,
  useTheme,
  Theme,
  Checkbox,
  FormControlLabel,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import {
  StyledPriceSection,
  StyledPriceRow,
  StyledPriceLabel,
  StyledPriceData,
  StyledPriceTotalRow,
} from '@/components/add-to-cart-dialog/Content/Content'
import { type Action } from '@/components/checkout/DetailsStep/DetailsStep'
import ProductItemList from '@/components/common/ProductItemList/ProductItemList'
import { FormStates } from '@/lib/constants'
import { checkoutGetters } from '@/lib/getters'

import type { Order } from '@/lib/gql/types'

interface ReviewStepProps {
  stepperStatus: string
  checkout: Order
  onCompleteCallback: (action: Action) => void
  goBack: () => void
}

interface StyledButtonProps {
  theme?: Theme
}

const StyledConfirmAndPayButton = styled(Button)(({ theme }: StyledButtonProps) => ({
  height: '2.625rem',
  width: '100%',
  maxWidth: '23.5rem',
  marginBottom: '0.75rem',
  fontSize: theme?.typography.subtitle1.fontSize,
  '&:disabled': {
    backgroundColor: '#C0E3DF',
  },
}))

const StyledGoBackButton = styled(Button)(({ theme }: StyledButtonProps) => ({
  height: '2.625rem',
  width: '100%',
  maxWidth: '23.5rem',
  color: theme?.palette.grey[900],
  backgroundColor: theme?.palette.grey[50],
  borderColor: theme?.palette.grey[500],
  fontSize: theme?.typography.subtitle1.fontSize,
}))

const ReviewStep = (props: ReviewStepProps) => {
  const { checkout, stepperStatus, onCompleteCallback, goBack } = props

  const { t } = useTranslation(['checkout', 'common'])
  const theme = useTheme()

  const shippingItems = checkoutGetters.getShippingItems(checkout)
  const pickupItems = checkoutGetters.getPickupItems(checkout)
  const subTotal = checkoutGetters.getSubTotal(checkout)
  const shippingTotal = checkoutGetters.getShippingTotal(checkout)
  const tax = checkoutGetters.getTaxTotal(checkout)
  const total = checkoutGetters.getTotal(checkout)

  const [isAggreeWithTermsAndConditions, setAggreeWithTermsAndConditions] = useState<boolean>(false)

  const handleAggreeTermsConditions = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAggreeWithTermsAndConditions(event.target.checked)

  const handleComplete = () => {
    if (stepperStatus === 'VALIDATE') {
      onCompleteCallback({ type: FormStates.COMPLETE })
    }
  }

  return (
    <Box data-testid={'review-step-component'}>
      <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }} color="text.primary">
        {t('order-details')}
      </Typography>
      <Divider color={theme.palette.primary.main} sx={{ mt: '1.688rem', mb: '1.438rem' }} />
      {shippingItems && shippingItems.length > 0 && (
        <Box>
          <Typography variant="h3" component="h3" sx={{ fontWeight: 'bold' }} color="text.primary">
            {t('shipping-to-home')}
          </Typography>
          <ProductItemList items={shippingItems} />
          <Divider sx={{ mb: '1.438rem' }} />
        </Box>
      )}
      {pickupItems && pickupItems.length > 0 && (
        <Box>
          <Typography variant="h3" component="h3" sx={{ fontWeight: 'bold' }} color="text.primary">
            {t('pickup-in-store')}
          </Typography>
          <ProductItemList items={pickupItems} />
          <Divider />
        </Box>
      )}
      <StyledPriceSection data-testid={'invoice-details'}>
        <StyledPriceRow>
          <StyledPriceLabel variant="h4">{t('sub-total')}</StyledPriceLabel>
          <StyledPriceData variant="h4" fontWeight="bold">
            {t('common:currency', { val: subTotal })}
          </StyledPriceData>
        </StyledPriceRow>
        <StyledPriceRow>
          <StyledPriceLabel variant="h4">{t('common:shipping')}</StyledPriceLabel>
          <StyledPriceData variant="h4" fontWeight="bold">
            {shippingTotal}
          </StyledPriceData>
        </StyledPriceRow>
        <StyledPriceRow>
          <StyledPriceLabel variant="h4">
            {t('common:estimated-tax')} <InfoIcon sx={{ width: '0.688rem', height: '0.688rem' }} />
          </StyledPriceLabel>
          <StyledPriceData variant="h4" fontWeight="bold">
            {t('common:currency', { val: tax })}
          </StyledPriceData>
        </StyledPriceRow>
      </StyledPriceSection>
      <Divider color={theme.palette.primary.main} sx={{ mt: '1.25rem', mb: '1.375rem' }} />
      <StyledPriceTotalRow sx={{ paddingTop: 0 }}>
        <StyledPriceLabel variant="h4">{t('common:total')}</StyledPriceLabel>
        <StyledPriceData variant="h4" fontWeight="bold">
          {t('common:currency', { val: total })}
        </StyledPriceData>
      </StyledPriceTotalRow>
      <Box sx={{ mt: '31px', mb: '35px' }}>
        <FormControlLabel
          control={
            <Checkbox
              inputProps={{
                'aria-label': 'termsConditions',
              }}
              data-testid="termsConditions"
              size="medium"
              color="primary"
              onChange={handleAggreeTermsConditions}
            />
          }
          label={`${t('terms-conditions')}`}
        />
      </Box>
      <Stack alignItems="left">
        <StyledConfirmAndPayButton
          variant="contained"
          disabled={!isAggreeWithTermsAndConditions}
          onClick={handleComplete}
        >
          {t('confirm-and-pay')}
        </StyledConfirmAndPayButton>
        <StyledGoBackButton variant="contained" onClick={goBack}>
          {t('go-back')}
        </StyledGoBackButton>
      </Stack>
    </Box>
  )
}

export default ReviewStep
