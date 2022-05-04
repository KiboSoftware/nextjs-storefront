import { ReactNode } from 'react'

import { Typography, Box, MenuItem, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboSelect from '@/components/common/KiboSelect/KiboSelect'
import ProductItemList from '@/components/common/ProductItemList/ProductItemList'

import type { CrProductOption, ShippingRate } from '@/lib/gql/types'

interface ProductItemProps {
  image: string
  name: string
  options: CrProductOption[]
  price?: string
  salePrice?: string
  children?: ReactNode
}

export type ShippingMethodProps = {
  shipItems: ProductItemProps[]
  pickupItems: ProductItemProps[]
  orderShipmentMethods: ShippingRate[]
  onChange: (name: string, value: string) => void
}

const ShippingMethod = (props: ShippingMethodProps) => {
  const { shipItems, pickupItems, orderShipmentMethods, onChange } = props
  const { t } = useTranslation('common')

  const styles = {
    shippingType: {
      variant: 'subtitle1',
      component: 'span',
      fontWeight: '600',
      color: 'text.primary',
    },
  }

  const ShipItemList = () => (
    <Box data-testid="ship-items">
      <Typography sx={styles.shippingType} px={2} data-testid="ship-title">
        {t('ship')}
      </Typography>
      <Box px={2}>
        <KiboSelect
          name="shippingMethodCode"
          onChange={onChange}
          placeholder="Select Shipping Option"
        >
          {orderShipmentMethods?.map((item: ShippingRate) => {
            return (
              <MenuItem key={item.shippingMethodCode} value={`${item.shippingMethodCode}`}>
                {`${item.shippingMethodName} $${item.price}`}
              </MenuItem>
            )
          })}
        </KiboSelect>
      </Box>
      <Box pt={3}>
        <ProductItemList items={shipItems} />
      </Box>
    </Box>
  )

  const PickupItemList = () => (
    <Box data-testid="pickup-items">
      <Divider orientation="horizontal" flexItem />
      <Box pt={2} pb={3}>
        <Typography sx={styles.shippingType} px={2} data-testid="pickup-title">
          {t('pickup')}
        </Typography>
      </Box>
      <Box>
        <ProductItemList items={pickupItems} />
      </Box>
    </Box>
  )

  // shipping to Home and pick up in store
  return (
    <Box data-testid="shipping-method">
      {shipItems?.length ? <ShipItemList /> : ''}

      {pickupItems?.length ? <PickupItemList /> : ''}
    </Box>
  )
}

export default ShippingMethod
