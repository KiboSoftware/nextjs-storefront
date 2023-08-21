import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { ProductViewDialog } from '@/components/b2b'
import { QuantitySelector, KeyValueDisplay } from '@/components/common'
import { useModalContext } from '@/context'

import { CrWishlistItem } from '@/lib/gql/types'

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
      <Grid container sx={{ borderBottom: `1px solid ${grey[300]}`, padding: '10px 0' }}>
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
            sx={{ marginBottom: mdScreen ? '10px' : '8px', marginTop: '0' }}
            fontWeight={'bold'}
          >
            {product?.name}
          </Typography>
          {!mdScreen && (
            <>
              <Box>
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

                <Box sx={{ marginBottom: '12px' }}>
                  <KeyValueDisplay
                    option={{
                      name: t('list-item'),
                      value: `$${product?.price?.price}`,
                    }}
                    sx={{ fontStyle: 'italic', display: 'inline', fontSize: '12px' }}
                    variant="body2"
                  />
                </Box>
              </Box>
            </>
          )}
          <Box>
            <KeyValueDisplay
              option={{
                name: t('qty'),
                value: (
                  <QuantitySelector
                    quantity={quantityState}
                    onIncrease={handleQuantityIncrease}
                    onDecrease={handleQuantityDecrease}
                    onQuantityUpdate={handleChangeQuantity}
                  />
                ),
              }}
              variant="subtitle1"
            />
          </Box>
          <Box data-testid="productCode">
            <KeyValueDisplay
              option={{
                name: t('product-code'),
                value: product?.productCode,
              }}
              variant="subtitle2"
            />
          </Box>

          {mdScreen && (
            <Box component="span">
              {item.subtotal && (
                <KeyValueDisplay
                  option={{
                    name: t('total'),
                    value: `$${item.subtotal}`,
                  }}
                  sx={{ fontSize: '14px', marginRight: '10px' }}
                  variant="body1"
                />
              )}

              <KeyValueDisplay
                option={{
                  name: t('list-item'),
                  value: `$${product?.price?.price}`,
                }}
                sx={{ fontStyle: 'italic', display: 'inline', fontSize: '12px' }}
                variant="body2"
              />
            </Box>
          )}
        </Grid>
        <Grid item xs={2} flexDirection="row" alignItems={mdScreen ? 'center' : 'flex-start'}>
          <Button
            onClick={openEditModal}
            startIcon={<EditIcon />}
            data-testid="product-modal-btn"
            color="inherit"
            sx={{ minWidth: '20px', padding: '0px', marginRight: mdScreen ? '10px' : 0 }}
            disableTouchRipple
          >
            {mdScreen ? t('edit-item') : ''}
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
            {mdScreen ? t('remove') : ''}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
export default ListItem
