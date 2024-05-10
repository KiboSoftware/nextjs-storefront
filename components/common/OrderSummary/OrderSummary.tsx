/** @format */
import { ReactNode } from 'react'

import { Card, Typography, Box, CardContent, Divider, Button, Stack } from '@mui/material'
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next'

import { OrderPriceProps } from '../OrderPrice/OrderPrice'
import { KiboImage, OrderPrice } from '@/components/common'
import { AddressCard } from '@/components/common'
import Clock from '@/public/clock-thin.svg'
import DeliveryImage from '@/public/delivery.svg'

import type { Checkout, CrCart, CrOrder } from '@/lib/gql/types'
interface OrderSummaryProps<T extends CrCart | CrOrder | Checkout> extends OrderPriceProps<T> {
  nameLabel: string
  backLabel?: string
  checkoutLabel?: string
  shippingLabel?: string
  children?: ReactNode
  deliveryAddressDateAndWindow?: any
  isCart?: boolean
  onHandleInstantDelivery?: (deliveryAddressDateAndWindow: any) => void
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
    deliveryAddressDateAndWindow,
    isCart,
    onHandleInstantDelivery,
  } = props
  const { t } = useTranslation('common')

  const orderPriceProps: OrderPriceProps<T> = {
    subTotalLabel,
    shippingTotalLabel,
    totalLabel,
    handlingLabel,

    promoComponent,
    isShippingTaxIncluded,
    orderDetails,
    isCart,
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
        {deliveryAddressDateAndWindow?.deliveryAddress && (
          <Stack
            direction="row"
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '1rem',
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
                marginRight: '0.5rem',
              }}
            >
              <Box sx={{ top: '20%', left: '20%', position: 'relative' }}>
                <KiboImage src={DeliveryImage} alt={'delivery'} width={24} height={24} />
              </Box>
            </Box>
            <Box>
              <Typography>{t('delivery-to')}</Typography>
              <AddressCard
                address1={deliveryAddressDateAndWindow?.deliveryAddress?.street as string}
                cityOrTown={deliveryAddressDateAndWindow?.deliveryAddress?.city as string}
                stateOrProvince={deliveryAddressDateAndWindow?.deliveryAddress?.state as string}
                postalOrZipCode={deliveryAddressDateAndWindow?.deliveryAddress?.zipcode as string}
              />
            </Box>
            <Box sx={{ marginLeft: 'auto' }}>
              <Button
                data-testid="change-address-button"
                variant="contained"
                onClick={() =>
                  onHandleInstantDelivery && onHandleInstantDelivery(deliveryAddressDateAndWindow)
                }
              >
                {t('change')}
              </Button>
            </Box>
          </Stack>
        )}
        {deliveryAddressDateAndWindow?.deliveryDateAndWindow && (
          <Stack direction="row" sx={{ backgroundColor: 'white', padding: '1rem' }} mt={2}>
            <Box mr={1}>
              <KiboImage src={Clock} alt={'delivery'} width={24} height={24} />
            </Box>
            <Stack>
              <Typography fontWeight="bold">{t('delivery-time')}</Typography>
              <Typography>
                {format(
                  new Date(deliveryAddressDateAndWindow?.deliveryDateAndWindow?.confirmedDate),
                  'EEEE, MMMM dd, yyyy'
                )}
              </Typography>
              <Typography>
                {deliveryAddressDateAndWindow?.deliveryDateAndWindow?.confirmedWindow?.readable}
              </Typography>
              <Typography
                variant="caption"
                onClick={() =>
                  onHandleInstantDelivery && onHandleInstantDelivery(deliveryAddressDateAndWindow)
                }
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}
              >
                {t('change-delivery-time')}
              </Typography>
            </Stack>
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
