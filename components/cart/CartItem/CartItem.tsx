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
import { orderGetters } from '@/lib/getters'
import type { FulfillmentOption } from '@/lib/types'

import type { CartItem as CartItemType } from '@/lib/gql/types'

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
  fulfillmentOptions: FulfillmentOption[]
  onQuantityUpdate: (cartItemId: string, quantity: number) => void
  onCartItemDelete: (cartItemId: string) => void
  onCartItemActionSelection: () => void
}

const CartItem = (props: CartItemProps) => {
  const {
    cartItem,
    maxQuantity,
    actions,
    fulfillmentOptions = [],
    onQuantityUpdate,
    onCartItemDelete,
    onCartItemActionSelection,
  } = props

  const theme = useTheme()

  const { t } = useTranslation('common')
  const orientationVertical = useMediaQuery(theme.breakpoints.between('xs', 'md'))

  const handleDelete = (cartItemId: string) => onCartItemDelete(cartItemId)
  const updateQuantity = (quantity: number) => onQuantityUpdate(cartItem.id || '', quantity)
  const handleActionSelection = () => onCartItemActionSelection()

  const handleFulfillmentOption = () => {
    return ''
  }

  return (
    <>
      <Card sx={{ ...styles.card }} role="group">
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ ...styles.cartItemContainer }}>
            <Box sx={{ ...styles.subcontainer }}>
              <ProductItem
                image={orderGetters.getProductImage(cartItem)}
                name={orderGetters.getProductName(cartItem)}
                options={orderGetters.getProductOptions(cartItem)}
              >
                <Box>
                  <Price
                    variant="body2"
                    fontWeight="bold"
                    price={t('currency', { val: orderGetters.getProductPrice(cartItem) })}
                    salePrice={
                      (cartItem?.product?.price?.salePrice &&
                        t('currency', {
                          val: orderGetters.getProductSalePrice(cartItem),
                        })) ||
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

              <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', ml: 1 } }}>
                <CartItemActions />
              </Box>
            </Box>

            <Divider
              orientation={orientationVertical ? 'vertical' : 'horizontal'}
              sx={orientationVertical ? { borderTopWidth: '1px ' } : { borderLeftWidth: '1px' }}
              flexItem
            />

            <Box sx={{ ...styles.subcontainer }}>
              <FulfillmentOptions
                fulfillmentOptions={fulfillmentOptions}
                onFullfillmentOptionChange={handleFulfillmentOption}
                onStoreSelection={handleFulfillmentOption}
              />
            </Box>
          </Box>

          <Box sx={{ ...styles.icon }}>
            <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
              <CartItemActionsMobile
                actions={actions || []}
                onMenuItemSelection={handleActionSelection}
              />
            </Box>
            <IconButton
              aria-label="item-delete"
              name="item-delete"
              onClick={() => handleDelete(cartItem.id || '')}
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
