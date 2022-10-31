import * as React from 'react'

import { Container, Grid } from '@mui/material'

import { ProductRecommendations } from '@/components/product'
import { ProductRecommendationsProps } from '@/components/product/ProductRecommendations/ProductRecommendations'

interface CmsHomePageProductsProps {
  recentlyViewed: ProductRecommendationsProps
  topSellings: ProductRecommendationsProps
}

const styles = {
  gridContainer: {
    display: { md: 'flex', xs: 'block' },
    marginTop: { xs: '1rem', md: '3rem' },
    marginBottom: { xs: '3rem', md: '3rem' },
  },
}
const CmsHomePageProducts = (props: CmsHomePageProductsProps) => {
  return (
    <Container maxWidth={'xl'}>
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
    </Container>
  )
}

export default CmsHomePageProducts
