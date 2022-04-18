/** @format */

import InfoIcon from '@mui/icons-material/Info'
import { Card, Typography, Box, Button, CardActionArea, CardContent, Divider } from '@mui/material'

import theme, { grey } from '../../../styles/theme'

interface OrderTotalProps {
  subTotal?: string
  orderTotal?: string
  standardShippingAmount: string
  estimatedTaxAmout: string
  type: string
  numberOfItems: string
}

const styles = {
  boxStyle: {
    lineHeight: '1.063rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerStyle: {
    color: theme.palette.text.primary,
    lineHeight: '	1.5rem',
    textAlign: 'left',
  },
  checkOutButtonStyle: {
    borderradius: '0.25rem',
    width: '376px',
    height: '42px',
  },
  shippingButtonStyle: {
    borderradius: '0.25rem',
    margin: '10px',
    width: '376px',
    height: '42px',
  },
  backButtonStyle: {
    color: 'black',
    backgroundColor: 'white',
    borderradius: '0.25rem',
    width: '376px',
    height: '42px',
  },
}

const OrderSummary = (props: OrderTotalProps) => {
  const { subTotal, numberOfItems, estimatedTaxAmout, standardShippingAmount, orderTotal, type } =
    props
  const SHIPPING = 'Go to Shipping'
  const BACK = 'Go Back'
  const CHECKOUT = 'Go to Checkout'
  const NAME = 'Order Summary'
  const CART_TOTAL = 'Cart Subtotal'
  const STANDARD_SHIPPING = 'Standard Shipping'
  const ESTIMATED_TAX = 'Tax'
  const ORDER_TOTAL = 'Order Total'

  return (
    <Card sx={{ bgcolor: grey[100], width: '26.75rem' }}>
      <CardActionArea>
        <CardContent>
          <Box sx={styles.headerStyle}>
            <Typography sx={{ fontSize: theme.typography.h3, fontWeight: 'Bold' }}>
              {NAME}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardContent>
          <Box sx={styles.boxStyle}>
            <Typography sx={{ fontSize: theme.typography.h5 }}>
              {CART_TOTAL} of ({numberOfItems})
            </Typography>
            <Typography sx={{ fontSize: theme.typography.h5 }}> {subTotal}</Typography>
          </Box>
          <br />
          <Box sx={styles.boxStyle}>
            <Typography sx={{ fontSize: theme.typography.h5 }}>{STANDARD_SHIPPING}</Typography>
            <Typography sx={{ fontSize: theme.typography.h5 }}>{standardShippingAmount}</Typography>
          </Box>
          <br />
          <Box sx={styles.boxStyle}>
            <Typography sx={{ fontSize: theme.typography.h5 }}>
              {ESTIMATED_TAX}
              <InfoIcon sx={{ width: '0.6875rem', height: '0.6875rem' }} />
            </Typography>
            <Typography sx={{ fontSize: theme.typography.h5 }}>{estimatedTaxAmout}</Typography>
          </Box>
          <br />
          <Divider variant="middle" />

          <br />
          <Box sx={styles.boxStyle}>
            <Typography sx={{ fontSize: theme.typography.h5, fontWeight: 'Bold' }}>
              {ORDER_TOTAL}
            </Typography>
            <Typography sx={{ fontSize: theme.typography.h5, fontWeight: 'Bold' }}>
              {orderTotal}
            </Typography>
          </Box>
        </CardContent>
        <CardContent>
          <Box textAlign="center">
            <Button
              variant="contained"
              sx={
                type === 'orderShipping' ? styles.shippingButtonStyle : styles.checkOutButtonStyle
              }
              disabled={type === 'orderShipping' ? true : false}
            >
              {type === 'orderShipping' ? SHIPPING : CHECKOUT}
            </Button>
            {type === 'orderShipping' && (
              <Button variant="contained" sx={styles.backButtonStyle}>
                {BACK}
              </Button>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default OrderSummary
