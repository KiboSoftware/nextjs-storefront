import React, { useMemo } from 'react'

import { Delete } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useTranslation } from 'next-i18next'

import { FulfillmentOptions, Price, ProductItem, QuantitySelector } from '@/components/common'
import { FulfillmentOptions as FulfillmentOptionsConstant, QuoteStatus } from '@/lib/constants'
import { cartGetters, productGetters } from '@/lib/getters'
import { uiHelpers } from '@/lib/helpers'
import { FulfillmentOption } from '@/lib/types'

import { CrCartItem, CrProduct, Maybe, Location, CrOrderItem } from '@/lib/gql/types'

interface B2BProductDetailsTableProps {
  items: CrCartItem[] | CrOrderItem[]
  fulfillmentLocations: Maybe<Location>[]
  purchaseLocation: Location
  status?: string
  mode?: string
  isQuote?: boolean
  onFulfillmentOptionChange: (value: string, id: string) => void
  onStoreSetOrUpdate: (id: string) => void
  onQuantityUpdate: (cartItemId: string, quantity: number) => void
  onItemDelete: (cartItemId: string) => void
}

export default function B2BProductDetailsTable(props: B2BProductDetailsTableProps) {
  const {
    items,
    fulfillmentLocations,
    purchaseLocation,
    mode,
    isQuote = false,
    status,
    onFulfillmentOptionChange,
    onStoreSetOrUpdate,
    onQuantityUpdate,
    onItemDelete,
  } = props

  const { t } = useTranslation('common')
  const { getProductLink } = uiHelpers()
  const columns = useMemo(
    () => [
      {
        field: 'product-header',
        headerName: t('product-header'),
      },
      {
        field: 'fulfillment-method-header',
        headerName: t('fulfillment-method-header'),
      },
      {
        field: 'quantity-header',
        headerName: t('quantity-header'),
      },
      {
        field: 'price-header',
        headerName: t('price-header'),
      },
      {
        field: 'discount-header',
        headerName: t('discount-header'),
      },
      {
        field: 'item-total-header',
        headerName: t('item-total-header'),
      },
      {
        field: 'delete-item-header',
        headerName: '',
      },
    ],
    []
  )

  const handleSupportedFulfillmentOptions = (
    cartItem: CrCartItem | CrOrderItem
  ): FulfillmentOption[] => {
    const location =
      cartItem?.fulfillmentLocationCode &&
      cartItem?.fulfillmentMethod === FulfillmentOptionsConstant.PICKUP
        ? cartGetters.getCartItemFulfillmentLocation(cartItem, fulfillmentLocations)
        : purchaseLocation
    return cartGetters.getProductFulfillmentOptions(cartItem, location)
  }

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="quick order table">
        {!items.length ? <caption>{t('search-to-add-products')}</caption> : null}
        <TableHead>
          <TableRow
            sx={{
              '&:nth-of-type(odd)': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            {columns.map((column) => (
              <TableCell key={column.field} sx={{ fontWeight: 700 }}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item: CrCartItem | CrOrderItem) => (
            <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <ProductItem
                  isQuickOrder
                  image={productGetters.getProductImage(item.product as CrProduct)}
                  name={productGetters.getName(item.product as CrProduct)}
                  productCode={productGetters.getProductId(item.product as CrProduct)}
                  options={productGetters.getOptions(item.product as CrProduct)}
                  link={getProductLink(item.product?.productCode as string)}
                  discounts={item?.productDiscounts}
                />
              </TableCell>
              <TableCell>
                {QuoteStatus[status as string] === QuoteStatus.InReview ||
                QuoteStatus[status as string] === QuoteStatus.Completed ||
                QuoteStatus[status as string] === QuoteStatus.Expired ||
                (!mode && isQuote) ? (
                  <Typography>
                    {item.fulfillmentMethod} - {item.fulfillmentLocationCode}
                  </Typography>
                ) : (
                  <FulfillmentOptions
                    fulfillmentOptions={handleSupportedFulfillmentOptions(item)}
                    selected={item?.fulfillmentMethod ?? ''}
                    onFulfillmentOptionChange={(fulfillmentMethod: string) =>
                      onFulfillmentOptionChange(fulfillmentMethod, item?.id as string)
                    }
                    onStoreSetOrUpdate={() => onStoreSetOrUpdate(item?.id as string)}
                  />
                )}
              </TableCell>
              <TableCell>
                {QuoteStatus[status as string] === QuoteStatus.InReview ||
                QuoteStatus[status as string] === QuoteStatus.Completed ||
                QuoteStatus[status as string] === QuoteStatus.Expired ||
                (!mode && isQuote) ? (
                  <Typography>{item.quantity}</Typography>
                ) : (
                  <QuantitySelector
                    quantity={item?.quantity || 1} // needs to be modified
                    maxQuantity={100} // needs to be modified
                    onIncrease={() => onQuantityUpdate(item?.id as string, item?.quantity + 1)}
                    onDecrease={() => onQuantityUpdate(item?.id as string, item?.quantity - 1)}
                    onQuantityUpdate={(q) => onQuantityUpdate(item?.id as string, q)}
                  />
                )}
              </TableCell>
              <TableCell>
                <Price
                  variant="body2"
                  fontWeight="bold"
                  price={t('currency', {
                    val: productGetters.getPrice(item?.product as CrProduct).regular?.toString(),
                  })}
                  salePrice={
                    productGetters.getPrice(item?.product as CrProduct).special
                      ? t('currency', {
                          val: productGetters.getPrice(item?.product as CrProduct).special,
                        })
                      : undefined
                  }
                />
              </TableCell>
              <TableCell>
                <Price
                  variant="body2"
                  fontWeight="bold"
                  price={t('currency', {
                    val: item?.discountTotal,
                  })}
                />
              </TableCell>
              <TableCell>
                <Price
                  variant="body2"
                  fontWeight="bold"
                  price={t('currency', {
                    val: cartGetters.getLineItemPrice(item).regular?.toString(),
                  })}
                  salePrice={
                    cartGetters.getLineItemPrice(item).special
                      ? t('currency', {
                          val: cartGetters.getLineItemPrice(item).special,
                        })
                      : undefined
                  }
                />
              </TableCell>
              <TableCell>
                {QuoteStatus[status as string] !== QuoteStatus.InReview &&
                  QuoteStatus[status as string] !== QuoteStatus.Completed &&
                  QuoteStatus[status as string] !== QuoteStatus.Expired &&
                  (mode === 'create' || mode === 'edit' || !isQuote) && (
                    <IconButton
                      sx={{ p: 0.5 }}
                      aria-label="item-delete"
                      name="item-delete"
                      onClick={() => onItemDelete(item?.id as string)}
                    >
                      <Delete />
                    </IconButton>
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
