import React, { useEffect, useState } from 'react'

import { Stack, Divider, Box, Typography } from '@mui/material'

import { AddressCard, ProductItem } from '..'
import {
  FulfillmentOptions as FulfillmentOptionsConstant,
  EDDFulfillmentOptions,
} from '@/lib/constants'
import { addressGetters, orderGetters, productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import { formatEDDMessage } from '@/lib/helpers/formatEddMessage'
import { getClosestEDDSuggestion } from '@/lib/helpers/getClosestEddSuggestion'
import { getEDDSuggestion } from '@/lib/helpers/getEDDSuggestions'
import type { LocationCustom } from '@/lib/types'

import type { Maybe, CrOrderItem, CrAddress, CrProduct, CrOrder } from '@/lib/gql/types'

export type ProductItemListProps = {
  items: Maybe<CrOrderItem>[]
  showEdd?: boolean
  expectedDeliveryDate?: string
  isPickupItem?: boolean
  showAddress?: boolean
  storePickupAddresses?: LocationCustom[]
  width?: string
  testId?: string
  showChangeStoreLink?: boolean
  order?: CrOrder
  onClickChangeStore?: () => void
}

const ProductItemList = (props: ProductItemListProps) => {
  const {
    items,
    order,
    showEdd = false,
    expectedDeliveryDate,
    isPickupItem = false,
    showAddress = false,
    storePickupAddresses = [],
    width,
    testId = 'product-item-stack',
    showChangeStoreLink = true,
    onClickChangeStore,
  } = props

  const storePickupAddress = (fulfillmentLocationCode: string): CrAddress => {
    return addressGetters.getStorePickupAddress(storePickupAddresses, fulfillmentLocationCode)
  }

  const getPurchaseLocation = (item: Maybe<CrOrderItem>) => {
    return (
      // we can use fulfillmentLocationCode or purchase location
      orderGetters.getPurchaseLocation(item as CrOrderItem) ||
      storePickupAddresses?.find((store) => store.code === item?.fulfillmentLocationCode)?.name
    )
  }

  const { getProductLink } = uiHelpers()

  const Component = showEdd ? EDDWrapper : React.Fragment

  return (
    <Stack direction="column" divider={<Divider orientation="horizontal" flexItem />} spacing={2}>
      {items?.map((each: Maybe<CrOrderItem>) => {
        const item = each as CrOrderItem
        const product = item?.product as CrProduct
        return (
          <Stack key={item?.id} data-testid={testId}>
            <Component {...(showEdd && { order, item: item, showEdd })}>
              <ProductItem
                id={orderGetters.getCartItemId(item as CrOrderItem)}
                qty={orderGetters.getProductQuantity(item as CrOrderItem)}
                purchaseLocation={getPurchaseLocation(item)}
                link={getProductLink(productGetters.getProductId(item?.product as CrProduct))}
                productCode={productGetters.getProductId(product)}
                image={productGetters.getProductImage(product)}
                name={productGetters.getName(product)}
                options={productGetters.getOptions(product)}
                price={productGetters.getPrice(product).regular?.toString()}
                salePrice={productGetters.getPrice(product).special?.toString()}
                isPickupItem={isPickupItem}
                expectedDeliveryDate={expectedDeliveryDate}
                showChangeStoreLink={showChangeStoreLink}
                onStoreLocatorClick={onClickChangeStore}
                data-testid="product-item"
                width={width}
                discounts={item?.productDiscounts}
              ></ProductItem>
            </Component>
            {showAddress && item?.fulfillmentLocationCode && (
              <AddressCard {...storePickupAddress(item?.fulfillmentLocationCode)} />
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}

export default ProductItemList

const EddOrderTypeMap = {
  [FulfillmentOptionsConstant.SHIP]: EDDFulfillmentOptions.Ship,
  [FulfillmentOptionsConstant.DELIVERY]: EDDFulfillmentOptions.Delivery,
  [FulfillmentOptionsConstant.PICKUP]: EDDFulfillmentOptions.Pickup,
} as any

const EDDWrapper = (props: {
  order?: CrOrder
  item?: CrOrderItem
  showEdd?: boolean
  children: any
}) => {
  const { order, item, showEdd, children } = props

  const eddZipCode = orderGetters.getShippingAddress(order as CrOrder).postalOrZipCode

  const [eddMessage, setEddMessage] = useState<string>('')

  useEffect(() => {
    let isComponentUnmounted = false

    showEdd && getEDDSuggestions()

    return () => {
      isComponentUnmounted = true
    }
  }, [eddZipCode, showEdd])

  if (!showEdd) {
    return null
  }

  const buildEDDSuggestionParams = (zipCode: string) => {
    return {
      eddItems: [
        {
          orderItemID: 1,
          quantity: item?.quantity,
          upc: item?.product?.variationProductCode || item?.product?.productCode,
          productUsage: item?.product?.productUsage,
          dimensionUnit: 'CM', //|| item?.product?.measurements?.length?.unit,
          weightUnit: 'GRAMS', //|| item?.product?.measurements?.weight?.unit,
          length: item?.product?.measurements?.length?.value,
          weight: item?.product?.measurements?.weight?.value,
          width: item?.product?.measurements?.width?.value,
          height: item?.product?.measurements?.height?.value,
        },
      ],
      shippingAddress: {
        postalCode: zipCode,
        countryCode: 'US',
      },
      orderType: EddOrderTypeMap[item?.fulfillmentMethod as string],
      total: order?.total,
      orderID: order?.orderNumber,
    }
  }

  const getEDDSuggestions = async () => {
    const response: any = await getEDDSuggestion(buildEDDSuggestionParams(eddZipCode as string))
    if (
      response?.eddAssignments &&
      response?.eddAssignments?.length > 0 &&
      response?.eddAssignments[0]?.estimatedDeliveryDates?.length > 0
    ) {
      const edd = getClosestEDDSuggestion(response?.eddAssignments[0]?.estimatedDeliveryDates)
      setEddMessage(
        formatEDDMessage({
          eddISO: edd.estimatedDeliveryDate,
          cutoffDate: edd.orderCutoffDate,
          mode: EddOrderTypeMap[item?.fulfillmentMethod as string],
          isOrderPlaced: true,
        })
      )
    } else {
      setEddMessage('Delivery estimate not available at the moment.')
    }
  }

  return (
    <Box>
      {children}
      <Box py={1}>
        <Typography variant="body2" color="text.secondary">
          {eddMessage}
        </Typography>
      </Box>
    </Box>
  )
}
