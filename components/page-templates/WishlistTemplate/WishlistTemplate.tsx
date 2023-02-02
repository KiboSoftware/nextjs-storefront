import React, { useState } from 'react'

import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { Grid, Typography, Box, Divider, useTheme, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { ProductCard } from '@/components/product'
import { useWishlist, useWishlistQueries } from '@/hooks'
import { productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import type { WishlistProductInput, ProductCustom } from '@/lib/types'

import type { Maybe, CrWishlistItem, CustomerAccount } from '@/lib/gql/types'

const styles = {
  removedItemStyle: {
    opacity: 0.15,
    pointerEvents: 'none',
  },
}
const WishlistTemplate = (props: { customerAccount: CustomerAccount }) => {
  const { customerAccount } = props

  const theme = useTheme()
  const router = useRouter()

  const { t } = useTranslation('common')
  const { getProductLink } = uiHelpers()
  const { addOrRemoveWishlistItem } = useWishlist({ isRemovedFromWishlist: true, delay: 1000 })
  const { data: wishlists } = useWishlistQueries()
  const [removedProductCode, setRemovedProductCode] = useState<string>('')

  const handleAddOrRemoveWishlistItem = async (product: WishlistProductInput) => {
    try {
      const { productCode } = product
      setRemovedProductCode(productCode)
      await addOrRemoveWishlistItem({ product })
    } catch (error) {
      console.log('Error: add or remove wishlist item from wishlist template', error)
    }
  }
  return (
    <Grid container data-testid="wishlist-template">
      <>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', padding: '1.5rem 0', alignItems: 'center' }}>
            <FavoriteRoundedIcon sx={{ color: 'red.900', marginRight: '0.875rem' }} />
            <Typography variant="h1">
              {customerAccount?.firstName
                ? customerAccount?.firstName
                : customerAccount?.emailAddress}
            </Typography>
          </Box>
          <Divider color={theme.palette.primary.main} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            sx={{ color: 'grey.600', paddingBottom: '1.5rem', paddingTop: '1.438rem' }}
          >
            {t('item-quantity', { count: wishlists?.items?.length || 0 })}
          </Typography>
        </Grid>
        {/* Product Card Section */}
        {wishlists?.items?.length ? (
          <Grid container sx={{ display: 'flex', paddingRight: { md: 2 }, flexWrap: 'wrap' }}>
            {wishlists &&
              wishlists?.items?.map((item: Maybe<CrWishlistItem>) => (
                <Grid
                  key={productGetters.getProductId(item?.product as ProductCustom)}
                  item
                  lg={2.4}
                  md={4}
                  sm={4}
                  xs={6}
                >
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          ...(item?.product?.productCode === removedProductCode &&
                            styles?.removedItemStyle),
                        }}
                      >
                        <ProductCard
                          key={item?.id}
                          isInWishlist={true}
                          isShopNow={true}
                          imageUrl={productGetters.handleProtocolRelativeUrl(
                            item?.product?.imageUrl as string
                          )}
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
                          onAddOrRemoveWishlistItem={() =>
                            handleAddOrRemoveWishlistItem(item?.product as WishlistProductInput)
                          }
                        />
                      </Box>
                      {item?.product?.productCode === removedProductCode && (
                        <Typography
                          variant="subtitle2"
                          sx={{
                            position: 'absolute',
                            paddingTop: '7.625rem',
                            zIndex: 3,
                          }}
                        >
                          {t('removed')}!
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))}
          </Grid>
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
      </>
    </Grid>
  )
}

export default WishlistTemplate
