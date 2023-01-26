import React, { MouseEvent } from 'react'

import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import StarRounded from '@mui/icons-material/StarRounded'
import { Card, Typography, Rating, CardMedia, Box, Stack, Skeleton, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { KiboImage, Price } from '@/components/common'
import { usePriceRangeFormatter } from '@/hooks'
import DefaultImage from '@/public/product_placeholder.svg'

import type { Product, ProductPriceRange } from '@/lib/gql/types'

export interface ProductCardProps {
  title?: string
  link: string
  imageUrl?: string
  placeholderImageUrl?: string
  imageAltText?: string
  price?: string
  salePrice?: string
  priceRange?: ProductPriceRange
  productCode?: string
  rating?: number
  imageHeight?: number
  imageLayout?: string
  isInWishlist?: boolean
  isInCart?: boolean
  isLoading?: boolean
  isShopNow?: boolean
  isShowWishlistIcon?: boolean
  product?: Product
  showQuickViewButton?: boolean
  onAddOrRemoveWishlistItem?: () => void
  onClickQuickViewModal?: () => void
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
      '.quick-view': {
        opacity: 1,
      },
    },
  },
  quickView: {
    opacity: 0,
    width: '100%',
    marginTop: '1 rem',
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
    salePrice,
    priceRange,
    title,
    link,
    imageUrl,
    placeholderImageUrl = DefaultImage,
    rating = 0,
    imageHeight = 140,
    imageAltText = 'product-image-alt',
    isLoading = false,
    isShopNow = false,
    isInWishlist = false,
    isShowWishlistIcon = true,
    onAddOrRemoveWishlistItem,
    showQuickViewButton = false,
    onClickQuickViewModal,
  } = props

  const productPriceRange = usePriceRangeFormatter(priceRange as ProductPriceRange)

  const { t } = useTranslation('common')

  const handleAddOrRemoveWishlistItem = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    onAddOrRemoveWishlistItem && onAddOrRemoveWishlistItem()
  }
  const handleOpenProductQuickViewModal = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    onClickQuickViewModal && onClickQuickViewModal()
  }
  if (isLoading) return <ProductCardSkeleton />
  else
    return (
      <Box>
        <Link href={link} passHref data-testid="product-card-link">
          <Box>
            <Card sx={styles.cardRoot} data-testid="product-card">
              {isShowWishlistIcon && (
                <Box textAlign={'right'} width="100%" onClick={handleAddOrRemoveWishlistItem}>
                  {isInWishlist ? (
                    <FavoriteRoundedIcon sx={{ color: 'red.900' }} />
                  ) : (
                    <FavoriteBorderRoundedIcon sx={{ color: 'grey.600' }} />
                  )}
                </Box>
              )}
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
                <Price
                  price={price}
                  salePrice={salePrice}
                  priceRange={productPriceRange}
                  variant="body1"
                />
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
                {showQuickViewButton && (
                  <Button
                    variant="contained"
                    color="secondary"
                    className="quick-view"
                    sx={styles.quickView}
                    onClick={handleOpenProductQuickViewModal}
                  >
                    {t('quick-view')}
                  </Button>
                )}
              </Box>
            </Card>
          </Box>
        </Link>
        <Box>
          {isShopNow && (
            <Link href={link} passHref>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: '100%', marginTop: '3.063rem' }}
              >
                {t('shop-now')}
              </Button>
            </Link>
          )}
        </Box>
      </Box>
    )
}

export default ProductCard
