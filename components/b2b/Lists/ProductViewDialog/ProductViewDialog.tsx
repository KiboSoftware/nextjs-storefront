import React from 'react'

import { ExpandMore } from '@mui/icons-material'
import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { KeyValueDisplay, KiboDialog, KiboImage } from '@/components/common'
import { ProductOptionList } from '@/components/product'
import { productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import DefaultImage from '@/public/product_placeholder.svg'

import { CrProductOption, CrWishlistItem } from '@/lib/gql/types'

export interface ProductViewDialogProps {
  item: CrWishlistItem
  onClose: () => void
}

export interface ProductViewProps {
  item: CrWishlistItem
}

const ProductView = (props: ProductViewProps) => {
  const { item } = props
  const { product } = item

  const { t } = useTranslation('common')

  const { getProductLink } = uiHelpers()

  return (
    <>
      <Container sx={{ padding: '5%' }} data-testid="product-modal">
        <Grid container>
          <Grid item sm={3}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              position={'relative'}
              minWidth={'80px'}
              sx={{ aspectRatio: 1 }}
            >
              <Link href={getProductLink(product?.productCode as string) || ''} passHref>
                <KiboImage
                  src={
                    productGetters.handleProtocolRelativeUrl(product?.imageUrl as string) ||
                    DefaultImage
                  }
                  alt={product?.name as string}
                  width={80}
                  height={80}
                />
              </Link>
            </Box>
          </Grid>
          <Grid item sm={9}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {product?.name}
            </Typography>
            <Box>
              <Typography data-testid="productCode">
                {t('product-code')}: {product?.variationProductCode || product?.productCode}
              </Typography>
              <Typography>
                {item.subtotal && (
                  <KeyValueDisplay
                    option={{
                      name: t('total'),
                      value: `$${item.subtotal}`,
                    }}
                    sx={{ fontSize: '14px' }}
                    variant="body1"
                  />
                )}
              </Typography>
              <Box data-testid="productPrice">
                <KeyValueDisplay
                  option={{
                    name: t('list-item'),
                    value: `$${product?.price?.price}`,
                  }}
                  sx={{ fontStyle: 'italic', display: 'inline', fontSize: '12px' }}
                  variant="body2"
                />
              </Box>

              {product?.options?.length && (
                <ProductOptionList options={productGetters.getOptions(product)} />
              )}
            </Box>
            {product?.description && (
              <Box>
                <Accordion
                  disabled={false}
                  sx={{
                    border: 'none',
                    borderBottom: `1px solid  ${grey[500]}`,
                    boxShadow: 'none',
                    borderRadius: '0px',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ padding: '0px' }}
                  >
                    <Typography>{'description'}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{product?.description}</Typography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

const ProductViewDialog = (props: ProductViewDialogProps) => {
  const { t } = useTranslation('common')

  return (
    <KiboDialog
      showCloseButton
      Title={t('product-configuration-option')}
      isAlignTitleCenter={true}
      showContentTopDivider={true}
      showContentBottomDivider={false}
      onClose={props.onClose}
      Actions={''}
      Content={
        <Box>
          <ProductView item={props.item} />
        </Box>
      }
    />
  )
}
export default ProductViewDialog
