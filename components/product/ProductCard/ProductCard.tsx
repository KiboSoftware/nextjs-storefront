import React, { MouseEvent } from 'react'

import { StarRounded } from '@mui/icons-material'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import {
  Card,
  Typography,
  Rating,
  CardMedia,
  Box,
  Stack,
  Skeleton,
  Button,
  Link as MuiLink,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
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
  isShopNow?: boolean
  onAddOrRemoveWishlistItem?: () => void
}

const styles = {
  cardRoot: {
    padding: '0.625rem',
    backgroundColor: 'transparent',
    width: {
      xs: 172,
      md: 202,
    },
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 2px 16px 4px rgb(40 44 63 / 7%)',
    },
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
    isShopNow = false,
    isInWishlist = false,
    onAddOrRemoveWishlistItem,
  } = props

  const { t } = useTranslation('common')

  const handleAddOrRemoveWishlistItem = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    onAddOrRemoveWishlistItem && onAddOrRemoveWishlistItem()
  }

  if (isLoading) return <ProductCardSkeleton />
  else
    return (
      <Box>
        <Link href={link} passHref data-testid="product-card-link">
          <MuiLink href={link} underline="none">
            <Card sx={styles.cardRoot} data-testid="product-card">
              <Box textAlign={'right'} width="100%" onClick={handleAddOrRemoveWishlistItem}>
                {isInWishlist ? (
                  <FavoriteRoundedIcon sx={{ color: 'red.900' }} />
                ) : (
                  <FavoriteBorderRoundedIcon sx={{ color: 'grey.600' }} />
                )}
              </Box>
              <CardMedia
                sx={{
                  width: '100%',
                  height: imageHeight,
                  position: 'relative',
                }}
              >
                <Box sx={{ zIndex: 1 }}>
                  <KiboImage
                    src={imageUrl || placeholderImageUrl}
                    alt={imageUrl ? imageAltText : 'no-image-alt'}
                    layout="fill"
                    objectFit="contain"
                    data-testid="product-image"
                    errorimage={placeholderImageUrl}
                  />
                </Box>
              </CardMedia>
              <Box flexDirection="column" m={2} mt={1}>
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
                  icon={<StarRounded color="primary" data-testid="filled-rating" />}
                  emptyIcon={<StarRounded data-testid="empty-rating" />}
                  data-testid="product-rating"
                />
              </Box>
            </Card>
          </MuiLink>
        </Link>
        <Box>
          {isShopNow && (
            <Link href={link} passHref>
              <MuiLink href={link} underline="none">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: '100%', marginTop: '49px' }}
                >
                  {t('shop-now')}
                </Button>
              </MuiLink>
            </Link>
          )}
        </Box>
      </Box>
    )
}

export default ProductCard
