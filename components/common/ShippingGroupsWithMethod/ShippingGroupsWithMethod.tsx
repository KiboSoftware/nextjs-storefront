import React, { useState } from 'react'

import {
  Stack,
  Divider,
  Box,
  MenuItem,
  Card,
  SxProps,
  Theme,
  Typography,
  Link,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboSelect, ProductItem } from '@/components/common'
import { orderGetters, productGetters } from '@/lib/getters'

import type { Maybe, CrOrderItem, CrProduct, Contact, ShippingRate } from '@/lib/gql/types'

export type ShippingGroupsWithMethodProps = {
  items: Maybe<CrOrderItem>[]
}

const styles = {
  card: {
    maxWidth: '100%',
    boxShadow: 'none',
    borderRadius: 0,
    justifyContent: 'space-around',
    pt: '24px',
    pb: '0px',
    pr: '13px',
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
    maxWidth: '421px',
    width: '100%',
    marginBottom: '30px',
  },
  multipleAddresses: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
}
const ShippingGroupsWithMethod = (props: ShippingGroupsWithMethodProps) => {
  const { items } = props

  const { t } = useTranslation('common')

  const destinationContacts: Contact[] = [
    {
      id: 1,
      email: 'amolp@dev.com',
      firstName: 'ram',
      middleNameOrInitial: null,
      lastNameOrSurname: 'nam',
      companyOrOrganization: null,
      phoneNumbers: {
        home: '3354533453',
        mobile: null,
        work: null,
      },
      address: {
        address1: 'street',
        address2: 'apartment',
        address3: null,
        address4: null,
        cityOrTown: 'city',
        stateOrProvince: 'state',
        postalOrZipCode: '23423',
        countryCode: 'US',
        addressType: null,
        isValidated: false,
      },
    },
    {
      id: 2,
      email: 'jon@doe.com',
      firstName: 'jon',
      middleNameOrInitial: null,
      lastNameOrSurname: 'doe',
      companyOrOrganization: null,
      phoneNumbers: {
        home: '5555555555',
        mobile: null,
        work: null,
      },
      address: {
        address1: 'street1',
        address2: 'apartment1',
        address3: null,
        address4: null,
        cityOrTown: 'city1',
        stateOrProvince: 'state1',
        postalOrZipCode: '222222',
        countryCode: 'US',
        addressType: null,
        isValidated: false,
      },
    },
  ]

  const shipmentMethods = [
    { shippingMethodName: 'Standard', price: 0 },
    { shippingMethodName: 'Expedited', price: 15 },
  ]

  const [selectShippingOptions, setSelectShippingOptions] = useState<any>({})
  const hanndleSelectShippingOption = (id: number, value: string) => {
    // need to modify as per API response
    setSelectShippingOptions({ ...selectShippingOptions, [id]: value })
  }
  return (
    <>
      <Box sx={{ ...styles.multipleAddresses }}>
        <Typography variant="subtitle2" component="span" pt={1}>
          {t('multiple-addresses')}
        </Typography>

        <Link component="button" variant="caption" color="text.primary" sx={{ padding: '5px' }}>
          {t('edit')}
        </Link>
      </Box>
      <Divider sx={{ paddingTop: '18px' }} />

      <Typography variant="h2" component="h2" pt={4.25}>
        {t('shipping-method')}
      </Typography>

      {items?.map((item: Maybe<CrOrderItem>, index: number) => {
        const product = item?.product as CrProduct
        return (
          <Card key={item?.id} sx={{ ...styles.card }}>
            <Box sx={{ ...styles.subContainer }}>
              <Typography variant="subtitle1" component="span">
                {t('shipments-of', { shipmentNumber: index + 1, numberOfShipments: items?.length })}
              </Typography>
              <Divider
                sx={{
                  marginTop: '8px',
                  borderColor: 'primary.main',
                  maxWidth: '421px',
                  width: '100%',
                }}
              />
              <Box pt={2}>
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ fontWeight: 'bold', marginRight: '4px' }}
                >
                  {t('ship-to')}:
                </Typography>
                <Typography variant="body1" component="span">
                  4321 Another Address, Austin, TX 78741
                </Typography>
              </Box>
              <KiboSelect
                name="shippingMethods"
                placeholder={t('select-shipping-option')}
                sx={{ ...styles.shippingMethods }}
                onChange={(_name, value) => hanndleSelectShippingOption(index, value)}
                value={selectShippingOptions[index]}
              >
                {shipmentMethods?.map((item: ShippingRate) => {
                  return (
                    <MenuItem key={item.shippingMethodName} value={`${item.shippingMethodName}`}>
                      {`${item.shippingMethodName} $${item.price}`}
                    </MenuItem>
                  )
                })}
              </KiboSelect>
              {/* Iterate shipping address product items */}
              <ProductItem
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
              <Divider
                sx={{
                  marginTop: '22px',
                  maxWidth: '421px',
                  width: '100%',
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
