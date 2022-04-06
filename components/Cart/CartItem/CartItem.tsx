import { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Card, Divider, Hidden, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTranslation } from 'next-i18next'

import CartItemActions from '@/components/Cart/CartItemActions/CartItemActions'
import FulfillmentOptions from '@/components/common/FulfillmentOptions/FulfillmentOptions'
import ProductItem from '@/components/common/ProductItem/ProductItem'
import QuantitySelector from '@/components/common/QuantitySelector/QuantitySelector'

import type { CartItem as CartItemType, CrProductOption } from '@/lib/gql/types'

const styles = {
  card: {
    marginBottom: '1.5rem',
    border: {
      xs: 'none',
      lg: `2px solid ${grey[200]}`,
    },
    boxShadow: 'none',
  },
  cartItemContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      lg: 'row',
    },
    padding: '1rem 0.5rem',
    justifyContent: 'space-around',
  },
  subcontainer: {
    flex: 1,
    padding: '0 0.5rem',
  },
  icon: {
    alignItems: 'flex-start',
    margin: '0',
    position: 'absolute',
    top: 0,
    right: 0,
  },
}

interface CartItemProps {
  cartItem: CartItemType
}

const onDelete = () => {
  // Handle Delete Item
}

const CartItem = (props: CartItemProps) => {
  const { cartItem } = props

  const { t } = useTranslation('common')
  const theme = useTheme()

  const orientationVertical = useMediaQuery(theme.breakpoints.up('md'))

  const [quantity, setQuantity] = useState<number>(1)

  return (
    <>
      <Card sx={{ ...styles.card }}>
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ ...styles.cartItemContainer }}>
            <Box sx={{ ...styles.subcontainer }}>
              <ProductItem
                image={cartItem.product?.imageUrl || ''}
                name={cartItem.product?.name || ''}
                options={cartItem.product?.options as Array<CrProductOption>}
                price={cartItem.product?.price?.price || 0}
              >
                <Box sx={{ py: '0.5rem' }}>
                  <QuantitySelector
                    quantity={quantity}
                    label={t('qty')}
                    maxQuantity={cartItem.quantity}
                    onIncrease={() =>
                      cartItem.quantity > quantity &&
                      setQuantity((itemQuantity) => itemQuantity + 1)
                    }
                    onDecrease={() => setQuantity((itemQuantity) => itemQuantity - 1)}
                  />
                </Box>
              </ProductItem>

              <Hidden only="xs">
                <CartItemActions />
              </Hidden>
            </Box>

            <Divider orientation={orientationVertical ? 'vertical' : 'horizontal'} flexItem />

            <Box sx={{ ...styles.subcontainer }}>
              <FulfillmentOptions />
            </Box>
          </Box>

          <Box sx={{ ...styles.icon }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="item-delete"
              name="item-delete"
              onClick={onDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
      <Hidden only="lg">
        <Divider orientation="horizontal" flexItem sx={{ margin: '0 -4%' }} />
      </Hidden>
    </>
  )
}

export default CartItem
