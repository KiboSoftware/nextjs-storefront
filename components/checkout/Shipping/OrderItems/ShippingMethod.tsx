import { useEffect, useRef, useState } from 'react'

import { Typography, Box, MenuItem, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboSelect from '@/components/common/KiboSelect/KiboSelect'
import ProductItemList from '@/components/common/ProductItemList/ProductItemList'
import { orderGetters } from '@/lib/getters'

import type { Maybe, CrOrderItem, ShippingRate } from '@/lib/gql/types'
export type ShippingMethodProps = {
  shipItems: Maybe<CrOrderItem>[]
  pickupItems: Maybe<CrOrderItem>[]
  orderShipmentMethods: ShippingRate[]
  onShippingMethodChange: (name: string, value: string) => void
  onStoreLocatorClick?: () => void
}
export type ShipItemListProps = {
  shipItems: Maybe<CrOrderItem>[]
  orderShipmentMethods: ShippingRate[]
  onShippingMethodChange: (name: string, value: string) => void
}
export type PickupItemListProps = {
  pickupItems: Maybe<CrOrderItem>[]
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
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('')
  const handleShippingMethodChange = (name: string, value: string) => {
    setSelectedShippingMethod(value)
    onShippingMethodChange(name, value)
  }
  return (
    <Box data-testid="ship-items">
      <Typography sx={styles.shippingType} px={2} data-testid="ship-title">
        {t('ship')}
      </Typography>
      <Box px={2}>
        <KiboSelect
          name="shippingMethodCode"
          onChange={handleShippingMethodChange}
          placeholder="Select Shipping Option"
          value={selectedShippingMethod}
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
  const expectedDeliveryDate = orderGetters.getExpectedDeliveryDate(pickupItems)
  const isPickupItem = pickupItems.length > 0
  return (
    <Box data-testid="pickup-items">
      <Divider orientation="horizontal" flexItem />
      <Box pt={2} pb={3}>
        <Typography sx={styles.shippingType} px={2} data-testid="pickup-title">
          {t('pickup')}
        </Typography>
      </Box>
      <Box>
        <ProductItemList
          items={pickupItems}
          isPickupItem={isPickupItem}
          expectedDeliveryDate={expectedDeliveryDate}
          onClickChangeStore={onClickChangeStore}
        />
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
    onStoreLocatorClick,
  } = props

  const shippingMethodRef = useRef()

  useEffect(() => {
    shippingMethodRef.current &&
      (shippingMethodRef.current as Element).scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <Box data-testid="shipping-method" ref={shippingMethodRef}>
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
        <PickupItemList pickupItems={pickupItems} onClickChangeStore={onStoreLocatorClick} />
      ) : (
        ''
      )}
    </Box>
  )
}
export default ShippingMethod
