import React, { MouseEvent } from 'react'

import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRounded from '@mui/icons-material/FavoriteRounded'
import StarRounded from '@mui/icons-material/StarRounded'
import { Card, Typography, Rating, CardMedia, Box, Stack, Skeleton, Button } from '@mui/material'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { ProductCardStyles } from './ProductCardListView.styles'
import { KiboImage, Price } from '@/components/common'
import { usePriceRangeFormatter } from '@/hooks'
import { FulfillmentOptions as FulfillmentOptionsConstant } from '@/lib/constants'
import DefaultImage from '@/public/product_placeholder.svg'

import type { ProductPriceRange } from '@/lib/gql/types'

export interface ProductCardListViewProps {
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
  productDescription?: string
  imageHeight?: number
  imageLayout?: string
  isInWishlist?: boolean
  isInCart?: boolean
  isLoading?: boolean
  isShopNow?: boolean
  isShowWishlistIcon?: boolean
  showQuickViewButton?: boolean
  badge?: string
  isATCLoading?: boolean
  fulfillmentTypesSupported?: string[]
  onAddOrRemoveWishlistItem?: () => Promise<void>
  onClickQuickViewModal?: () => void
  onClickAddToCart?: (payload: any) => Promise<void>
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

const ProductCardListView = (props: ProductCardListViewProps) => {
  const {
    price,
    salePrice,
    priceRange,
    title,
    link,
    imageUrl,
    placeholderImageUrl = DefaultImage,
    rating = 4,
    productDescription = '',
    imageHeight = 140,
    imageAltText = 'product-image-alt',
    isLoading = false,
    isInWishlist = false,
    isShowWishlistIcon = true,
    badge,
    showQuickViewButton = false,
    productCode,
    variationProductCode,
    fulfillmentTypesSupported,
    onAddOrRemoveWishlistItem,
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

  const handleAddToCart = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const payload = {
      product: {
        productCode: productCode,
        variationProductCode: variationProductCode,
        fulfillmentMethod: fulfillmentTypesSupported?.includes(FulfillmentOptionsConstant.DIGITAL)
          ? FulfillmentOptionsConstant.DIGITAL
          : FulfillmentOptionsConstant.SHIP,
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
            <Card sx={ProductCardStyles.cardRoot} data-testid="product-card">
              {isShowWishlistIcon && (
                <Box
                  className="wishlist-button-container"
                  textAlign={'right'}
                  position={'absolute'}
                  right={16}
                  onClick={handleAddOrRemoveWishlistItem}
                >
                  {isInWishlist ? (
                    <FavoriteRounded sx={{ color: 'red.900' }} />
                  ) : (
                    <FavoriteBorderRounded sx={{ color: 'grey.600' }} />
                  )}
                </Box>
              )}

              {/* Badge start */}
              {badge ? (
                <Box
                  position="absolute"
                  left="0"
                  top="0"
                  width="fit-content"
                  bgcolor={'grey.200'}
                  className="badge"
                  px={2}
                  m={1}
                  textAlign={'center'}
                >
                  <Typography variant="subtitle2" fontWeight={600} color={'text.secondary'}>
                    {badge}
                  </Typography>
                </Box>
              ) : null}
              {/* Badge End */}

              <CardMedia
                className="product-image"
                sx={{
                  ...ProductCardStyles.cardMedia,
                  height: {
                    xs: imageHeight,
                    sm: 'auto',
                  },
                }}
              >
                <KiboImage
                  src={imageUrl ?? placeholderImageUrl}
                  alt={imageUrl ? imageAltText : 'no-image-alt'}
                  fill
                  objectFit="contain"
                  data-testid="product-image"
                  errorimage={placeholderImageUrl}
                />
              </CardMedia>
              <Box flexDirection="column" m={1} width="75%" className="product-info">
                <Typography variant="body1" gutterBottom color="text.primary">
                  {title}
                </Typography>
                <Rating
                  name="read-only"
                  value={rating}
                  precision={0.5}
                  readOnly
                  size="small"
                  icon={<StarRounded fontSize="small" data-testid="filled-rating" />}
                  emptyIcon={<StarRounded data-testid="empty-rating" fontSize="small" />}
                  data-testid="product-rating"
                  sx={{ ...ProductCardStyles.rating }}
                />
                <Box>
                  <Box
                    data-testid="short-description"
                    dangerouslySetInnerHTML={{
                      __html: productDescription,
                    }}
                  />
                </Box>
                <Box py={1}>
                  <Price
                    price={price}
                    salePrice={salePrice}
                    priceRange={productPriceRange}
                    variant="body1"
                  />
                </Box>

                <Box pt={1} display={'flex'} gap={2}>
                  {showQuickViewButton ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenProductQuickViewModal}
                    >
                      {t('quick-view')}
                    </Button>
                  ) : null}
                  {isShowWishlistIcon && (
                    <Button variant="contained" color="primary" onClick={handleAddToCart}>
                      {t('add-to-cart')}
                    </Button>
                  )}
                </Box>
              </Box>
            </Card>
          </Box>
        </Link>
      </Box>
    )
}

export default ProductCardListView
