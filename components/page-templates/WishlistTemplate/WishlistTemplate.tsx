import React from 'react'

import { Grid, Typography, Box, Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { ProductCard } from '@/components/product'
import { useWishlist, useProductCardActions } from '@/hooks'
import { productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import type { WishlistProductInput, ProductCustom } from '@/lib/types'

import type { Maybe, CrWishlistItem, Product, CrProduct, CrProductOption } from '@/lib/gql/types'

const WishlistTemplate = () => {
  const router = useRouter()

  const { t } = useTranslation('common')
  const { getProductLink } = uiHelpers()
  const { wishlists } = useWishlist()
  const { handleAddToCart, openProductQuickViewModal, handleWishList } = useProductCardActions()

  return (
    <Grid container data-testid="wishlist-template">
      <>
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: 'grey.600' }}>
            {t('item-quantity', { count: wishlists?.items?.length || 0 })}
          </Typography>
        </Grid>
        {/* Product Card Section */}
        <Grid container sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
          {wishlists?.items?.length ? (
            wishlists?.items?.map((item: Maybe<CrWishlistItem>, index: number) => (
              <Grid
                key={productGetters.getProductId(item?.product as ProductCustom)}
                item
                display={'flex'}
                justifyContent={
                  (index + 1) % 3 === 0
                    ? 'flex-end'
                    : (index + 1) % 3 === 1
                    ? 'flex-start'
                    : 'center'
                }
                md={4}
                sm={4}
                xs={12}
                spacing={3}
              >
                <Box>
                  <ProductCard
                    key={item?.id}
                    isInWishlist={true}
                    showQuickViewButton={false}
                    productCode={productGetters.getProductId(item?.product as Product)}
                    variationProductCode={productGetters.getVariationProductCode(
                      item?.product as Product
                    )}
                    imageUrl={productGetters.handleProtocolRelativeUrl(
                      item?.product?.imageUrl as string
                    )}
                    imageAltText={item?.product?.imageAlternateText as string}
                    link={getProductLink(item?.product?.productCode as string)}
                    price={t<string>('currency', {
                      val: productGetters.getPrice(item?.product as ProductCustom).regular,
                    })}
                    {...(productGetters.getPrice(item?.product as ProductCustom).special && {
                      salePrice: t<string>('currency', {
                        val: productGetters.getPrice(item?.product as ProductCustom).special,
                      }),
                    })}
                    title={productGetters.getName(item?.product as ProductCustom) as string}
                    rating={productGetters.getRating(item?.product as ProductCustom)}
                    fulfillmentTypesSupported={item?.product?.fulfillmentTypesSupported as string[]}
                    options={
                      productGetters.getOptions(item?.product as CrProduct) as CrProductOption[]
                    }
                    onAddOrRemoveWishlistItem={() =>
                      handleWishList(item?.product as WishlistProductInput)
                    }
                    onClickAddToCart={handleAddToCart}
                    onClickQuickViewModal={() =>
                      openProductQuickViewModal({ product: item?.product as ProductCustom })
                    }
                  />
                </Box>
              </Grid>
            ))
          ) : (
            <Box>
              <Typography variant="subtitle2">{t('empty-wishlist-message')}</Typography>
              <Box maxWidth="23.5rem">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: '100%', marginTop: '3.063rem' }}
                  onClick={() => router.push('/')}
                >
                  {t('shop-now')}
                </Button>
              </Box>
            </Box>
          )}
        </Grid>
      </>
    </Grid>
  )
}

export default WishlistTemplate
