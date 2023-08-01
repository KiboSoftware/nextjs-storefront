import React, { useState } from 'react'

import { ExpandMore } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
  AccordionDetails,
  AccordionSummary,
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
import labels from '@/public/locales/en/common.json'

const calculateProductSubTotal = (price: any, quantity: number) => {
  if (price) return price.salePrice ? price.salePrice * quantity : price.price * quantity
  return 0
}

const Accordion = (props: any) => {
  return (
    <Box>
      <Accordion
        disabled={props.disabled}
        style={{
          ...props.style,
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
          <Typography>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{props.content}</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

const ProductView = (props: any) => {
  const { item } = props
  const { product } = item
  return (
    <>
      <Container style={{ padding: '70px' }}>
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
                Product Code: {product?.productCode}
              </Typography>
              <Typography>
                <Typography component={'strong'}>Price: </Typography> <br />
                <Typography component={'span'} style={{ color: '#E42D00' }}>
                  $ {calculateProductSubTotal(product.price, item.quantity)}
                </Typography>
              </Typography>
              <Typography
                style={{ fontStyle: 'italic', fontSize: '13px' }}
                data-testid="productPrice"
              >
                Line Item -{calculateProductSubTotal(product?.price, item.quantity)}
              </Typography>
            </Box>
            <Box>
              {/* <Accordion
                title="Description"
                disabled={false}
                content={props.item.product.description}
              /> */}
              {/* <Accordion
                title="Properties"
                disabled={false}
                content={`Development in progress`}
                style={{}}
              /> */}
              {/* <Accordion
                title="Measurements"
                disabled={false}
                content={`Development in progress`}
                style={{}}
              /> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

const WishlistItem = (props: any) => {
  const { item, onChangeQuantity, onDeleteItem } = props
  const { product, quantity } = item
  const theme = useTheme()
  const { t } = useTranslation()
  const mdScreen = useMediaQuery<boolean>(theme.breakpoints.up('md'))
  const [quantityState, setQuantityState] = useState(quantity)
  const [open, setOpen] = useState(false)

  function handleChangeQuantity(e: number) {
    setQuantityState(e)
    onChangeQuantity(product.lineId, e)
  }

  const handleQuantityIncrease = () => {
    setQuantityState(quantityState + 1)
    onChangeQuantity(product.lineId, quantityState)
  }

  const handleQuantityDecrease = () => {
    setQuantityState(quantityState - 1)
    onChangeQuantity(product.lineId, quantityState)
  }

  function openEditModal() {
    setOpen(true)
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
                <strong>{labels.total}: </strong>$
                {calculateProductSubTotal(product?.price, quantity)}
                <Box style={{ color: '#7c7c7c', fontSize: '12px', marginBottom: '12px' }}>
                  <em>
                    {t('list-item')} - ${product?.price.price}
                  </em>
                </Box>
              </Box>
            </>
          )}
          <Box>
            <strong>Qty: </strong>
            <QuantitySelector
              quantity={quantityState}
              onIncrease={handleQuantityIncrease}
              onDecrease={handleQuantityDecrease}
              onQuantityUpdate={handleChangeQuantity}
            />
          </Box>
          <Typography data-testid="productCode">
            <strong>Product Code: </strong>
            {item?.product?.productCode}
          </Typography>
          {mdScreen ? (
            <>
              <Box>
                <strong>{labels.total}: </strong>$
                {calculateProductSubTotal(product?.price, quantity)}
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
            <Button onClick={openEditModal} startIcon={<EditIcon />} sx={style.buttons.tableAction}>
              {mdScreen ? 'Edit Item' : ''}
            </Button>
            <Button
              sx={style.buttons.tableAction}
              aria-label="delete"
              id={props.item.id}
              onClick={() => onDeleteItem(product.lineId)}
              startIcon={<DeleteIcon />}
            >
              {mdScreen ? 'Remove' : ''}
            </Button>
          </div>
        </Grid>
      </Grid>
      <KiboDialog
        isOpen={open}
        showCloseButton
        Title={'Product Configuration Option'}
        isAlignTitleCenter={true}
        showContentTopDivider={true}
        showContentBottomDivider={false}
        Actions={''}
        onClose={() => setOpen(false)}
        Content={
          <Box>
            <ProductView item={item} closeModal={() => setOpen(false)} />
          </Box>
        }
        customMaxWidth="800px"
      />
    </>
  )
}
export default WishlistItem
