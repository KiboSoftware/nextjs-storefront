import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import { ProductViewDialog } from '@/components/b2b'
import { QuantitySelector, KeyValueDisplay, KiboImage, Price } from '@/components/common'
import { ProductOptionList } from '@/components/product'
import { useModalContext } from '@/context'
import { cartGetters, productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import DefaultImage from '@/public/product_placeholder.svg'

import { CrOrderItem, CrProductOption, CrWishlistItem } from '@/lib/gql/types'

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
  const [itemQuantity, setItemQuantity] = useState(item?.quantity || 1)

  const { getProductLink } = uiHelpers()

  const handleQuantityUpdate = (quantity: number) => {
    setItemQuantity(quantity)
    onChangeQuantity(item.id ? item.id : (product?.productCode as string), quantity)
  }

  function openViewDetailsModal() {
    showModal({
      Component: ProductViewDialog,
      props: {
        onClose: closeModal,
        item: item,
      },
    })
  }

  return (
    <Grid container sx={{ borderBottom: `1px solid ${grey[300]}`, padding: '10px 0' }}>
      <Grid item xs={mdScreen ? 2 : 3}>
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
      <Grid item xs={mdScreen ? 8 : 7}>
        <Typography
          sx={{ marginBottom: mdScreen ? '10px' : '8px', marginTop: '0' }}
          fontWeight={'bold'}
        >
          {product?.name}
        </Typography>
        {!mdScreen && (
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
        )}
        <Box>
          <KeyValueDisplay
            option={{
              name: t('qty'),
              value: (
                <QuantitySelector
                  quantity={item?.quantity}
                  onIncrease={() => handleQuantityUpdate(itemQuantity + 1)}
                  onDecrease={() => handleQuantityUpdate(itemQuantity - 1)}
                  onQuantityUpdate={(q) => handleQuantityUpdate(q)}
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
              value: product?.variationProductCode || product?.productCode,
            }}
            variant="subtitle2"
          />
        </Box>
        <Box data-testid="options">
          {product?.options && (
            <ProductOptionList options={product?.options as CrProductOption[]} />
          )}
        </Box>

        {mdScreen && (
          <Box component="span">
            {item.subtotal && (
              <KeyValueDisplay
                option={{
                  name: t('total'),
                  value: (
                    <Price
                      variant="body2"
                      fontWeight="bold"
                      price={t('currency', {
                        val: cartGetters.getLineItemPrice(item as CrOrderItem).regular?.toString(),
                      })}
                      salePrice={
                        cartGetters.getLineItemPrice(item as CrOrderItem).special
                          ? t('currency', {
                              val: cartGetters.getLineItemPrice(item as CrOrderItem).special,
                            })
                          : undefined
                      }
                    />
                  ),
                }}
                sx={{ fontSize: '14px', marginRight: '10px' }}
                variant="body1"
              />
            )}
            {item?.productDiscounts?.map((discount) => (
              <KeyValueDisplay
                key={`${discount?.discount?.name}`}
                color="error.main"
                option={{
                  name: `${discount?.discount?.name}:`,
                  value: `-${t('currency', { val: discount?.impact })} `,
                }}
              />
            ))}
          </Box>
        )}
      </Grid>
      <Grid item xs={2} flexDirection="row" alignItems={mdScreen ? 'center' : 'flex-start'}>
        <Button
          onClick={openViewDetailsModal}
          data-testid="product-modal-btn"
          color="inherit"
          sx={{ minWidth: '20px', padding: '0px', marginRight: mdScreen ? '10px' : 0 }}
          disableTouchRipple
        >
          {mdScreen ? t('view-details') : ''}
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
  )
}
export default ListItem
