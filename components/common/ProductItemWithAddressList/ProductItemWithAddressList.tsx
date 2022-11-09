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

import type { Maybe, CrOrderItem, CrProduct, Contact } from '@/lib/gql/types'

export type ProductItemWithAddressListProps = {
  items: Maybe<CrOrderItem>[]
}

const styles = {
  card: {
    maxWidth: '100%',
    boxShadow: 'none',
    borderRadius: 0,
    borderWidth: '1px',
    borderColor: 'grey.500',
    borderStyle: 'solid',
    marginBottom: {
      xs: '1rem',
      sm: '1.25rem',
      md: '1.5rem',
    },
    justifyContent: 'space-around',

    pt: '24px',
    pb: '26px',
    pr: '13px',
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
  },
  subContainer: {
    flex: 1,
    padding: '0 0.5rem',
  },
  addressAction: {
    display: 'flex',
    justifyContent: 'end',
  },
  splitShipment: {
    mt: 'auto',
  },
}
const ProductItemWithAddressList = (props: ProductItemWithAddressListProps) => {
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

  const [selectedAddresses, setSelectedAddresses] = useState<any>({})
  const handleSelectShippingAddress = (id: number, value: string) => {
    // need to modify as per API response
    setSelectedAddresses({ ...selectedAddresses, [id]: value })
  }
  const handleEditAddress = () => {
    // need to handle
    console.log('edit address')
  }
  const handleAddAddress = () => {
    console.log('add address')
  }
  const handleSplitAddress = () => {
    console.log('split address')
  }

  return (
    <>
      {items?.map((item: Maybe<CrOrderItem>, index: number) => {
        const product = item?.product as CrProduct
        return (
          <Card key={item?.id} sx={{ ...styles.card }}>
            <Box sx={{ ...styles.subContainer }}>
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
            </Box>

            <Box sx={{ ...styles.subContainer, display: 'flex', flexDirection: 'column' }}>
              <KiboSelect
                name="multiShipAddresses"
                onChange={(_name, value) => handleSelectShippingAddress(index, value)}
                placeholder={t('select-a-saved-address')}
                value={selectedAddresses[index]}
              >
                {destinationContacts?.map((contact: Contact) => {
                  const formatedAddress = `${contact?.address?.address1}, ${contact?.address?.address2}, ${contact?.address?.cityOrTown}, ${contact?.address?.stateOrProvince}, ${contact?.address?.postalOrZipCode}, ${contact?.address?.countryCode} `
                  return (
                    <MenuItem key={contact.id} value={`${contact.id}`}>
                      {formatedAddress}
                    </MenuItem>
                  )
                })}
              </KiboSelect>
              <Box sx={{ ...styles.addressAction }}>
                <Link
                  component="button"
                  variant="caption"
                  color="text.primary"
                  sx={{ padding: '5px' }}
                  onClick={handleEditAddress}
                >
                  {t('edit-address')}
                </Link>
                <Divider
                  variant="middle"
                  orientation="vertical"
                  sx={{ minHeight: '14px', height: '14px' }}
                />
                <Link
                  component="button"
                  variant="caption"
                  color="text.primary"
                  sx={{ padding: '5px' }}
                  onClick={handleAddAddress}
                >
                  {t('add-new-address')}
                </Link>
              </Box>
              {orderGetters.getProductQuantity(item as CrOrderItem) > 1 && (
                <Box sx={{ ...styles.splitShipment }}>
                  +
                  <Link
                    component="button"
                    variant="caption"
                    color="text.primary"
                    sx={{ padding: '5px', ml: '12px' }}
                    onClick={handleSplitAddress}
                  >
                    {t('split-into-multiple-shipments')}
                  </Link>
                </Box>
              )}
            </Box>
          </Card>
        )
      })}
    </>
  )
}

export default ProductItemWithAddressList
