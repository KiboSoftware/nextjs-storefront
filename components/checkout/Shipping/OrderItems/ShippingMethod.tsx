import { Typography, Box, MenuItem, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboSelect from '@/components/common/KiboSelect/KiboSelect'
import { ProductItemProps } from '@/components/common/ProductItem/ProductItem'
import ProductItemList from '@/components/common/ProductItemList/ProductItemList'

import type { ShippingRate } from '@/lib/gql/types'

export type ShippingMethodProps = {
  shipItems: ProductItemProps[]
  pickupItems: ProductItemProps[]
  orderShipmentMethods: ShippingRate[]
  onShippingMethodChange: (name: string, value: string) => void
  onClickStoreLocator?: () => void
}
export type ShipItemListProps = {
  shipItems: ProductItemProps[]
  orderShipmentMethods: ShippingRate[]
  onShippingMethodChange: (name: string, value: string) => void
}
export type PickupItemListProps = {
  pickupItems: ProductItemProps[]
  onClickChangeStore?: () => void
}

const styles = {
  shippingType: {
    variant: 'subtitle1',
    component: 'span',
    fontWeight: '600',
    color: 'text.primary',
  },
}

const ShipItemList = (shipProps: ShipItemListProps) => {
  const { onShippingMethodChange, orderShipmentMethods, shipItems } = shipProps
  const { t } = useTranslation('common')

  return (
    <Box data-testid="ship-items">
      <Typography sx={styles.shippingType} px={2} data-testid="ship-title">
        {t('ship')}
      </Typography>
      <Box px={2}>
        <KiboSelect
          name="shippingMethodCode"
          onChange={onShippingMethodChange}
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
}

const PickupItemList = (pickupProps: PickupItemListProps) => {
  const { pickupItems, onClickChangeStore } = pickupProps
  const { t } = useTranslation('common')

  return (
    <Box data-testid="pickup-items">
      <Divider orientation="horizontal" flexItem />
      <Box pt={2} pb={3}>
        <Typography sx={styles.shippingType} px={2} data-testid="pickup-title">
          {t('pickup')}
        </Typography>
      </Box>
      <Box>
        <ProductItemList items={pickupItems} onClickChangeStore={onClickChangeStore} />
      </Box>
    </Box>
  )
}

const ShippingMethod = (props: ShippingMethodProps) => {
  const {
    shipItems,
    pickupItems,
    orderShipmentMethods,
    onShippingMethodChange,
    onClickStoreLocator,
  } = props

  return (
    <Box data-testid="shipping-method">
      {shipItems?.length ? (
        <ShipItemList
          onShippingMethodChange={onShippingMethodChange}
          orderShipmentMethods={orderShipmentMethods}
          shipItems={shipItems}
        />
      ) : (
        ''
      )}

      {pickupItems?.length ? (
        <PickupItemList pickupItems={pickupItems} onClickChangeStore={onClickStoreLocator} />
      ) : (
        ''
      )}
    </Box>
  )
}

export default ShippingMethod
