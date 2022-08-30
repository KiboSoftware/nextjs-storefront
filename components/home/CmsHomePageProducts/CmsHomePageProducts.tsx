import * as React from 'react'

import { Grid } from '@mui/material'

import { ProductRecommendations } from '@/components/product'
import { ProductRecommendationsProps } from '@/components/product/ProductRecommendations/ProductRecommendations'

const CmsHomePageProducts = (props: {
  recentlyViewed: ProductRecommendationsProps
  topSellings: ProductRecommendationsProps
}) => {
  return (
    <Grid container>
      <Grid item sm={12} md={6}>
        {props?.recentlyViewed?.productCodes?.length > 0 && (
          <ProductRecommendations {...props.recentlyViewed} />
        )}
      </Grid>
      <Grid item sm={12} md={6}>
        {props?.topSellings?.productCodes?.length > 0 && (
          <ProductRecommendations {...props.topSellings} />
        )}
      </Grid>
    </Grid>
  )
}

export default CmsHomePageProducts
