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
import { useModalContext } from '@/context'

import { CrProductPrice, CrWishlistItem } from '@/lib/gql/types'

export interface ListItemProps {
  item: CrWishlistItem
  onDeleteItem: (param: string) => void
  onChangeQuantity: (param1: string, param2: number) => void
  listId?: string
}

export interface ProductViewProps {
  item: CrWishlistItem
}

export interface ProductViewDialogProps {
  item: CrWishlistItem
  onClose: () => void
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
                  borderBottom: '1px solid #C7C7C7',
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

const ListItem = (props: ListItemProps) => {
  const { item, onChangeQuantity, onDeleteItem } = props
  const { product } = item

  const { showModal, closeModal } = useModalContext()
  const theme = useTheme()
  const { t } = useTranslation('common')
  const mdScreen = useMediaQuery<boolean>(theme.breakpoints.up('md'))
  const [quantityState, setQuantityState] = useState(item.quantity)

  function handleChangeQuantity(e: number) {
    setQuantityState(e)
    onChangeQuantity(item.id ? item.id : (product?.productCode as string), e)
  }

  const handleQuantityIncrease = () => {
    setQuantityState(quantityState + 1)
    onChangeQuantity(item.id ? item.id : (product?.productCode as string), quantityState)
  }

  const handleQuantityDecrease = () => {
    setQuantityState(quantityState - 1)
    onChangeQuantity(item.id ? item.id : (product?.productCode as string), quantityState)
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
      <Grid container sx={{ borderBottom: '1px solid #CDCDCD', padding: '10px 0' }}>
        <Grid item xs={mdScreen ? 2 : 3}>
          {product?.imageUrl ? (
            <Image
              src={`https:${product.imageUrl}`}
              alt={product?.name as string}
              width={70}
              height={70}
            />
          ) : null}
        </Grid>
        <Grid item xs={mdScreen ? 8 : 7}>
          <Typography
            sx={{ marginBottom: mdScreen ? '10px' : '8px', marginTop: '0', fontWeight: 'bold' }}
          >
            <strong>{product?.name}</strong>
          </Typography>
          {mdScreen ? (
            <></>
          ) : (
            <>
              <Box sx={{ fontSize: '14px' }}>
                <strong>{t('total')}: </strong>$
                {calculateProductSubTotal(product?.price as CrProductPrice, item.quantity)}
                <Box sx={{ color: '#7c7c7c', fontSize: '12px', marginBottom: '12px' }}>
                  <em>
                    {t('list-item')} - ${product?.price?.price}
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
                <strong>{t('total')}: </strong>$
                {calculateProductSubTotal(product?.price as CrProductPrice, item.quantity)}
                <Box sx={{ marginLeft: '10px', display: 'inline' }}>
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
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: mdScreen ? 'center' : 'flex-start',
          }}
        >
          <Button
            onClick={openEditModal}
            startIcon={<EditIcon />}
            data-testid="product-modal-btn"
            color="inherit"
            sx={{ minWidth: '20px', padding: '0px', marginRight: mdScreen ? '10px' : 0 }}
            disableTouchRipple
          >
            {mdScreen ? 'Edit Item' : ''}
          </Button>
          <Button
            color="inherit"
            aria-label="delete"
            id={item.id as string}
            onClick={() => onDeleteItem(item.id ? item.id : (product?.productCode as string))}
            startIcon={<DeleteIcon />}
            sx={{ minWidth: '20px', padding: '0px' }}
            disableTouchRipple
          >
            {mdScreen ? 'Remove' : ''}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
export default ListItem
