import React, { ReactNode, SyntheticEvent, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Typography,
  Box,
  CardContent,
  Collapse,
  useMediaQuery,
  useTheme,
  Link,
  Stack,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboImage from '@/components/common/KiboImage/KiboImage'
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
  isPickupItem?: boolean
  estimatedPickupDate?: string
  itemPurchaseLocation?: string
  handleStoreLocatorClick?: () => void
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
  const {
    image,
    name,
    options,
    price,
    salePrice,
    qty,
    isPickupItem,
    estimatedPickupDate,
    itemPurchaseLocation,
    handleStoreLocatorClick,
    children,
  } = props

  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const [expanded, setExpanded] = useState<boolean>(true)

  return (
    <Box>
      <Box sx={{ display: 'flex', pb: 2, pr: 1, gap: '3%', flex: 1 }}>
        <Box sx={{ ...styles.imageContainer }}>
          <KiboImage
            src={image || DefaultImage}
            height={200}
            width={200}
            alt={name}
            objectFit="contain"
            errorimage={DefaultImage}
          />
        </Box>

        <Stack mr={1}>
          <CardContent sx={{ py: 0, px: 1 }}>
            <Typography variant="h4" data-testid="productName" pb={0.375}>
              {name}
            </Typography>

            {children}

            <Box data-testid="productDetails">
              <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
                {(options.length > 0 || price || qty) && (
                  <Box
                    display="flex"
                    alignItems="center"
                    width="fit-content"
                    sx={{ cursor: 'pointer' }}
                    pb={0.125}
                    onClick={() => setExpanded(!expanded)}
                  >
                    <Typography variant="body2" align="left" sx={{ mr: 1 }}>
                      {t('details')}
                    </Typography>
                    {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </Box>
                )}
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
                    <Price
                      variant="body2"
                      fontWeight="normal"
                      price={price}
                      salePrice={salePrice}
                    />
                  </Box>
                )}
              </Collapse>
              {isPickupItem && estimatedPickupDate && (
                <Box sx={{ display: 'inline-flex' }} color={theme.palette.primary.main}>
                  <Typography variant="body2" fontWeight="bold">
                    {t('estimated-pickup')}: {estimatedPickupDate}
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Stack>
      </Box>
      {isPickupItem && (
        <>
          <Box sx={{ display: 'inline-flex' }}>
            <Typography variant="caption" fontWeight="bold" pl={2}>
              {t('pickup')}:
            </Typography>
            <Typography variant="caption" pl={1}>
              {itemPurchaseLocation}
            </Typography>
          </Box>
          <Box px={2}>
            <Link
              component="button"
              variant="caption"
              color="text.primary"
              onClick={() => handleStoreLocatorClick}
            >
              {itemPurchaseLocation ? t('change-store') : t('select-store')}
            </Link>
          </Box>
        </>
      )}
    </Box>
  )
}

export default ProductItem
