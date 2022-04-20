import React, { ReactNode, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Typography,
  Box,
  CardMedia,
  CardContent,
  Collapse,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import Price from '@/components/common/Price/Price'
import ProductOptionList from '@/components/product/ProductOptionList/ProductOptionList'
import DefaultImage from '@/public/product_placeholder.svg'

import type { CrProductOption } from '@/lib/gql/types'
export interface ProductItemProps {
  image: string
  name: string
  options: CrProductOption[]
  price?: string
  salePrice?: string
  qty?: number
  children?: ReactNode
}

const styles = {
  imageContainer: {
    maxHeight: 150,
    maxWidth: 150,
    width: '45%',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}

const ProductLabel = (props: { label: string }) => (
  <Typography
    variant="body2"
    fontWeight="bold"
    component="span"
    sx={{ pr: 1 }}
    data-testid="productLabel"
  >
    {`${props.label}:`}
  </Typography>
)

const ProductItem = (props: ProductItemProps) => {
  const { image, name, options, price, salePrice, qty, children } = props
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))

  const [expanded, setExpanded] = useState<boolean>(true)

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
          <Typography variant="h4" data-testid="productName" pb={0.375}>
            {name}
          </Typography>

          {children}

          <Box data-testid="productDetails">
            <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
              <Box
                display="flex"
                alignItems="center"
                width="fit-content"
                sx={{ cursor: 'pointer', pb: 0.125 }}
                onClick={() => setExpanded(!expanded)}
              >
                <Typography variant="body2" align="left" sx={{ mr: 1 }}>
                  {t('details')}
                </Typography>

                {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Box>
            </Box>
            <Collapse in={mdScreen ? true : expanded} timeout="auto" unmountOnExit>
              <ProductOptionList options={options} />

              {qty && (
                <Box>
                  <ProductLabel label={t('qty')} /> {qty}
                </Box>
              )}
              {(price || salePrice) && (
                <Box sx={{ display: 'inline-flex' }}>
                  <ProductLabel label={t('price')} />
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
