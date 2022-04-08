import React from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
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

import Price from '@/components/common/Price/Price'
import ProductOptionList from '@/components/product/ProductOptionList/ProductOptionList'
import DefaultImage from '@/public/product_placeholder.svg'

import type { CrProductOption } from '@/lib/gql/types'
interface ProductItemProps {
  image: string
  name: string
  options: CrProductOption[]
  price?: number
  salePrice?: number
  children?: React.ReactNode
}

const styles = {
  imageContainer: {
    maxHeight: {
      xs: 100,
      sm: 130,
      md: 150,
    },
    maxWidth: {
      xs: 100,
      sm: 130,
      md: 150,
    },
    width: {
      xs: '20%',
      sm: '20%',
      md: '25%',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}

const ProductItem = (props: ProductItemProps) => {
  const { image, name, options, price, salePrice, children } = props
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const [expanded, setExpanded] = React.useState(true)

  return (
    <Box sx={{ display: 'flex', pb: 2, pr: 1, gap: '3%', flex: 1 }}>
      <Box sx={{ ...styles.imageContainer }}>
        <CardMedia
          component="img"
          image={image || DefaultImage}
          alt={name}
          sx={{ ...styles.image }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, marginRight: '1rem' }}>
        <CardContent sx={{ py: 0, px: 1 }}>
          <Typography variant="h4" data-testid="productName">
            {name}
          </Typography>

          {children}

          <Box data-testid="productDetails">
            <Hidden only="lg">
              <Box
                display="flex"
                alignItems="center"
                width="fit-content"
                sx={{ cursor: 'pointer' }}
                pb={1}
                onClick={() => setExpanded(!expanded)}
              >
                <Typography variant="body2" align="left" sx={{ mr: 1 }}>
                  Details
                </Typography>
                {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Box>
            </Hidden>

            <Collapse in={mdScreen ? true : expanded} timeout="auto" unmountOnExit>
              <ProductOptionList options={options} />

              {(price || salePrice) && (
                <Box sx={{ display: 'inline-flex' }}>
                  <Typography variant="body2" fontWeight="bold" component="span" sx={{ pr: 1 }}>
                    {t('price')}:
                  </Typography>
                  <Price variant="body2" fontWeight="normal" price={price} salePrice={salePrice} />
                </Box>
              )}
            </Collapse>
          </Box>
        </CardContent>
      </Box>
    </Box>
  )
}

export default ProductItem
