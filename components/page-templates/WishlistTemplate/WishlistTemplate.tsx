import React from 'react'

import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import { Grid, Typography, Box, Divider, useTheme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ProductCard } from '@/components/product'
import { useWishlist } from '@/hooks'
import { productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import { WishlistProductInput, ProductCustom } from '@/lib/types'

import { WishlistItem } from '@/lib/gql/types'

const WishlistTemplate = (props: any) => {
  const { wishlists, customerAccount } = props
  const { t } = useTranslation(['common'])
  const { getProductLink } = uiHelpers()
  const { addOrRemoveWishlistItem } = useWishlist()
  const theme = useTheme()

  const handleAddOrRemoveWishlistItem = async (product: WishlistProductInput) => {
    try {
      const { productCode, variationProductCode, isPackagedStandAlone, options } = product
      const addOrRemoveWishlistItemParams = {
        productCode,
        variationProductCode,
        isPackagedStandAlone,
        options,
      }
      await addOrRemoveWishlistItem(addOrRemoveWishlistItemParams)
    } catch (error) {
      console.log('Error: add or remove wishlist item from wishlist template', error)
    }
  }
  return (
    <Grid container>
      <Grid xs={12}>
        <Box sx={{ display: 'flex', padding: '24px 0' }}>
          <FavoriteRoundedIcon sx={{ color: '#BB2500', marginRight: '14px' }} />{' '}
          <Typography variant="h1">
            {customerAccount?.firstName
              ? customerAccount?.firstName
              : customerAccount?.emailAddress}
          </Typography>
        </Box>
        <Divider color={theme.palette.primary.main} />
      </Grid>
      <Grid xs={12}>
        <Typography variant="subtitle2" sx={{ color: 'grey.600', paddingBottom: '23px' }}>
          {wishlists?.items?.length} items
        </Typography>
      </Grid>
      {/* Product Card Section */}
      <Grid container sx={{ display: 'flex', paddingRight: { md: 2 }, flexWrap: 'wrap' }}>
        {wishlists?.items?.map((item: WishlistItem) => (
          <Grid
            key={productGetters.getProductId(item?.product as ProductCustom)}
            item
            lg={2.4}
            md={4}
            sm={4}
            xs={6}
          >
            <ProductCard
              key={item?.id}
              data-wishlist-item-id={item?.id}
              isInWishlist={true}
              isShopNow={true}
              imageUrl={productGetters.handleProtocolRelativeUrl(item?.product?.imageUrl as string)}
              link={getProductLink(item?.product?.productCode as string)}
              price={t<string>('common:currency', {
                val: productGetters.getPrice(item?.product as ProductCustom).regular,
              })}
              {...(productGetters.getPrice(item?.product as ProductCustom).special && {
                salePrice: t<string>('common:currency', {
                  val: productGetters.getPrice(item?.product as ProductCustom).special,
                }),
              })}
              title={productGetters.getName(item?.product as ProductCustom) as string}
              rating={productGetters.getRating(item?.product as ProductCustom)}
              onAddOrRemoveWishlistItem={() =>
                handleAddOrRemoveWishlistItem(item?.product as WishlistProductInput)
              }
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default WishlistTemplate
