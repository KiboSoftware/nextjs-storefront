import React from 'react'

import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

import { AddressCard, KeyValueDisplay } from '@/components/common'
import { quoteGetters } from '@/lib/getters'

import { CrOrderItem, Quote } from '@/lib/gql/types'

interface QuoteDetailsPrintTemplateProps {
  quote: Quote
  accountName: string
  createdBy: string
}

const QuoteDetailsPrintTemplate: React.FC<QuoteDetailsPrintTemplateProps> = (props) => {
  const { quote, accountName, createdBy } = props

  const { t } = useTranslation('common')

  const { number, createdDate, expirationDate } = quoteGetters.getQuoteDetails(quote)

  const options = [
    {
      name: 'Account Name',
      value: accountName,
    },
    {
      name: 'Quote Number',
      value: number,
    },
    {
      name: 'Quote  Name',
      value: quote?.name,
    },
    {
      name: 'Created Date',
      value: createdDate,
    },
    {
      name: 'Created By',
      value: createdBy,
    },
    {
      name: 'Expiration Date',
      value: expirationDate,
    },
  ]

  const quoteItems = (quote?.items as CrOrderItem[]) ?? []

  return (
    <Stack gap={4}>
      <Box>
        <Typography variant="h2">{quote?.name}</Typography>
      </Box>
      <Stack gap={2} border={'1px solid grey'} p={2}>
        <Box>
          <Typography variant="h3">{t('quote-details')}</Typography>
        </Box>
        <Box display={'flex'}>
          <Stack flex={1}>
            {options.map((option) => {
              return <KeyValueDisplay key={option.name} option={option} />
            })}
          </Stack>
          <Stack flex={1} gap={1}>
            <Box flex={1}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {t('shipping-address')}
              </Typography>
              <AddressCard
                firstName={quote?.fulfillmentInfo?.fulfillmentContact?.firstName as string}
                middleNameOrInitial={
                  quote?.fulfillmentInfo?.fulfillmentContact?.middleNameOrInitial as string
                }
                lastNameOrSurname={
                  quote?.fulfillmentInfo?.fulfillmentContact?.lastNameOrSurname as string
                }
                address1={quote?.fulfillmentInfo?.fulfillmentContact?.address?.address1 as string}
                address2={quote?.fulfillmentInfo?.fulfillmentContact?.address?.address2 as string}
                cityOrTown={
                  quote?.fulfillmentInfo?.fulfillmentContact?.address?.cityOrTown as string
                }
                stateOrProvince={
                  quote?.fulfillmentInfo?.fulfillmentContact?.address?.stateOrProvince as string
                }
                postalOrZipCode={
                  quote?.fulfillmentInfo?.fulfillmentContact?.address?.postalOrZipCode as string
                }
              />
            </Box>

            <Box flex={1}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {t('shipping-method')}
              </Typography>
              <Typography pt={1}>{quote?.fulfillmentInfo?.shippingMethodName}</Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
      <Stack gap={2} border={'1px solid grey'}>
        <Box p={2}>
          <Typography width={'fit-content'} variant="h3">
            {t('product-details')}
          </Typography>
        </Box>
        <TableContainer sx={{ p: 0, m: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('product-header')}</TableCell>
                <TableCell>{t('qty')}</TableCell>
                <TableCell>{t('fulfillment-method-header')}</TableCell>
                <TableCell>{t('unit-price')}</TableCell>
                <TableCell>{t('discount-header')}</TableCell>
                <TableCell>{t('total')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quoteItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.product?.name} -{' '}
                    {item.product?.variationProductCode || item.product?.productCode}
                  </TableCell>
                  <TableCell>{item?.quantity}</TableCell>
                  <TableCell>{item?.fulfillmentMethod}</TableCell>
                  <TableCell>{t('currency', { val: item?.unitPrice?.listAmount })}</TableCell>
                  <TableCell>{t('currency', { val: item?.discountTotal })}</TableCell>
                  <TableCell>{t('currency', { val: item?.total })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          <Box ml={'auto'} display={'flex'} flexDirection={'column'} width={400}>
            <Box display={'flex'} justifyContent={'space-between'}>
              <span>{t('item-total-header')}</span>
              <span>{t('currency', { val: quote?.itemTotal })}</span>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <span>{t('shipping')}</span>
              <span>{t('currency', { val: quote?.shippingSubTotal })}</span>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <span>{t('handling')}</span>
              <span>{t('currency', { val: quote?.handlingSubTotal })}</span>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <span>{t('duty-total')}</span>
              <span>{t('currency', { val: quote?.dutyTotal })}</span>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <span>{t('total')}</span>
              <span>{t('currency', { val: quote?.total })}</span>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Stack>
  )
}

export default QuoteDetailsPrintTemplate
