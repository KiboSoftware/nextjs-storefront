import { Delete } from '@mui/icons-material'
import {
  Box,
  Card,
  Divider,
  IconButton,
  SxProps,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTranslation } from 'next-i18next'

import CartItemActions from '@/components/cart/CartItemActions/CartItemActions'
import CartItemActionsMobile from '@/components/cart/CartItemActionsMobile/CartItemActionsMobile'
import FulfillmentOptions from '@/components/common/FulfillmentOptions/FulfillmentOptions'
import Price from '@/components/common/Price/Price'
import ProductItem from '@/components/common/ProductItem/ProductItem'
import QuantitySelector from '@/components/common/QuantitySelector/QuantitySelector'

import type { CartItem as CartItemType, CrProductOption } from '@/lib/gql/types'

const styles = {
  card: {
    maxWidth: '54.5rem',
    marginBottom: {
      xs: 0,
      sm: 0,
      md: '1.5rem',
    },
    border: {
      xs: 'none',
      md: `2px solid ${grey[200]}`,
    },
    boxShadow: 'none',
  },
  cartItemContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row',
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
    padding: 1,
    top: {
      xs: 0,
      sm: '2%',
      md: '5%',
      lg: '6%',
    },
    right: {
      xs: 0,
      sm: 0,
      md: '1%',
      lg: '1%',
    },
  } as SxProps<Theme>,
}

interface CartItemProps {
  cartItem: CartItemType
  maxQuantity: number | undefined
  actions?: Array<string>
  onQuantityUpdate: (cartItemId: string, quantity: number) => void
  onCartItemDelete: (cartItemId: string) => void
  onCartItemActionSelection: () => void
}

const CartItem = (props: CartItemProps) => {
  const {
    cartItem,
    maxQuantity,
    actions,
    onQuantityUpdate,
    onCartItemDelete,
    onCartItemActionSelection,
  } = props

  const theme = useTheme()

  const { t } = useTranslation('common')
  const orientationVertical = useMediaQuery(theme.breakpoints.between('xs', 'md'))

  const onDelete = (cartItemId: string) => onCartItemDelete(cartItemId)
  const updateQuantity = (quantity: number) => onQuantityUpdate(cartItem.id || '', quantity)
  const onActionSelection = () => onCartItemActionSelection()

  return (
    <>
      <Card sx={{ ...styles.card }} role="group">
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ ...styles.cartItemContainer }}>
            <Box sx={{ ...styles.subcontainer }}>
              <ProductItem
                image={cartItem.product?.imageUrl || ''}
                name={cartItem.product?.name || ''}
                options={cartItem.product?.options as Array<CrProductOption>}
              >
                <Box>
                  <Price
                    variant="body2"
                    fontWeight="bold"
                    price={'$' + (cartItem.product?.price?.price || 0).toString()}
                    salePrice={
                      (cartItem.product?.price?.salePrice &&
                        cartItem.product?.price?.salePrice.toString()) ||
                      undefined
                    }
                  />
                </Box>
                <Box sx={{ py: '0.5rem' }}>
                  <QuantitySelector
                    quantity={cartItem.quantity}
                    label={t('qty')}
                    maxQuantity={maxQuantity}
                    onIncrease={() => updateQuantity(cartItem.quantity + 1)}
                    onDecrease={() => updateQuantity(cartItem.quantity - 1)}
                  />
                </Box>
              </ProductItem>

              <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                <CartItemActions />
              </Box>
            </Box>

            <Divider
              orientation={orientationVertical ? 'vertical' : 'horizontal'}
              sx={orientationVertical ? { borderTopWidth: '1px ' } : { borderLeftWidth: '1px' }}
              flexItem
            />

            <Box sx={{ ...styles.subcontainer }}>
              <FulfillmentOptions />
            </Box>
          </Box>

          <Box sx={{ ...styles.icon }}>
            <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
              <CartItemActionsMobile
                actions={actions || []}
                onMenuItemSelection={() => onActionSelection()}
              />
            </Box>
            <IconButton
              aria-label="item-delete"
              name="item-delete"
              onClick={() => onDelete(cartItem.id || '')}
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </Card>
      <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
        <Divider orientation="horizontal" flexItem sx={{ margin: '0 -16px' }} />
      </Box>
    </>
  )
}

export default CartItem
