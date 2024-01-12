import React from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { useTranslation } from 'next-i18next'

import { ProductCardListViewProps } from '../ProductCardListView/ProductCardListView'
import { ProductCard } from '@/components/product'
import { useGetProducts, useProductCardActions } from '@/hooks'
import { productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import { ProductCustom, ProductProperties } from '@/lib/types'

import type { Product } from '@/lib/gql/types'

export interface ProductRecommendationsProps {
  title: string
  productCodes?: Array<string>
  query?: string
}

const ProductRecommendations = (props: ProductRecommendationsProps) => {
  const { title, productCodes = [], query } = props
  const { t } = useTranslation('common')
  const { getProductLink } = uiHelpers()
  const { data: productSearchResult } = useGetProducts({ productCodes, query: query as string })
  const products = productSearchResult?.items as Product[]

  const {
    checkProductInWishlist,
    handleAddToCart,
    handleWishList,
    isATCLoading,
    openProductQuickViewModal,
  } = useProductCardActions()

  const productCardProps = (product: Product): ProductCardListViewProps => {
    const properties = productGetters.getProperties(product) as ProductProperties[]
    const productCode = productGetters.getProductId(product)
    const variationProductCode = productGetters.getVariationProductCode(product)
    return {
      productCode,
      variationProductCode,
      productDescription: productGetters.getShortDescription(product),
      showQuickViewButton: true,
      badge: productGetters.getBadgeAttribute(properties),
      imageUrl:
        productGetters.getCoverImage(product) &&
        productGetters.handleProtocolRelativeUrl(productGetters.getCoverImage(product)),
      link: getProductLink(productCode, product?.content?.seoFriendlyUrl as string),
      price: t<string>('currency', {
        val: productGetters.getPrice(product).regular,
      }),
      ...(productGetters.getPrice(product).special && {
        salePrice: t<string>('currency', {
          val: productGetters.getPrice(product).special,
        }),
      }),
      priceRange: productGetters.getPriceRange(product),
      title: productGetters.getName(product),
      rating: productGetters.getRating(product),
      isInWishlist: checkProductInWishlist({
        productCode,
        variationProductCode,
      }),
      isShowWishlistIcon: !productGetters.isVariationProduct(product),
      isATCLoading,
      fulfillmentTypesSupported: product?.fulfillmentTypesSupported as string[],
      onAddOrRemoveWishlistItem: () => handleWishList(product as ProductCustom),
      onClickQuickViewModal: () => openProductQuickViewModal({ product: product as ProductCustom }),
      onClickAddToCart: (payload: any) => handleAddToCart(payload),
    }
  }

  return (
    <>
      {products?.length > 0 ? (
        <Grid item xs={12} sx={{ backgroundColor: 'grey.100', mt: 2, height: '100%' }}>
          <Box px={5} pt={4} pb={0}>
            <Typography variant="h2" gutterBottom>
              {title}
            </Typography>
          </Box>
          <Splide
            aria-label="My Favorite Images"
            options={{
              type: 'loop',
              autoWidth: true,
              autoHeight: true,
              gap: 25,
              pagination: false,
              padding: 20,
              wheel: true,
              wheelSleep: 1000,
            }}
          >
            {products?.map((product) => {
              return (
                <SplideSlide key={product?.productCode}>
                  <ProductCard {...productCardProps(product)} />
                </SplideSlide>
              )
            })}
          </Splide>
        </Grid>
      ) : null}
    </>
  )
}

export default ProductRecommendations
