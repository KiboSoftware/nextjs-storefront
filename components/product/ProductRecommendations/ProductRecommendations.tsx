import React from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { ProductCard } from '@/components/product'
import { useProductsQueries } from '@/hooks'
import { productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'

import type { Product } from '@/lib/gql/types'

export interface ProductRecommendationsProps {
  title: string
  productCodes: Array<string>
}

const ProductRecommendations = (props: ProductRecommendationsProps) => {
  const { title, productCodes } = props
  const { t } = useTranslation('common')
  const { getProductLink } = uiHelpers()
  const { data: productSearchResult } = useProductsQueries(productCodes)
  const products = productSearchResult?.items as Product[]

  return (
    <>
      {productCodes?.length > 0 && (
        <Grid item xs={12} sx={{ backgroundColor: 'grey.100', p: { xs: 1, md: 5 }, marginY: 2 }}>
          <Typography variant="h2" gutterBottom>
            {title}
          </Typography>
          <Box
            display="flex"
            sx={{ gap: { xs: 0, md: 4 }, maxWidth: { xs: '100vw', md: '100%' }, overflowX: 'auto' }}
          >
            {products?.map((product) => {
              return (
                <Box key={product?.productCode} width="100%">
                  <ProductCard
                    imageUrl={
                      productGetters.getCoverImage(product) &&
                      productGetters.handleProtocolRelativeUrl(
                        productGetters.getCoverImage(product)
                      )
                    }
                    link={getProductLink(product?.productCode as string)}
                    price={t<string>('currency', {
                      val: productGetters.getPrice(product).regular,
                    })}
                    {...(productGetters.getPrice(product).special && {
                      salePrice: t<string>('currency', {
                        val: productGetters.getPrice(product).special,
                      }),
                    })}
                    title={productGetters.getName(product) as string}
                    rating={productGetters.getRating(product)}
                  />
                </Box>
              )
            })}
          </Box>
        </Grid>
      )}
    </>
  )
}

export default ProductRecommendations
