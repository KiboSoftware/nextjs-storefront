import React, { useState } from 'react'

import {
  Typography,
  Box,
  Divider,
  Button,
  Stack,
  Theme,
  useTheme,
  Checkbox,
  FormControlLabel,
  SxProps,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import type { Action } from '@/components/checkout/DetailsStep/DetailsStep'
import OrderPrice from '@/components/common/OrderPrice/OrderPrice'
import type { OrderPriceProps } from '@/components/common/OrderPrice/OrderPrice'
import ProductItemList from '@/components/common/ProductItemList/ProductItemList'
import { FormStates } from '@/lib/constants'
import { checkoutGetters } from '@/lib/getters'

import type { Order } from '@/lib/gql/types'

interface ReviewStepProps {
  stepperStatus: string
  checkout: Order
  onCompleteCallback: (action: Action) => void
  onBackButtonClick: () => void
}

const buttonStyle = {
  height: '2.625rem',
  maxWidth: '23.5rem',
  fontSize: (theme: Theme) => theme.typography.subtitle1,
} as SxProps<Theme> | undefined

const styles = {
  confirmAndPayButtonStyle: {
    ...buttonStyle,
    marginBottom: '0.75rem',
    '&:disabled': {
      backgroundColor: '#C0E3DF',
    },
  },
  goBackButtonStyle: {
    ...buttonStyle,
  },
}

const ReviewStep = (props: ReviewStepProps) => {
  const { checkout, stepperStatus, onCompleteCallback, onBackButtonClick } = props

  const { t } = useTranslation(['checkout', 'common'])
  const theme = useTheme()

  const { shippingItems, pickupItems, orderSummary } = checkoutGetters.getCheckoutDetails(checkout)

  const { subTotal, shippingTotal, taxTotal, total } = orderSummary

  const orderPriceProps: OrderPriceProps = {
    subTotalLabel: t('sub-total'),
    shippingTotalLabel: t('shipping'),
    taxLabel: t('common:estimated-tax'),
    totalLabel: t('common:total'),
    subTotal: t('common:currency', { val: subTotal }),
    shippingTotal: shippingTotal ? t('currency', { val: shippingTotal }) : t('free'),
    tax: t('common:currency', { val: taxTotal }),
    total: t('common:currency', { val: total }),
  }
  const [isAgreeWithTermsAndConditions, setAggreeWithTermsAndConditions] = useState<boolean>(false)

  const handleAggreeTermsConditions = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAggreeWithTermsAndConditions(event.target.checked)

  const handleComplete = () => {
    if (stepperStatus === FormStates.VALIDATE) {
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
          <Divider sx={{ mt: '1.438rem', mb: '1.188rem' }} />
        </Box>
      )}
      <OrderPrice {...orderPriceProps} />
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
        <Button
          variant="contained"
          color="primary"
          sx={{
            ...styles.confirmAndPayButtonStyle,
          }}
          disabled={!isAgreeWithTermsAndConditions}
          onClick={handleComplete}
        >
          {t('confirm-and-pay')}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            ...styles.goBackButtonStyle,
          }}
          onClick={onBackButtonClick}
        >
          {t('go-back')}
        </Button>
      </Stack>
    </Box>
  )
}

export default ReviewStep
