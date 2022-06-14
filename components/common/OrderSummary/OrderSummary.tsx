/** @format */

import { Info } from '@mui/icons-material'
import { Card, Typography, Box, CardContent, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

interface OrderSummaryProps {
  subTotal?: string
  orderTotal?: string
  standardShippingAmount: string
  estimatedTaxAmout: string
  numberOfItems: string
  shippingLabel: string
  backLabel: string
  checkoutLabel: string
  nameLabel: string
  cartTotalLabel: string
  standardShippingLabel: string
  estimatedTaxLabel: string
  orderTotalLabel: string
  children: any
}

const styles = {
  boxStyle: {
    lineHeight: '1.063rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerStyle: {
    lineHeight: '1.5rem',
    textAlign: 'left',
  },
}

const OrderSummary = (props: OrderSummaryProps) => {
  const {
    subTotal,
    numberOfItems,
    estimatedTaxAmout,
    standardShippingAmount,
    orderTotal,
    nameLabel,
    cartTotalLabel,
    standardShippingLabel,
    estimatedTaxLabel,
    orderTotalLabel,
  } = props

  const { t } = useTranslation('common')

  return (
    <Card sx={{ bgcolor: 'grey.100', maxWidth: '26.75rem', width: '100%' }}>
      <CardContent>
        <Box sx={styles.headerStyle}>
          <Typography variant="h3" color="text.primary" fontWeight="bold">
            {nameLabel}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardContent>
        <Box sx={styles.boxStyle}>
          <Typography variant="h5">
            {t('cart-total', { cartTotalLabel: cartTotalLabel, numberOfItems: numberOfItems })}
          </Typography>
          <Typography variant="h5">{subTotal}</Typography>
        </Box>
        <br />
        <Box sx={styles.boxStyle}>
          <Typography variant="h5">{standardShippingLabel}</Typography>
          <Typography variant="h5">{standardShippingAmount}</Typography>
        </Box>
        <br />
        <Box sx={styles.boxStyle}>
          <Typography variant="h5">
            {estimatedTaxLabel}
            <Info sx={{ fontSize: (theme: any) => theme.typography.h5 }} />
          </Typography>
          <Typography variant="h5">{estimatedTaxAmout}</Typography>
        </Box>
        <br />
        <Divider variant="middle" />

        <br />
        <Box sx={styles.boxStyle}>
          <Typography variant="h5" fontWeight="bold">
            {orderTotalLabel}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {orderTotal}
          </Typography>
        </Box>
      </CardContent>
      <CardContent>
        <Box textAlign="center">{props.children}</Box>
      </CardContent>
    </Card>
  )
}
export default OrderSummary
