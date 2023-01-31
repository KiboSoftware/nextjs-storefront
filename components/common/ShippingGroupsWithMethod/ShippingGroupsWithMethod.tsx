import React from 'react'

import { Divider, Box, MenuItem, Card, Typography, Link } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboSelect, Price, ProductItem } from '@/components/common'
import { orderGetters, productGetters, checkoutGetters } from '@/lib/getters'

import type { Maybe, CrOrderItem, CrProduct, Checkout, CheckoutGroupRates } from '@/lib/gql/types'

export type ShippingGroupsWithMethodProps = {
  checkout: Checkout
  shippingMethods: CheckoutGroupRates[]
  onClickEditMultiShippingDetails: () => void
  onUpdateCheckoutShippingMethod: (params: {
    shippingMethodGroup: CheckoutGroupRates
    shippingMethodCode: string
  }) => void
}

const styles = {
  card: {
    maxWidth: '100%',
    boxShadow: 'none',
    borderRadius: 0,
    justifyContent: 'space-around',
    pt: '1.5rem',
    pb: '0px',
    pr: '0.813rem',
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
  },
  subContainer: {
    flex: 1,
  },
  addressAction: {
    display: 'flex',
    justifyContent: 'end',
  },
  splitShipment: {
    mt: 'auto',
  },
  shippingMethods: {
    maxWidth: '26.313rem',
    width: '100%',
    marginBottom: '1.875rem',
  },
  multipleAddresses: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  shipmentDivider: {
    marginTop: '0.5rem',
    borderColor: 'primary.main',
    maxWidth: '26.313rem',
    width: '100%',
  },
  groupDivider: { marginTop: '1.375rem', maxWidth: '26.313rem', width: '100%' },
}

const ProductGroup = ({ items }: { items: Maybe<CrOrderItem>[] }) => {
  return (
    <>
      {items?.map((item: Maybe<CrOrderItem>) => {
        const product = item?.product as CrProduct
        return (
          <ProductItem
            key={item?.id}
            id={orderGetters.getCartItemId(item as CrOrderItem)}
            qty={orderGetters.getProductQuantity(item as CrOrderItem)}
            purchaseLocation={orderGetters.getPurchaseLocation(item as CrOrderItem)}
            productCode={productGetters.getProductId(product)}
            image={productGetters.getProductImage(product)}
            name={productGetters.getName(product)}
            options={productGetters.getOptions(product)}
            price={productGetters.getPrice(product).regular?.toString()}
            salePrice={productGetters.getPrice(product).special?.toString()}
            data-testid="product-item-address"
          />
        )
      })}
    </>
  )
}

const ShippingGroupsWithMethod = (props: ShippingGroupsWithMethodProps) => {
  const {
    checkout,
    shippingMethods,
    onClickEditMultiShippingDetails,
    onUpdateCheckoutShippingMethod,
  } = props

  const { t } = useTranslation('common')

  const destinationItemGroups = checkoutGetters.buildItemsGroupFromCheckoutGroupings(checkout)

  const handleSelectShippingOption = async (id: string, value: string) => {
    const shippingMethodGroup = shippingMethods?.find(
      (shippingMethod) => shippingMethod?.groupingId === id
    )
    onUpdateCheckoutShippingMethod({
      shippingMethodGroup: shippingMethodGroup as CheckoutGroupRates,
      shippingMethodCode: value,
    })
  }

  return (
    <>
      <Box sx={{ ...styles.multipleAddresses }}>
        <Typography variant="subtitle2" component="span" pt={1}>
          {t('multiple-addresses')}
        </Typography>

        <Link
          component="button"
          variant="caption"
          color="text.primary"
          sx={{ padding: '0.313rem' }}
          onClick={onClickEditMultiShippingDetails}
        >
          {t('edit')}
        </Link>
      </Box>
      <Divider sx={{ paddingTop: '1.125rem' }} />

      <Typography variant="h2" component="h2" pt={4.25}>
        {t('shipping-method')}
      </Typography>

      {destinationItemGroups?.map((destinationItemGroup, index: number) => {
        return (
          <Card key={destinationItemGroup?.destinationId} sx={{ ...styles.card }}>
            <Box sx={{ ...styles.subContainer }}>
              <Typography variant="subtitle1" component="span">
                {t('shipments-of', {
                  shipmentNumber: index + 1,
                  numberOfShipments: destinationItemGroups?.length,
                })}
              </Typography>
              <Divider sx={{ ...styles.shipmentDivider }} />
              <Box pt={2}>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontWeight: 'bold', marginRight: '0.25rem' }}
                >
                  {t('ship-to')}
                </Typography>
                {destinationItemGroup?.destination?.destinationContact && (
                  <Typography variant="body1" component="span">
                    {checkoutGetters.formatDestinationAddress(
                      destinationItemGroup?.destination?.destinationContact
                    )}
                  </Typography>
                )}
              </Box>
              <KiboSelect
                name="shippingMethods"
                placeholder={t('select-shipping-option')}
                sx={{ ...styles.shippingMethods }}
                onChange={(_name, value) =>
                  handleSelectShippingOption(destinationItemGroup?.groupingId, value)
                }
                value={
                  (checkout?.groupings?.find(
                    (group) => group?.id === destinationItemGroup?.groupingId
                  )?.shippingMethodCode as string) || ''
                }
              >
                {shippingMethods
                  ?.find(
                    (shippingMethod) =>
                      shippingMethod.groupingId === destinationItemGroup?.groupingId
                  )
                  ?.shippingRates?.map((shippingRate) => {
                    return (
                      <MenuItem
                        key={shippingRate?.shippingMethodName}
                        value={`${shippingRate?.shippingMethodCode || ''}`}
                      >
                        <Price
                          variant="body2"
                          fontWeight="normal"
                          price={
                            `${shippingRate?.shippingMethodName}` +
                            ' ' +
                            t('currency', { val: shippingRate?.price })
                          }
                        />
                      </MenuItem>
                    )
                  })}
              </KiboSelect>
              <ProductGroup
                key={destinationItemGroup?.destinationId}
                items={destinationItemGroup?.items}
              />
              <Divider
                sx={{
                  ...styles.groupDivider,
                }}
              />
            </Box>
          </Card>
        )
      })}
    </>
  )
}

export default ShippingGroupsWithMethod
