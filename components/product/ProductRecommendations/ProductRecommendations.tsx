import React from 'react'

import { Box, Grid, Typography } from '@mui/material'

import ProductCard from '@/components/product/ProductCard/ProductCard'
import { ProductCustom } from '@/lib/types'

interface ProductRecommendationsProps {
  title?: string
  products?: ProductCustom[]
}

// Chandradeepta Laha: Hardcoded Component. stories and testing should be added later.
const ProductRecommendations = (props: ProductRecommendationsProps) => {
  const { title } = props

  return (
    <Grid item xs={12} sx={{ backgroundColor: 'grey.100', p: { xs: 1, md: 5 }, marginY: 2 }}>
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      <Box
        display="flex"
        sx={{ gap: { xs: 0, md: 4 }, maxWidth: { xs: '100vw', md: '100%' }, overflowX: 'auto' }}
      >
        {Array.from(new Array(5)).map((_each, i) => {
          return (
            <Grid item xs={6} md={2} key={i}>
              <ProductCard
                key={i}
                link="/product"
                title={'Nike Runner'}
                price={'$60.00'}
                rating={4}
                imageUrl={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU'
                }
              />
            </Grid>
          )
        })}
      </Box>
    </Grid>
  )
}

export default ProductRecommendations
