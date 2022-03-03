import React from 'react'

import {
  Card,
  Link as MuiLink,
  Typography,
  Rating,
  CardMedia,
  CardActionArea,
  Box,
  Stack,
  Skeleton,
} from '@mui/material'
import StarIcon from '@mui/icons-material/StarRounded'
import DefaultImage from '@/public/product_placeholder.svg'

import Price from '@/components/common/Price/Price'

export interface ProductCardProps {
  title: string
  imageUrl?: string
  placeholderImageUrl?: string
  imageAltText?: string
  price?: string
  salePrice?: string
  link?: string
  productCode?: string
  rating?: number
  imageWidth?: string
  imageHeight?: string
  imageLayout?: string
  isInWishlist?: boolean
  isInCart?: boolean
  isLoading?: boolean
}

const styles = {
  cardRoot: {
    padding: '0.625rem',
    maxWidth: {
      xs: '172px',
      lg: '202px',
    },
    boxShadow: 'none',
  },
}

const ProductCardSkeleton = () => {
  return (
    <Stack spacing={1} sx={styles.cardRoot}>
      <Skeleton variant="rectangular" height={100} />
      <Skeleton variant="rectangular" height={20} />
      <Skeleton variant="rectangular" width={60} height={20} />
      <Skeleton variant="rectangular" height={20} />
    </Stack>
  )
}

const ProductCard = (props: ProductCardProps) => {
  const {
    price,
    title,
    link,
    imageUrl,
    placeholderImageUrl = DefaultImage,
    salePrice,
    rating = 0,
    imageHeight = 140,
    imageWidth,
    imageAltText = 'product-image-alt',
    isLoading = false,
  } = props

  if (isLoading) return <ProductCardSkeleton />
  else
    return (
      <Card sx={styles.cardRoot}>
        <MuiLink href={link} underline="none">
          <CardActionArea>
            <CardMedia
              component="img"
              width={imageWidth}
              height={imageHeight}
              image={imageUrl || placeholderImageUrl}
              alt={imageAltText}
              sx={{ objectFit: 'contain' }}
            />
            <Box flexDirection="column" m={2} mt={0}>
              <Typography variant="body1" gutterBottom color="text.primary">
                {title}
              </Typography>
              <Price price={price} salePrice={salePrice} variant="body1" />
              <Rating
                name="read-only"
                value={rating}
                precision={0.5}
                readOnly
                size="small"
                icon={<StarIcon color="primary" />}
                emptyIcon={<StarIcon />}
              />
            </Box>
          </CardActionArea>
        </MuiLink>
      </Card>
    )
}

export default ProductCard
