import { useEffect, useRef, useState } from 'react'

import { Typography, Box, MenuItem, Divider } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboSelect, Price, ProductItemList } from '@/components/common'
import { useStoreLocationsQueries } from '@/hooks'
import { orderGetters, storeLocationGetters } from '@/lib/getters'

import type { Maybe, CrOrderItem, CrShippingRate, Location } from '@/lib/gql/types'
export type ShippingMethodProps = {
  shipItems?: Maybe<CrOrderItem>[]
  pickupItems?: Maybe<CrOrderItem>[]
  orderShipmentMethods?: Maybe<CrShippingRate>[]
  selectedShippingMethodCode?: string
  showTitle?: boolean
  onShippingMethodChange?: (value: string, name?: string) => void
  onStoreLocatorClick?: () => void
}
export type ShipItemListProps = {
  shipItems: Maybe<CrOrderItem>[]
  setSelectedShippingMethod: (shippingMethod: string) => void
  orderShipmentMethods?: Maybe<CrShippingRate>[]
  selectedShippingMethod?: string
  onShippingMethodChange?: (value: string, name?: string) => void
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
  const {
    onShippingMethodChange,
    orderShipmentMethods,
    shipItems,
    selectedShippingMethod,
    setSelectedShippingMethod,
  } = shipProps
  const { t } = useTranslation('common')

  const handleShippingMethodChange = (name: string, value: string) => {
    setSelectedShippingMethod(value)
    onShippingMethodChange && onShippingMethodChange(value, name)
  }
  return (
    <Box data-testid="ship-items">
      <Typography sx={styles.shippingType} py={2} data-testid="ship-title">
        {t('ship')}
      </Typography>
      <Box pr={2}>
        <KiboSelect
          name="shippingMethodCode"
          onChange={handleShippingMethodChange}
          placeholder="Select Shipping Option"
          value={selectedShippingMethod}
        >
          {orderShipmentMethods?.map((item) => {
            return (
              <MenuItem key={item?.shippingMethodCode} value={`${item?.shippingMethodCode}`}>
                <Price
                  variant="body2"
                  fontWeight="normal"
                  price={`${item?.shippingMethodName}` + ' ' + t('currency', { val: item?.price })}
                />
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
  const expectedDeliveryDate = orderGetters.getExpectedDeliveryDate(pickupItems as CrOrderItem[])
  const isPickupItem = pickupItems.length > 0

  const fulfillmentLocationCodes = orderGetters.getFulfillmentLocationCodes(
    pickupItems as CrOrderItem[]
  )
  const { data: locations } = useStoreLocationsQueries({ filter: fulfillmentLocationCodes })
  const storePickupAddress = storeLocationGetters.getLocations(locations)

  return (
    <Box data-testid="pickup-items">
      <Divider orientation="horizontal" flexItem />
      <Box pt={2} pb={3}>
        <Typography sx={styles.shippingType} py={2} data-testid="pickup-title">
          {t('pickup')}
        </Typography>
      </Box>
      <Box>
        <ProductItemList
          items={pickupItems}
          storePickupAddresses={storePickupAddress}
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
    showTitle = true,
    selectedShippingMethodCode,
    onShippingMethodChange,
    onStoreLocatorClick,
  } = props

  const { t } = useTranslation('common')
  const shippingMethodRef = useRef()
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(selectedShippingMethodCode)

  useEffect(() => {
    shippingMethodRef.current &&
      !selectedShippingMethodCode &&
      (shippingMethodRef.current as Element).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
  }, [selectedShippingMethodCode])

  return (
    <Box data-testid="shipping-method" ref={shippingMethodRef}>
      {showTitle && (
        <Typography variant="h2" component="h2" pt={2}>
          {t('shipping-method')}
        </Typography>
      )}
      {shipItems?.length ? (
        <ShipItemList
          {...(onShippingMethodChange && { onShippingMethodChange })}
          {...(orderShipmentMethods && { orderShipmentMethods })}
          {...(selectedShippingMethod && { selectedShippingMethod })}
          setSelectedShippingMethod={setSelectedShippingMethod}
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
