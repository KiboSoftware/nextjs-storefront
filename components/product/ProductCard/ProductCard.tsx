import React from 'react'
import { Card, Link as MuiLink, Typography, Rating, CardMedia, CardActionArea } from '@mui/material'
import FlexBox from '@/components/FlexBox'
import Price from '@/components/common/Price/Price'
import StarIcon from '@mui/icons-material/StarRounded'
import DefaultImage from '@/public/product_placeholder.svg'

export interface ProductCardProps {
  title: string
  image?: string
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
}

const ProductCard = (props: ProductCardProps) => {
  const {
    price,
    title,
    link,
    image = DefaultImage,
    salePrice,
    rating = 0,
    imageHeight = 140,
    imageWidth,
  } = props
  return (
    <Card
      sx={{
        padding: '0.625rem',
        maxWidth: {
          xs: '172px',
          md: '202px',
        },
        boxShadow: 'none',
      }}
    >
      <MuiLink href={link} underline="none">
        <CardActionArea>
          <CardMedia
            component="img"
            width={imageWidth}
            height={imageHeight}
            image={image}
            alt="product image"
            sx={{ objectFit: 'contain' }}
          />
          <FlexBox flexDirection="column" ml={2} mb={2}>
            <Typography variant="body1" gutterBottom color="text.primary">
              {title}
            </Typography>
            <Price price={price} salePrice={salePrice} size="small" />
            <Rating
              name="read-only"
              value={rating}
              precision={0.5}
              readOnly
              size="small"
              icon={<StarIcon color="primary" />}
              emptyIcon={<StarIcon />}
            />
          </FlexBox>
        </CardActionArea>
      </MuiLink>
    </Card>
  )
}

export default ProductCard
