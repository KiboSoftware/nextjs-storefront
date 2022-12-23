import React from 'react'

import { Stack, Divider, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ProductItem } from '..'
// Need to be handled with API later
import { userAddressResponse } from '@/__mocks__/stories/userAddressMock'
import { orderGetters, productGetters } from '@/lib/getters'

import type { Maybe, CrOrderItem, CrProduct, CustomerContact } from '@/lib/gql/types'

export type ReviewProductItemsWithAddressesProps = {
  items: Maybe<CrOrderItem>[]
  expectedDeliveryDate?: string
}

const ReviewProductItemsWithAddresses = (props: ReviewProductItemsWithAddressesProps) => {
  const { items, expectedDeliveryDate } = props

  const { t } = useTranslation('common')

  const userShippingAddresses = userAddressResponse?.items as CustomerContact[]

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
      data-testid="product-item-stack-multi-ship"
    >
      {items?.map((item: Maybe<CrOrderItem>, index) => {
        const product = item?.product as CrProduct
        return (
          <>
            <Typography variant="h4" component="h4" fontWeight={'bold'} color="text.primary">
              {t('ship-to')}
              {':'}
              <Typography
                variant="h4"
                component="span"
                color="text.primary"
                sx={{ textTransform: 'capitalize' }}
              >
                {' '}
                {userShippingAddresses[index]?.address?.address1},{' '}
                {userShippingAddresses[index]?.address?.address2},{' '}
                {userShippingAddresses[index]?.address?.cityOrTown},{' '}
                {userShippingAddresses[index]?.address?.stateOrProvince},{' '}
                {userShippingAddresses[index]?.address?.postalOrZipCode},{' '}
                {userShippingAddresses[index]?.address?.countryCode}
              </Typography>
            </Typography>

            <Typography
              variant="h4"
              component="h4"
              sx={{ fontWeight: 'bold', marginTop: '0 !important' }}
              color="primary"
            >
              {t('est-arrival')} Mon 20, Dec
            </Typography>

            <Stack key={item?.id}>
              <ProductItem
                id={orderGetters.getCartItemId(item as CrOrderItem)}
                qty={orderGetters.getProductQuantity(item as CrOrderItem)}
                purchaseLocation={orderGetters.getPurchaseLocation(item as CrOrderItem)}
                productCode={productGetters.getProductId(product)}
                image={productGetters.getProductImage(product)}
                name={productGetters.getName(product)}
                options={productGetters.getOptions(product)}
                price={productGetters.getPrice(product).regular?.toString()}
                salePrice={productGetters.getPrice(product).special?.toString()}
                expectedDeliveryDate={expectedDeliveryDate}
                data-testid="product-item-multi-ship"
              ></ProductItem>
            </Stack>
          </>
        )
      })}
    </Stack>
  )
}

export default ReviewProductItemsWithAddresses
