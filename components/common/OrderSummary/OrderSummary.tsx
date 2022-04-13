/** @format */

import InfoIcon from '@mui/icons-material/Info'
import { Card, Typography, Box, Button, CardActionArea, CardContent, Divider } from '@mui/material'

interface OrderTotalProps {
  subTotal?: string
  standardShipping?: string
  estTax?: string
  orderTotal?: string
  name: string
  cartTotal: string
  fontWeight?: 'bold' | 'regular'
  boxStyle: any
  style2: any
  standardShippingAmount: string
  estTaxamt: string
  estOrderTotal: string
  checkOutButtonStyle: any
  headerStyle: any
  estStyle: any
  backButtonStyle: any
  shippingButtonStyle: any
  type: string
}

const styles = {
  boxStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: '14px',
    lineHeight: '17px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  estStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: '14px',
    lineHeight: '17px',
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
  },
  headerStyle: {
    color: ' #2B2B2B',
    fontSize: '20px',
    lineHeight: '24px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  checkOutButtonStyle: {
    borderradius: '4px',
    width: '376px',
    height: '42px',
  },
  shippingButtonStyle: {
    // backgroundcolor: "#2EA195",
    borderradius: '4px',
    margin: '10px',
    width: '376px',
    height: '42px',
  },
  backButtonStyle: {
    color: 'black',
    backgroundColor: 'white',
    borderradius: '4px',
    width: '376px',
    height: '42px',
  },
}

const OrderSummary = (props: OrderTotalProps) => {
  const {
    subTotal,
    standardShipping,
    cartTotal,
    estTax,
    orderTotal,
    name,
    standardShippingAmount,
    estTaxamt,
    estOrderTotal,
    type,
  } = props
  return (
    <>
      <Card sx={{ bgcolor: '#F7F7F7', width: '428px', height: '391px' }}>
        <CardActionArea>
          <CardContent>
            <Typography sx={styles.headerStyle}>{name}</Typography>
          </CardContent>
          <Divider />
          <CardContent>
            <Box sx={styles.boxStyle}>
              <Typography>{cartTotal}</Typography>
              <Typography> {subTotal}</Typography>
            </Box>
            <br />
            <Box sx={styles.boxStyle}>
              <Typography>{standardShipping}</Typography>
              <Typography>{standardShippingAmount}</Typography>
            </Box>
            <br />
            <Box sx={styles.boxStyle}>
              <Typography>
                {estTax} <InfoIcon sx={{ width: '11px', height: '11px' }} />{' '}
              </Typography>
              <Typography>{estTaxamt}</Typography>
            </Box>
            <br />
            <Divider variant="middle" />

            <br />
            <Box sx={styles.estStyle}>
              <Typography sx={{ fontWeight: 'Bold' }}>{estOrderTotal}</Typography>
              <Typography sx={{ fontWeight: 'Bold' }}>{orderTotal}</Typography>
            </Box>
          </CardContent>
          <CardContent>
            <Box textAlign="center">
              {type === 'orderSummary' && (
                <>
                  <Button variant="contained" sx={styles.checkOutButtonStyle}>
                    Go to Checkout
                  </Button>
                </>
              )}
              {type === 'orderShipping' && (
                <>
                  <Button variant="contained" sx={styles.shippingButtonStyle} disabled>
                    Go to Shipping
                  </Button>
                  <Button variant="contained" sx={styles.backButtonStyle}>
                    Go Back
                  </Button>
                </>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}
export default OrderSummary
