/** @format */

import InfoIcon from '@mui/icons-material/Info'
import { Card, Typography, Box, CardActionArea, CardContent, Divider } from '@mui/material'

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

  const Typo = ({ props }: any) => {
    return (
      <>
        <Typography sx={{ fontSize: (theme: any) => theme.typography.h5 }}>{props}</Typography>
      </>
    )
  }
  return (
    <Card sx={{ bgcolor: 'grey.100', maxWidth: '26.75rem', width: '100%' }}>
      <CardActionArea>
        <CardContent>
          <Box sx={styles.headerStyle}>
            <Typography
              sx={{
                fontSize: (theme: any) => theme.typography.h3,
                color: 'text.primary',
                fontWeight: 'bold',
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
            <Typo props={subTotal} />
          </Box>
          <br />
          <Box sx={styles.boxStyle}>
            <Typo props={standardShippingLabel} />
            <Typo props={standardShippingAmount} />
          </Box>
          <br />
          <Box sx={styles.boxStyle}>
            <Typography sx={{ fontSize: (theme: any) => theme.typography.h5 }}>
              {estimatedTaxLabel}
              <InfoIcon sx={{ fontSize: (theme: any) => theme.typography.h5 }} />
            </Typography>
            <Typo props={estimatedTaxAmout} />
          </Box>
          <br />
          <Divider variant="middle" />

          <br />
          <Box sx={styles.boxStyle}>
            <Typography sx={{ fontSize: (theme: any) => theme.typography.h5, fontWeight: 'bold' }}>
              {orderTotalLabel}
            </Typography>
            <Typography sx={{ fontSize: (theme: any) => theme.typography.h5, fontWeight: 'bold' }}>
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
