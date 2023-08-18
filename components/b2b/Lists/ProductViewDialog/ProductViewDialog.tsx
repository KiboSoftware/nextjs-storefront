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
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { KiboDialog } from '@/components/common'

import { CrProductPrice, CrWishlistItem } from '@/lib/gql/types'

export interface ProductViewDialogProps {
  item: CrWishlistItem
  onClose: () => void
}

export interface ProductViewProps {
  item: CrWishlistItem
}

const calculateProductSubTotal = (price: CrProductPrice, quantity: number) => {
  if (price)
    return price.salePrice
      ? (price.salePrice * quantity).toFixed(2)
      : ((price.price as number) * quantity).toFixed(2)
  return 0
}

const ProductView = (props: ProductViewProps) => {
  const { item } = props
  const { product } = item

  const { t } = useTranslation('common')

  return (
    <>
      <Container sx={{ padding: '70px' }} data-testid="product-modal">
        <Grid container>
          <Grid item sm={3}>
            {product?.imageUrl ? (
              <Image
                src={`https:${product.imageUrl}`}
                alt={product?.name as string}
                width={70}
                height={70}
              />
            ) : null}
          </Grid>
          <Grid item sm={9}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {product?.name}
            </Typography>
            <Box>
              <Typography data-testid="productCode">
                {t('product-code')}: {product?.productCode}
              </Typography>
              <Typography>
                <Typography component={'strong'}>{t('price')}: </Typography> <br />
                <Typography component={'span'} sx={{ color: '#E42D00' }}>
                  $ {calculateProductSubTotal(product?.price as CrProductPrice, item.quantity)}
                </Typography>
              </Typography>
              <Typography sx={{ fontStyle: 'italic', fontSize: '13px' }} data-testid="productPrice">
                {t('line-item')} -
                {calculateProductSubTotal(product?.price as CrProductPrice, item.quantity)}
              </Typography>
            </Box>
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
      customMaxWidth="800px"
    />
  )
}
export default ProductViewDialog
