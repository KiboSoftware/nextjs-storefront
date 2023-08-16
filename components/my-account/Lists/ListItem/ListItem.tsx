import React, { useState } from 'react'

import { ExpandMore } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { KiboDialog, QuantitySelector } from '@/components/common'
import style from '@/components/my-account/Lists/ListItem/ListItem.style'
import { useModalContext } from '@/context'

import { CrProductPrice } from '@/lib/gql/types'

export interface ListItemProps {
  item: {
    product: {
      productName: string
      productCode: string
      price: CrProductPrice
      productImage: string
      productImageAltText: string
      lineId?: string
      productDescription: string
    }
    quantity: number
  }
  onDeleteItem: (param: string) => void
  onChangeQuantity: (param1: string, param2: number) => void
  listId?: string
}

export interface ProductViewProps {
  item: {
    product: {
      productName: string
      productCode: string
      price: CrProductPrice
      productImage: string
      productImageAltText: string
      lineId?: string
      productDescription: string
    }
    quantity: number
  }
}

export interface ProductViewDialogProps {
  item: {
    product: {
      productName: string
      productCode: string
      price: CrProductPrice
      productImage: string
      productImageAltText: string
      lineId?: string
      productDescription: string
    }
    quantity: number
  }
  onClose: () => void
}

const calculateProductSubTotal = (price: any, quantity: number) => {
  if (price)
    return price.salePrice
      ? (price.salePrice * quantity).toFixed(2)
      : (price.price * quantity).toFixed(2)
  return 0
}

const ProductView = (props: ProductViewProps) => {
  const { item } = props
  const { product } = item

  const { t } = useTranslation('common')

  return (
    <>
      <Container style={{ padding: '70px' }} data-testid="product-modal">
        <Grid container>
          <Grid item sm={3}>
            {product.productImage ? (
              <Image
                src={`https:${product.productImage}`}
                alt={product?.productName}
                width={70}
                height={70}
              />
            ) : null}
          </Grid>
          <Grid item sm={9}>
            <Typography variant="h3" style={{ fontWeight: 'bold' }}>
              {product?.productName}
            </Typography>
            <Box>
              <Typography data-testid="productCode">
                {t('product-code')}: {product?.productCode}
              </Typography>
              <Typography>
                <Typography component={'strong'}>{t('price')}: </Typography> <br />
                <Typography component={'span'} style={{ color: '#E42D00' }}>
                  $ {calculateProductSubTotal(product.price, item.quantity)}
                </Typography>
              </Typography>
              <Typography
                style={{ fontStyle: 'italic', fontSize: '13px' }}
                data-testid="productPrice"
              >
                {t('line-item')} -{calculateProductSubTotal(product?.price, item.quantity)}
              </Typography>
            </Box>
            <Box>
              <Accordion
                disabled={false}
                style={{
                  border: 'none',
                  borderBottom: '1px solid #C7C7C7',
                  boxShadow: 'none',
                  borderRadius: '0px',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ padding: '0px' }}
                >
                  <Typography>{'description'}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{product.productDescription}</Typography>
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

const ListItem = (props: ListItemProps) => {
  const { item, onChangeQuantity, onDeleteItem } = props
  const { product, quantity } = item

  const { showModal, closeModal } = useModalContext()
  const theme = useTheme()
  const { t } = useTranslation('common')
  const mdScreen = useMediaQuery<boolean>(theme.breakpoints.up('md'))
  const [quantityState, setQuantityState] = useState(quantity)

  function handleChangeQuantity(e: number) {
    setQuantityState(e)
    onChangeQuantity(product.lineId ? product.lineId : product.productCode, e)
  }

  const handleQuantityIncrease = () => {
    setQuantityState(quantityState + 1)
    onChangeQuantity(product.lineId ? product.lineId : product.productCode, quantityState)
  }

  const handleQuantityDecrease = () => {
    setQuantityState(quantityState - 1)
    onChangeQuantity(product.lineId ? product.lineId : product.productCode, quantityState)
  }

  function openEditModal() {
    showModal({
      Component: ProductViewDialog,
      props: {
        onClose: closeModal,
        item: item,
      },
    })
  }

  return (
    <>
      <Grid container style={{ borderBottom: '1px solid #CDCDCD', padding: '10px 0' }}>
        <Grid item xs={mdScreen ? 2 : 3}>
          {product.productImage ? (
            <Image
              src={`https:${product.productImage}`}
              alt={product?.productName}
              width={70}
              height={70}
            />
          ) : null}
        </Grid>
        <Grid item xs={mdScreen ? 8 : 7}>
          <Typography
            sx={{ marginBottom: mdScreen ? '10px' : '8px', marginTop: '0', fontWeight: 'bold' }}
          >
            <strong>{product?.productName}</strong>
          </Typography>
          {mdScreen ? (
            <></>
          ) : (
            <>
              <Box style={{ fontSize: '14px' }}>
                <strong>{t('total')}: </strong>${calculateProductSubTotal(product?.price, quantity)}
                <Box style={{ color: '#7c7c7c', fontSize: '12px', marginBottom: '12px' }}>
                  <em>
                    {t('list-item')} - ${product?.price.price}
                  </em>
                </Box>
              </Box>
            </>
          )}
          <Box>
            <strong>{t('qty')}: </strong>
            <QuantitySelector
              quantity={quantityState}
              onIncrease={handleQuantityIncrease}
              onDecrease={handleQuantityDecrease}
              onQuantityUpdate={handleChangeQuantity}
            />
          </Box>
          <Typography data-testid="productCode">
            <strong>{t('product-code')}: </strong>
            {product?.productCode}
          </Typography>
          {mdScreen ? (
            <>
              <Box>
                <strong>{t('total')}: </strong>${calculateProductSubTotal(product?.price, quantity)}
                <Box style={{ marginLeft: '10px', display: 'inline' }}>
                  <em style={{ color: '#7c7c7c', fontSize: '14px' }} data-testid="productPrice">
                    {t('list-item')} - ${product?.price?.price}
                  </em>
                </Box>
              </Box>
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: mdScreen ? 'center' : 'flex-start',
          }}
        >
          <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'row' }}>
            <Button
              onClick={openEditModal}
              startIcon={<EditIcon />}
              sx={style.buttons.tableAction}
              data-testid="product-modal-btn"
            >
              {mdScreen ? 'Edit Item' : ''}
            </Button>
            <Button
              sx={style.buttons.tableAction}
              aria-label="delete"
              id={product.lineId}
              onClick={() => onDeleteItem(product.lineId ? product.lineId : product.productCode)}
              startIcon={<DeleteIcon />}
            >
              {mdScreen ? 'Remove' : ''}
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  )
}
export default ListItem
