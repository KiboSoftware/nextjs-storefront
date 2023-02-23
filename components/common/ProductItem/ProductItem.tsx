import React, { ReactNode, useState } from 'react'

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import {
  Typography,
  Box,
  CardContent,
  Collapse,
  useMediaQuery,
  useTheme,
  Link as MuiLink,
  Stack,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

import { KiboImage, Price } from '@/components/common'
import { ProductOption, ProductOptionList } from '@/components/product'
import { productGetters } from '@/lib/getters'
import DefaultImage from '@/public/product_placeholder.svg'

import type { Maybe, CrProductOption } from '@/lib/gql/types'

export interface ProductItemProps {
  id?: Maybe<string>
  productCode?: Maybe<string>
  image: string
  name: string
  options?: CrProductOption[]
  price?: string
  salePrice?: string
  qty?: number
  isPickupItem?: boolean
  expectedDeliveryDate?: string
  purchaseLocation?: string
  link?: string
  children?: ReactNode
  width?: string
  subscriptionFrequency?: string
  onStoreLocatorClick?: () => void
}

const styles = {
  imageContainer: {
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
}

const ProductItem = (props: ProductItemProps) => {
  const {
    id,
    image,
    name,
    options,
    price,
    salePrice,
    qty,
    isPickupItem,
    expectedDeliveryDate,
    purchaseLocation,
    link,
    children,
    width = '25%',
    subscriptionFrequency,
    onStoreLocatorClick,
  } = props
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const [expanded, setExpanded] = useState<boolean>(true)

  return (
    <Box key={id}>
      <Box sx={{ display: 'flex', pb: 1, pr: 1, gap: 2, flex: 1 }}>
        <Box sx={{ ...styles.imageContainer, width }}>
          <Link href={link || ''} passHref>
            <KiboImage
              src={productGetters.handleProtocolRelativeUrl(image) || DefaultImage}
              layout="fill"
              alt={name}
              objectFit="contain"
              errorimage={DefaultImage}
            />
          </Link>
        </Box>

        <Stack mr={1} flex={1}>
          <CardContent sx={{ py: 0, px: 1 }}>
            <Typography variant="h4" data-testid="productName" pb={0.375}>
              {name}
            </Typography>

            {children}

            <Box data-testid="productDetails">
              <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
                {((options && options?.length > 0) || price || qty) && (
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
                    {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </Box>
                )}
              </Box>

              <Collapse in={mdScreen ? true : expanded} timeout="auto" unmountOnExit>
                {options && <ProductOptionList options={options} />}

                {qty && <ProductOption option={{ name: t('qty'), value: qty }} variant="body2" />}
                {(price || salePrice) && (
                  <ProductOption
                    option={{
                      name: t('price'),
                      value: (
                        <Price
                          variant="body2"
                          fontWeight="normal"
                          price={t('currency', { val: price })}
                          salePrice={salePrice && t('currency', { val: salePrice })}
                        />
                      ),
                    }}
                    variant="body2"
                  />
                )}
                {subscriptionFrequency && (
                  <Box pb={1}>
                    <ProductOption
                      option={{
                        name: t('subscription-frequency'),
                        value: subscriptionFrequency,
                      }}
                    />
                  </Box>
                )}
              </Collapse>
              {isPickupItem && expectedDeliveryDate && (
                <Box color={theme.palette.primary.main} data-testid="pickup-info">
                  <ProductOption
                    option={{ name: t('estimated-pickup'), value: expectedDeliveryDate }}
                    variant="body2"
                    fontWeight="bold"
                  />
                </Box>
              )}
            </Box>
          </CardContent>
        </Stack>
      </Box>

      {isPickupItem && (
        <>
          <Box sx={{ display: 'inline-flex' }} px={2}>
            <ProductOption
              option={{ name: t('pickup'), value: purchaseLocation }}
              variant="caption"
            />
          </Box>
          <Box px={2}>
            <MuiLink
              component="button"
              variant="caption"
              color="text.primary"
              onClick={onStoreLocatorClick}
            >
              {purchaseLocation ? t('change-store') : t('select-store')}
            </MuiLink>
          </Box>
        </>
      )}
    </Box>
  )
}

export default ProductItem
