import React from 'react'
import { Card, Box } from '@mui/material'
import FlexBox from '@/components/FlexBox'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import Image from 'next/image'

export interface ProductCardProps {
  price: string
  salePrice: string
  link: string
  productCode: string
  title: string
  rating: string
  image: string
  imageWidth: string
  imageHeight: string
  imageLayout: string
  isInWishlist: boolean
  isInCart: boolean
}
const ImageWrap = styled(Box)(() => ({
  position: 'relative',
  display: 'inline-block',
  textAlign: 'center',
}))

const ProductCard = (props: ProductCardProps) => {
  const { price, title, link, image } = props
  return (
    <Card
      sx={{
        padding: '10px',
      }}
    >
      <Box>
        <Link href={link}>
          <a>
            <ImageWrap>
              <Image src={image} width={260} height={260} />
            </ImageWrap>
          </a>
        </Link>
      </Box>
      <FlexBox>
        <Box flex="1 1 0" minWidth="0px" mr={1}>
          <Link href={link}>
            <a>
              <h3>{title}</h3>
              <h6>{price}</h6>
            </a>
          </Link>
        </Box>
      </FlexBox>
    </Card>
  )
}

export default ProductCard
