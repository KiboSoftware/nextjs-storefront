/** @format */

import InfoIcon from '@mui/icons-material/Info'
import { Card, Typography, Box, CardActionArea, CardContent, Divider } from '@mui/material'

interface OrderTotalProps {
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
    lineHeight: '	1.5rem',
    textAlign: 'left',
  },
}

const OrderSummary = (props: OrderTotalProps) => {
  const {
    subTotal,
    numberOfItems,
    estimatedTaxAmout,
    standardShippingAmount,
    orderTotal,
    nameLabel,
    cartTotalLabel,
    standardShippingLabel,
    estimatedTaxLabel: estimatedTaxLabel,
    orderTotalLabel: orderTotalLabel,
  } = props

  return (
    <Card sx={{ bgcolor: 'grey.100', maxWidth: '26.75rem', width: '100%' }}>
      <CardActionArea>
        <CardContent>
          <Box sx={styles.headerStyle}>
            <Typography
              sx={{
                fontSize: (theme: any) => theme.typography.h3,
                color: (theme: any) => theme.palette.text.primary,
                fontWeight: 'Bold',
              }}
            >
              {nameLabel}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardContent>
          <Box sx={styles.boxStyle}>
            <Typography sx={{ fontSize: (theme: any) => theme.typography.h5 }}>
              {cartTotalLabel} of ({numberOfItems})
            </Typography>
            <Typography sx={{ fontSize: (theme: any) => theme.typography.h5 }}>
              {' '}
              {subTotal}
            </Typography>
          </Box>
          <br />
          <Box sx={styles.boxStyle}>
            <Typography sx={{ fontSize: (theme: any) => theme.typography.h5 }}>
              {standardShippingLabel}
            </Typography>
            <Typography sx={{ fontSize: (theme: any) => theme.typography.h5 }}>
              {standardShippingAmount}
            </Typography>
          </Box>
          <br />
          <Box sx={styles.boxStyle}>
            <Typography sx={{ fontSize: (theme: any) => theme.typography.h5 }}>
              {estimatedTaxLabel}
              <InfoIcon sx={{ width: '0.6875rem', height: '0.6875rem' }} />
            </Typography>
            <Typography sx={{ fontSize: (theme: any) => theme.typography.h5 }}>
              {estimatedTaxAmout}
            </Typography>
          </Box>
          <br />
          <Divider variant="middle" />

          <br />
          <Box sx={styles.boxStyle}>
            <Typography sx={{ fontSize: (theme: any) => theme.typography.h5, fontWeight: 'Bold' }}>
              {orderTotalLabel}
            </Typography>
            <Typography sx={{ fontSize: (theme: any) => theme.typography.h5, fontWeight: 'Bold' }}>
              {orderTotal}
            </Typography>
          </Box>
        </CardContent>
        <CardContent>
          <Box textAlign="center">{props.children}</Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default OrderSummary
