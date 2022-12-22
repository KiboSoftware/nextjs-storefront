import React from 'react'

import { Stack, Divider, Typography, Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ProductItem } from '..'
// Need to be handled with API later
import { userAddressResponse } from '@/__mocks__/stories/userAddressMock'
import { orderGetters, productGetters, addressGetters } from '@/lib/getters'

import type { Maybe, CrOrderItem, CrProduct, CustomerContact, CrAddress } from '@/lib/gql/types'

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
            <Typography
              variant="h4"
              component="h4"
              fontWeight={600}
              color="text.primary"
              sx={{ display: 'flex' }}
            >
              {t('ship-to')}

              <Box display="flex">
                <Typography
                  variant="h4"
                  color="text.primary"
                  sx={{
                    '&::after': { content: "','", pr: 0.5 },
                    paddingLeft: '4px',
                    textTransform: 'capitalize',
                  }}
                >
                  {addressGetters.getAddress1(userShippingAddresses[index]?.address as CrAddress)}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.primary"
                  sx={{ '&::after': { content: "','", pr: 0.5 }, textTransform: 'capitalize' }}
                >
                  {addressGetters.getAddress2(userShippingAddresses[index]?.address as CrAddress)}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.primary"
                  sx={{ '&::after': { content: "','", pr: 0.5 }, textTransform: 'capitalize' }}
                >
                  {addressGetters.getCityOrTown(userShippingAddresses[index]?.address as CrAddress)}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.primary"
                  sx={{ '&::after': { content: "', '", pr: 0.5 }, textTransform: 'capitalize' }}
                >
                  {addressGetters.getStateOrProvince(
                    userShippingAddresses[index]?.address as CrAddress
                  )}
                </Typography>
                <Typography variant="h4" color="text.primary" sx={{ textTransform: 'capitalize' }}>
                  {addressGetters.getPostalOrZipCode(
                    userShippingAddresses[index]?.address as CrAddress
                  )}
                </Typography>
              </Box>
            </Typography>

            {/* To be mapped with actual result from API */}
            <Typography
              variant="h4"
              component="h4"
              sx={{ fontWeight: 'bold', marginTop: '0' }}
              color="primary"
            >
              {t('est-arrival')}
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
