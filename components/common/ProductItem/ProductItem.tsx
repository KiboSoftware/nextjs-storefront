import React from 'react'

import { ExpandMore } from '@mui/icons-material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Typography,
  Box,
  CardMedia,
  CardContent,
  Collapse,
  useMediaQuery,
  Hidden,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import Price from '../Price/Price'

import { CrProductOption } from '@/lib/gql/types'

interface ProductItem {
  image: string
  name: string
  options: CrProductOption[]
  price?: number
  salePrice?: number
  quantitySelector?: React.ReactNode
  content?: React.ReactNode
  dividers?: boolean
  children?: React.ReactNode
}

const styles = {
  imageContainer: {
    height: {
      xs: 130,
      lg: 150,
    },
    width: {
      xs: 130,
      lg: 150,
    },
  },
  image: {
    objectFit: 'contain',
  },
}

const ProductOptionsTypography = ({
  option,
  variant = 'body2',
  fontWeight = 'bold',
}: {
  option: CrProductOption
  variant?: 'body2' | 'body1' | 'subtitle1'
  fontWeight?: 'bold' | 'normal'
}) => (
  <Box data-testid="productOptions">
    <Typography variant={variant} fontWeight={fontWeight} sx={{ pr: 1 }} component="span">
      {option.name}:
    </Typography>
    <Typography variant={variant} component="span">
      {option.value}
    </Typography>
  </Box>
)

const ProductDetails = ({
  options,
  price,
  salePrice,
}: {
  options: CrProductOption[]
  price?: number
  salePrice?: number
}) => {
  const { t } = useTranslation('common')

  const theme = useTheme()

  const mdScreen = useMediaQuery(theme.breakpoints.up('lg'))

  const [expanded, setExpanded] = React.useState(true)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Box data-testid="productDetails">
      <Hidden only="lg">
        <Box>
          <Typography variant="body2" component="span" sx={{ pr: 1 }}>
            {t('details')}
          </Typography>
          <ExpandMore onClick={handleExpandClick} aria-expanded={expanded}>
            <ExpandMoreIcon />
          </ExpandMore>
        </Box>
      </Hidden>

      <Collapse in={mdScreen ? true : expanded} timeout="auto" unmountOnExit>
        {options.map((option: CrProductOption, index: number) => (
          <ProductOptionsTypography key={index} option={option}></ProductOptionsTypography>
        ))}
        {(price || salePrice) && (
          <Box sx={{ display: 'inline-flex' }}>
            <Typography variant="body2" fontWeight="bold" component="span" sx={{ pr: 1 }}>
              {t('price-heading')}
            </Typography>
            <Price variant="body2" fontWeight="normal" price={price} salePrice={salePrice} />
          </Box>
        )}
      </Collapse>
    </Box>
  )
}

const ProductItem = (props: ProductItem) => {
  const { image, name, options, price, salePrice, children } = props

  return (
    <>
      <Box sx={{ display: 'flex', pb: 2, pr: 1 }}>
        <Box sx={{ ...styles.imageContainer }}>
          <CardMedia
            component="img"
            width={'100%'}
            height={'100%'}
            image={image}
            alt={name}
            sx={{ ...styles.image }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ py: 0, px: 1 }}>
            <Typography variant="h4" data-testid="productName">
              {name}
            </Typography>
            {children}
            <ProductDetails options={options} price={price} salePrice={salePrice} />
          </CardContent>
        </Box>
      </Box>
    </>
  )
}

export default ProductItem
