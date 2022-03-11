import React, { useCallback, useState } from 'react'

import Add from '@mui/icons-material/Add'
import { Box, Grid, Rating, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import FlexBox from '@/components/FlexBox'

const ProductDetailTemplate = ({ product }: any) => {
  const productName = product?.content?.productName
  const price = product?.price?.price
  const imageUrl = `https://` + (product?.content?.productImages[0]?.imageUrl || '')
  const description = product?.content?.productFullDescription || 'Lorem Ipsum'

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <Box>
            <FlexBox justifyContent="center" mb={6}>
              <Image width={300} height={300} src={imageUrl} alt="image" />
            </FlexBox>
          </Box>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <h1>{productName}</h1>

          <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rating:</Box>
            <Box mx={1} lineHeight="1">
              <Rating value={1} />
            </Box>
          </FlexBox>

          <Box mb={3}>
            <h2>${price.toFixed(2)}</h2>
          </Box>
          <FlexBox alignItems="center" mb={2}>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </FlexBox>
          <Box mb={3}>
            <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
              <FormControlLabel value="Ship" control={<Radio />} label="Ship" />
              <FormControlLabel value="Pickup" control={<Radio />} label="Pickup" />
            </RadioGroup>
          </Box>
          <Box mb={3}>
            <Button>
              <Add /> Add To Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductDetailTemplate
