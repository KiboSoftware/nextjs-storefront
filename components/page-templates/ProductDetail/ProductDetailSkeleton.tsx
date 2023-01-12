import React from 'react'

import { Box, Grid, Rating, Skeleton, Typography } from '@mui/material'

function ProductDetailSkeleton() {
  return (
    <Grid container sx={{ mt: { xs: 2, md: 6 } }}>
      <Grid item xs={12} md={6}>
        <Skeleton variant="rectangular" height={500} width={'100%'} />
      </Grid>
      <Grid item xs={12} md={6} sx={{ width: '100%', pl: { xs: 0, md: 5 }, mt: { xs: 2, md: 0 } }}>
        <Typography variant="h1" gutterBottom>
          <Skeleton width={'60%'} />
        </Typography>
        <Typography variant="h2" gutterBottom>
          <Skeleton width={'40%'} />
        </Typography>

        <Box paddingY={1}>
          <Skeleton height={100} />
        </Box>

        <Box data-testid="product-rating">
          <Skeleton>
            <Rating />
          </Skeleton>
        </Box>

        {Array(4)
          .fill(1)
          .map((each) => (
            <Box paddingY={1} key={each}>
              <Skeleton variant="rectangular" height={55} width={'50%'} />
            </Box>
          ))}
      </Grid>
    </Grid>
  )
}

export default ProductDetailSkeleton
