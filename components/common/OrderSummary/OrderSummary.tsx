/** @format */
import { ReactNode } from 'react'

import { Card, Typography, Box, CardContent, Divider, Button, Stack } from '@mui/material'

import { OrderPriceProps } from '../OrderPrice/OrderPrice'
import DeliveryImage from '@/assets/delivery.svg'
import { KiboImage, OrderPrice } from '@/components/common'
import { AddressCard } from '@/components/common'

import type { Checkout, CrCart, CrOrder } from '@/lib/gql/types'

interface OrderSummaryProps<T extends CrCart | CrOrder | Checkout> extends OrderPriceProps<T> {
  nameLabel: string
  backLabel?: string
  checkoutLabel?: string
  shippingLabel?: string
  children?: ReactNode
  deliveryAddress?: any
  onHandleInstantDelivery?: () => void
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

const OrderSummary = <T extends CrCart | CrOrder | Checkout>(props: OrderSummaryProps<T>) => {
  const {
    nameLabel,
    subTotalLabel,
    shippingTotalLabel,
    totalLabel,
    orderDetails,
    handlingLabel,

    isShippingTaxIncluded,
    promoComponent,
    deliveryAddress,
    onHandleInstantDelivery,
  } = props

  const orderPriceProps: OrderPriceProps<T> = {
    subTotalLabel,
    shippingTotalLabel,
    totalLabel,
    handlingLabel,

    promoComponent,
    isShippingTaxIncluded,
    orderDetails,
  }
  return (
    <Card sx={{ bgcolor: 'grey.100' }}>
      <CardContent>
        <Box sx={styles.headerStyle}>
          <Typography variant="h3" color="text.primary" fontWeight="bold" pt={0.5}>
            {nameLabel}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardContent>
        {deliveryAddress && (
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                border: '1px solid #B4BAC1',
                borderRadius: '50%',
                display: 'block',
                width: '40px',
                height: '40px',
                position: 'relative',
              }}
            >
              <Box sx={{ top: '20%', left: '20%', position: 'relative' }}>
                <KiboImage src={DeliveryImage} alt={'delivery'} width={24} height={24} />
              </Box>
            </Box>
            <Box>
              <Typography>Delivery to</Typography>
              <AddressCard
                address1={deliveryAddress?.street as string}
                cityOrTown={deliveryAddress?.city as string}
                stateOrProvince={deliveryAddress?.state as string}
                postalOrZipCode={deliveryAddress?.zipcode as string}
              />
            </Box>
            <Box>
              <Button
                data-testid="change-address-button"
                variant="contained"
                onClick={onHandleInstantDelivery}
              >
                Change
              </Button>
            </Box>
          </Stack>
        )}
        <OrderPrice {...orderPriceProps} />
      </CardContent>
      <CardContent>
        <Box textAlign="center">{props.children}</Box>
      </CardContent>
    </Card>
  )
}
export default OrderSummary
