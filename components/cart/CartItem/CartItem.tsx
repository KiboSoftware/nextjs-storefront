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

import { CartItemActions, CartItemActionsMobile } from '@/components/cart'
import { FulfillmentOptions, Price, ProductItem, QuantitySelector } from '@/components/common'
import { ProductOption } from '@/components/product'
import { cartGetters, productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import type { FulfillmentOption } from '@/lib/types'

import type { CrCartItem as CartItemType, CrProduct, Maybe } from '@/lib/gql/types'

interface CartItemProps {
  cartItem: Maybe<CartItemType>
  maxQuantity: number | undefined
  actions?: Array<string>
  fulfillmentOptions: FulfillmentOption[]
  onQuantityUpdate: (cartItemId: string, quantity: number) => void
  onCartItemDelete: (cartItemId: string) => void
  onCartItemActionSelection: () => void
  onFulfillmentOptionChange: (fulfillmentMethod: string, cartItemId: string) => void
  onProductPickupLocation: (cartItemId: string) => void
}

const styles = {
  card: {
    maxWidth: '100%',
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
  subContainer: {
    flex: 1,
    padding: '0 0.5rem',
  },
  icon: {
    alignItems: 'flex-start',
    margin: '0',
    position: 'absolute',
    padding: {
      xs: '0.5rem 0',
      sm: '0 0.5rem',
    },
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

const CartItem = (props: CartItemProps) => {
  const {
    cartItem,
    maxQuantity,
    actions,
    fulfillmentOptions,
    onQuantityUpdate,
    onCartItemDelete,
    onCartItemActionSelection,
    onFulfillmentOptionChange,
    onProductPickupLocation,
  } = props

  const theme = useTheme()
  const { t } = useTranslation('common')
  const orientationVertical = useMediaQuery(theme.breakpoints.between('xs', 'md'))
  const cartItemQuantity = cartItem?.quantity || 1
  const { getProductLink } = uiHelpers()

  const handleDelete = (cartItemId: string) => onCartItemDelete(cartItemId)
  const handleQuantityUpdate = (quantity: number) =>
    onQuantityUpdate(cartItem?.id as string, quantity)
  const handleActionSelection = () => onCartItemActionSelection()
  const handleFulfillmentOptionChange = (fulfillmentMethod: string, cartItemId: string) =>
    onFulfillmentOptionChange(fulfillmentMethod, cartItemId)
  const handleProductPickupLocation = (cartItemId: string) => onProductPickupLocation(cartItemId)
  const subscriptionDetails = cartGetters.getSubscriptionDetails(cartItem)

  return (
    <>
      <Card sx={{ ...styles.card }} role="group">
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ ...styles.cartItemContainer }}>
            <Box sx={{ ...styles.subContainer }}>
              <ProductItem
                image={productGetters.handleProtocolRelativeUrl(
                  productGetters.getProductImage(cartItem?.product as CrProduct)
                )}
                name={productGetters.getName(cartItem?.product as CrProduct)}
                options={productGetters.getOptions(cartItem?.product as CrProduct)}
                link={getProductLink(cartItem?.product?.productCode as string)}
                subscriptionFrequency={subscriptionDetails as string}
              >
                <Box>
                  <Price
                    variant="body2"
                    fontWeight="bold"
                    price={t('currency', {
                      val: productGetters
                        .getPrice(cartItem?.product as CrProduct)
                        .regular?.toString(),
                    })}
                    salePrice={
                      productGetters.getPrice(cartItem?.product as CrProduct).special
                        ? t('currency', {
                            val: productGetters.getPrice(cartItem?.product as CrProduct).special,
                          })
                        : undefined
                    }
                  />
                </Box>
                <Box sx={{ py: '0.5rem' }}>
                  <QuantitySelector
                    quantity={cartItemQuantity}
                    label={t('qty')}
                    maxQuantity={maxQuantity}
                    onIncrease={() => handleQuantityUpdate(cartItemQuantity + 1)}
                    onDecrease={() => handleQuantityUpdate(cartItemQuantity - 1)}
                    onQuantityUpdate={(q) => handleQuantityUpdate(q)}
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

            <Box sx={{ ...styles.subContainer }}>
              <FulfillmentOptions
                fulfillmentOptions={fulfillmentOptions}
                selected={cartItem?.fulfillmentMethod || ''}
                onFulfillmentOptionChange={(fulfillmentMethod: string) =>
                  handleFulfillmentOptionChange(fulfillmentMethod, cartItem?.id as string)
                }
                onStoreSetOrUpdate={() => handleProductPickupLocation(cartItem?.id as string)} // change store: Open storelocator modal. Should not change global store.
              />
            </Box>
          </Box>

          <Box sx={{ ...styles.icon }}>
            <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
              <CartItemActionsMobile
                actions={actions || []}
                onMenuItemSelection={() => handleActionSelection()}
              />
            </Box>
            <IconButton
              sx={{ p: 0.5 }}
              aria-label="item-delete"
              name="item-delete"
              onClick={() => handleDelete(cartItem?.id as string)}
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </>
  )
}

export default CartItem
