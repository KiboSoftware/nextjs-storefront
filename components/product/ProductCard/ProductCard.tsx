import React, { MouseEvent } from 'react'

import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRounded from '@mui/icons-material/FavoriteRounded'
import StarRounded from '@mui/icons-material/StarRounded'
import { LoadingButton } from '@mui/lab'
import { Card, Typography, CardMedia, Box, Stack, Skeleton, Button, Rating } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { ProductCardStyles } from './ProductCard.styles'
import { KiboImage, Price } from '@/components/common'
import { usePriceRangeFormatter } from '@/hooks'
import { FulfillmentOptions as FulfillmentOptionsConstant } from '@/lib/constants'
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
  variationProductCode?: string
  rating?: number
  imageHeight?: number
  imageLayout?: string
  isInWishlist?: boolean
  isInCart?: boolean
  isLoading?: boolean
  isShowWishlistIcon?: boolean
  product?: Product
  showQuickViewButton?: boolean
  badge?: string
  isATCLoading?: boolean
  onAddOrRemoveWishlistItem?: () => void
  onClickQuickViewModal?: () => void
  onClickAddToCart?: (payload: any) => void
}
const ProductCardSkeleton = () => {
  return (
    <Stack spacing={1} sx={ProductCardStyles.cardRoot} data-testid="product-card-skeleton">
      <Skeleton variant="rectangular" height={150} />
      <Skeleton variant="rectangular" height={20} />
      <Skeleton variant="rectangular" width={60} height={20} />
      <Skeleton variant="rectangular" width={95} height={20} />
    </Stack>
  )
}
const ProductCard = (props: ProductCardProps) => {
  const {
    productCode,
    variationProductCode,
    price,
    salePrice,
    priceRange,
    title,
    link,
    imageUrl,
    placeholderImageUrl = DefaultImage,
    rating = 0,
    imageHeight = 180,
    imageAltText = 'product-image-alt',
    isLoading = false,
    isInWishlist = false,
    isShowWishlistIcon = true,
    badge,
    onAddOrRemoveWishlistItem,
    showQuickViewButton = true,
    isATCLoading,
    onClickQuickViewModal,
    onClickAddToCart,
  } = props
  const productPriceRange = usePriceRangeFormatter(priceRange as ProductPriceRange)
  const { t } = useTranslation('common')
  const handleAddOrRemoveWishlistItem = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    onAddOrRemoveWishlistItem?.()
  }
  const handleOpenProductQuickViewModal = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    onClickQuickViewModal?.()
  }
  const handleAddToCart = (event: any) => {
    event.preventDefault()
    const payload = {
      product: {
        productCode: productCode,
        variationProductCode: variationProductCode,
        fulfillmentMethod: FulfillmentOptionsConstant.SHIP,
        purchaseLocationCode: '',
      },
      quantity: 1,
    }
    onClickAddToCart?.(payload)
  }
  if (isLoading) return <ProductCardSkeleton />
  else
    return (
      <Box sx={ProductCardStyles.main}>
        <Link href={link} passHref data-testid="product-card-link">
          <Box>
            <Card sx={{ ...ProductCardStyles.cardRoot, minHeight: 321 }} data-testid="product-card">
              <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} pb={1}>
                {/* Badge start */}
                {badge ? (
                  <Box
                    width="fit-content"
                    bgcolor={'grey.200'}
                    className="badge"
                    px={2}
                    textAlign={'center'}
                  >
                    <Typography variant="body1" fontWeight={500} color={'text.secondary'}>
                      {badge}
                    </Typography>
                  </Box>
                ) : null}
                {/* Badge End */}
                {isShowWishlistIcon && (
                  <Box
                    className="wishlist-button-container"
                    ml={'auto'}
                    textAlign={'right'}
                    onClick={handleAddOrRemoveWishlistItem}
                  >
                    {isInWishlist ? (
                      <FavoriteRounded sx={{ color: 'red.900' }} />
                    ) : (
                      <FavoriteBorderRounded sx={{ color: 'grey.600' }} />
                    )}
                  </Box>
                )}
              </Box>
              <CardMedia
                className="product-image"
                sx={{
                  ...ProductCardStyles.cardMedia,
                  height: imageHeight,
                  zIndex: 1,
                  position: 'relative',
                }}
              >
                <KiboImage
                  src={imageUrl || placeholderImageUrl}
                  alt={imageAltText}
                  fill
                  quality={100}
                  sizes="(max-width: 240px) 240px, 240px"
                  style={{ objectFit: 'contain' }}
                  data-testid="product-image"
                  errorimage={placeholderImageUrl}
                />
              </CardMedia>
              <Box flexDirection="column" m={1}>
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
                {isShowWishlistIcon && (
                  <Box pt={2} textAlign={'center'} sx={{ opacity: 0 }} className="quick-actions">
                    {showQuickViewButton && (
                      <Button
                        sx={{ mr: 2 }}
                        variant="contained"
                        color="primary"
                        onClick={handleOpenProductQuickViewModal}
                      >
                        {t('quick-view')}
                      </Button>
                    )}
                    <LoadingButton
                      variant="contained"
                      color="primary"
                      onClick={handleAddToCart}
                      loading={isATCLoading}
                    >
                      {t('add-to-cart')}
                    </LoadingButton>
                  </Box>
                )}
              </Box>
            </Card>
          </Box>
        </Link>
      </Box>
    )
}
export default ProductCard
