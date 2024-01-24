import React, { ReactNode, useState } from 'react'

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
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
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { KiboImage, Price, KeyValueDisplay } from '@/components/common'
import { ProductOptionList } from '@/components/product'
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
  showChangeStoreLink?: boolean
  isQuickOrder?: boolean
  discounts?: any
  onStoreLocatorClick?: () => void
}

const styles = {
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    minWidth: '80px',
    aspectRatio: 1,
  },
}

const ProductItem = (props: ProductItemProps) => {
  const {
    id,
    productCode,
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
    isQuickOrder = false,
    subscriptionFrequency,
    showChangeStoreLink,
    discounts,
    onStoreLocatorClick,
  } = props
  const { t } = useTranslation('common')
  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const [expanded, setExpanded] = useState<boolean>(true)

  return (
    <Box key={id}>
      <Box sx={{ display: 'flex', pb: 1, pr: 1, gap: 2, flex: 1 }}>
        <Box sx={{ ...styles.imageContainer }}>
          <Link href={link || ''} passHref>
            <KiboImage
              src={productGetters.handleProtocolRelativeUrl(image) || DefaultImage}
              alt={name}
              width={80}
              height={80}
            />
          </Link>
        </Box>

        <Stack mr={1} flex={1}>
          <CardContent
            sx={{
              py: 0,
              px: 1,
              '&.MuiCardContent-root:last-child': {
                pb: 0,
              },
            }}
          >
            <Typography variant="subtitle2" data-testid="productName" pb={0.375}>
              {name}
            </Typography>
            {isQuickOrder && productCode && (
              <Box data-testid="product-code">
                <KeyValueDisplay
                  option={{ name: 'Code', value: productCode }}
                  variant="body2"
                  fontWeight="bold"
                />
              </Box>
            )}

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

                {qty && <KeyValueDisplay option={{ name: t('qty'), value: qty }} variant="body2" />}
                {(price || salePrice) && (
                  <KeyValueDisplay
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
                {discounts?.map((discount: any) => (
                  <KeyValueDisplay
                    key={`${discount?.discount?.name}`}
                    color="error.main"
                    option={{
                      name: `${discount?.discount?.name}:`,
                      value: `-${t('currency', { val: discount?.impact })} `,
                    }}
                  />
                ))}
                {subscriptionFrequency && (
                  <Box pb={1}>
                    <KeyValueDisplay
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
                  <KeyValueDisplay
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
            <KeyValueDisplay
              option={{ name: t('pickup'), value: purchaseLocation }}
              variant="caption"
            />
          </Box>
          {showChangeStoreLink && (
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
          )}
        </>
      )}
    </Box>
  )
}

export default ProductItem
