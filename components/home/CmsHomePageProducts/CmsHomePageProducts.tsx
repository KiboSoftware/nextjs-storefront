import * as React from 'react'

import { Grid } from '@mui/material'

import { ProductRecommendations } from '@/components/product'
import { ProductRecommendationsProps } from '@/components/product/ProductRecommendations/ProductRecommendations'

const styles = {
  gridContainer: {
    display: { md: 'flex', xs: 'block' },
    marginTop: { xs: '1rem', md: '3rem' },
    marginBottom: { xs: '3rem', md: '3rem' },
  },
}
const CmsHomePageProducts = (props: {
  recentlyViewed: ProductRecommendationsProps
  topSellings: ProductRecommendationsProps
}) => {
  return (
    <Grid sx={{ ...styles.gridContainer }} container columnSpacing={{ md: 5 }}>
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
