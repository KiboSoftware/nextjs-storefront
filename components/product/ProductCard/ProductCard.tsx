import React from 'react'

import StarIcon from '@mui/icons-material/StarRounded'
import {
  Card,
  Typography,
  Rating,
  CardMedia,
  CardActionArea,
  Box,
  Stack,
  Skeleton,
} from '@mui/material'
import Link from 'next/link'

import KiboImage from '@/components/common/KiboImage/KiboImage'
import Price from '@/components/common/Price/Price'
import DefaultImage from '@/public/product_placeholder.svg'

export interface ProductCardProps {
  title?: string
  link: string
  imageUrl?: string
  placeholderImageUrl?: string
  imageAltText?: string
  price?: string
  salePrice?: string
  productCode?: string
  rating?: number
  imageHeight?: number
  imageLayout?: string
  isInWishlist?: boolean
  isInCart?: boolean
  isLoading?: boolean
}

const styles = {
  cardRoot: {
    padding: '1rem 1.5rem',
    backgroundColor: 'transparent',
    maxWidth: {
      xs: 149,
      md: 202,
    },
    boxShadow: 'none',
  },
}

const ProductCardSkeleton = () => {
  return (
    <Stack spacing={1} sx={styles.cardRoot} data-testid="product-card-skeleton">
      <Skeleton variant="rectangular" height={150} />
      <Skeleton variant="rectangular" height={20} />
      <Skeleton variant="rectangular" width={60} height={20} />
      <Skeleton variant="rectangular" width={95} height={20} />
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
    imageAltText = 'product-image-alt',
    isLoading = false,
  } = props

  if (isLoading) return <ProductCardSkeleton />
  else
    return (
      <Link href={link} passHref data-testid="product-card-link">
        <Card sx={styles.cardRoot} data-testid="product-card">
          <CardActionArea>
            <CardMedia sx={{ width: '100%', height: imageHeight, position: 'relative' }}>
              <KiboImage
                src={imageUrl || placeholderImageUrl}
                alt={imageUrl ? imageAltText : 'no-image-alt'}
                layout="fill"
                objectFit="contain"
                data-testid="product-image"
              />
            </CardMedia>
            <Box flexDirection="column" m={1} mt={1}>
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
                icon={<StarIcon color="primary" data-testid="filled-rating" />}
                emptyIcon={<StarIcon data-testid="empty-rating" />}
                data-testid="product-rating"
              />
            </Box>
          </CardActionArea>
        </Card>
      </Link>
    )
}

export default ProductCard
