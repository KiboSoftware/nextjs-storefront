import React, { useState } from 'react'

import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import { Divider, Grid, Typography, Box, Stack, Button, MenuItem } from '@mui/material'
import { useTranslation } from 'next-i18next'

import {
  KiboImage,
  KiboRadio,
  KiboSelect,
  ReturnItemList,
  KeyValueDisplay,
} from '@/components/common'
import { OrderReturnItemsDialog } from '@/components/dialogs'
import { useModalContext } from '@/context'
import { useGetReturnReasons, useCreateOrderReturn } from '@/hooks'
import { OrderStatus, OrderReturnType } from '@/lib/constants'
import { orderGetters, productGetters } from '@/lib/getters'
import type { CreateOrderReturnItemsInputParams } from '@/lib/types'

import type { Maybe, CrOrder, CrOrderItem, CrProduct } from '@/lib/gql/types'

interface OrderReturnItemsProps {
  order: CrOrder
  title: string
  onGoBackToOrderDetails: (isReturnItemsVisible: boolean) => void
}

const styles = {
  container: {
    paddingBlock: 2,
  },
  wrapIcon: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    cursor: 'pointer',
  },
  divider: {
    borderColor: 'grey.500',
  },
}

const OrderReturnItems = (props: OrderReturnItemsProps) => {
  const { order, title, onGoBackToOrderDetails } = props
  const { t } = useTranslation('common')

  const [selectedReturnItems, setSelectedReturnItems] = useState<Maybe<CrOrderItem>[]>([])
  const [selectedReturnReason, setSelectedReturnReason] = useState<string>('')
  const [isReturnRequestSuccessful, setIsReturnRequestSuccessful] = useState<boolean>(false)
  const [selectedReturnType, setSelectedReturnType] = useState<string>(OrderReturnType.REFUND)

  const { showModal, closeModal } = useModalContext()

  const { data: returnReasons } = useGetReturnReasons()
  const { createReturnItems } = useCreateOrderReturn()

  const orderNumber = orderGetters.getOrderNumber(order)
  const orderTotal = orderGetters.getTotal(order)
  const submittedDate = orderGetters.getSubmittedDate(order)
  const pickupItems = orderGetters.getPickupItems(order)
  const shipItems = orderGetters.getShipItems(order)

  const radioOptions = [
    {
      value: OrderReturnType.REFUND,
      name: OrderReturnType.REFUND,
      label: <Typography variant="body2">{OrderReturnType.REFUND}</Typography>,
    },
    {
      value: OrderReturnType.REPLACE,
      name: OrderReturnType.REPLACE,
      label: <Typography variant="body2">{OrderReturnType.REPLACE}</Typography>,
    },
  ]

  const handleReturnOption = (value: string) => {
    setSelectedReturnType(value)
  }

  const handleReturnItems = (orderItemId: string) => {
    const selectedReturnItem = selectedReturnItems?.find(
      (orderItem) => orderItem?.id === orderItemId
    )
    if (selectedReturnItem) {
      setSelectedReturnItems(
        selectedReturnItems?.filter((orderItem) => orderItem?.id !== orderItemId)
      )
    } else {
      const selectedItem = order?.items?.find((orderItem) => orderItem?.id === orderItemId)
      selectedItem && setSelectedReturnItems([...selectedReturnItems, selectedItem])
    }
  }

  const handleReturnReasonSelection = (value: string) => setSelectedReturnReason(value)

  const handleConfirmReturnRequest = async () => {
    const createReturnItemsParams: CreateOrderReturnItemsInputParams = {
      returnType: selectedReturnType,
      reason: selectedReturnReason,
      originalOrderId: order?.id as string,
      items: selectedReturnItems,
      locationCode: orderGetters.getLocationCode(order) as string,
    }
    const createReturnItemsResponse = await createReturnItems.mutateAsync(createReturnItemsParams)

    if (createReturnItemsResponse?.status === OrderStatus.CREATED) {
      setIsReturnRequestSuccessful(true)

      showModal({
        Component: OrderReturnItemsDialog,
        props: {
          orderItems: selectedReturnItems,
          reason: selectedReturnReason,
          closeModal,
        },
      })
    }
  }
  return (
    <>
      <Stack
        sx={{ ...styles.wrapIcon, py: '1.2rem' }}
        direction="row"
        gap={2}
        onClick={() => onGoBackToOrderDetails(false)}
      >
        <ArrowBackIos fontSize="inherit" sx={styles.wrapIcon} />
        <Typography variant="body2">{t('order-details')}</Typography>
      </Stack>

      <Grid container>
        <Grid item xs={12} md={7}>
          <Typography variant="h1" gutterBottom>
            {title}
          </Typography>
          <Divider sx={{ borderColor: 'primary.main' }} />
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ ...styles.container }}>
            <KeyValueDisplay
              option={{ name: t('order-number'), value: orderNumber }}
              variant="body1"
            />
            <KeyValueDisplay
              option={{ name: t('order-date'), value: submittedDate }}
              variant="body1"
            />
            <KeyValueDisplay
              option={{
                name: t('order-total'),
                value: `${t('currency', { val: orderTotal })} (${t('item-quantity', {
                  count: order.items?.length,
                })})`,
              }}
              variant="body1"
            />
          </Box>
          <Divider sx={{ ...styles.divider }} />
          {/* Return reason & comment */}
          <Box>
            <KiboRadio
              radioOptions={radioOptions}
              selected={selectedReturnType}
              onChange={handleReturnOption}
            />
          </Box>
          <Box>
            <Typography pt={2} pb={0.5}>
              {t('reason-for-your-return')}
            </Typography>
            <KiboSelect
              name="returnReasons"
              placeholder={t('choose-a-response')}
              sx={{ maxWidth: '23.5rem' }}
              value={selectedReturnReason}
              onChange={(_name, value) => handleReturnReasonSelection(value)}
            >
              {returnReasons &&
                Object.values(returnReasons)?.map((reason: string) => {
                  return (
                    <MenuItem key={reason} value={`${reason}`}>
                      {`${reason}`}
                    </MenuItem>
                  )
                })}
            </KiboSelect>
          </Box>
          {/* Shipment orders */}
          {!!shipItems.length && (
            <Box>
              <Box sx={{ ...styles.container }}>
                <ReturnItemList
                  items={shipItems}
                  isCheckboxDisabled={isReturnRequestSuccessful}
                  onItemSelection={handleReturnItems}
                />
              </Box>
              <Divider sx={{ ...styles.divider }} />
            </Box>
          )}
          {/* Pickup orders */}
          {!!pickupItems.length && (
            <Box>
              <Box sx={{ ...styles.container }}>
                <ReturnItemList
                  items={pickupItems}
                  isCheckboxDisabled={isReturnRequestSuccessful}
                  onItemSelection={handleReturnItems}
                />
              </Box>
            </Box>
          )}
        </Grid>
        {/* Selected Order Return Items */}

        <Grid item xs={12} md={5} sx={{ paddingX: { xs: 0, md: 2 } }}>
          <Box sx={{ bgcolor: 'grey.100', minHeight: '10.625rem' }}>
            <Box sx={{ pl: '1.438rem', pt: '1.75rem', pr: '1.813rem' }}>
              <Typography variant="subtitle2" fontWeight={'bold'}>
                {t('items-you-are-returning')}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: '1.25rem' }}>
                {selectedReturnItems?.map((item: Maybe<CrOrderItem>) => (
                  <Box
                    key={item?.id}
                    sx={{ mr: '1.563rem', mb: '1.563rem', backgroundColor: 'white' }}
                  >
                    <KiboImage
                      src={productGetters.handleProtocolRelativeUrl(
                        productGetters.getProductImage(item?.product as CrProduct)
                      )}
                      height={134}
                      width={134}
                      alt={productGetters.getName(item?.product as CrProduct)}
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
            <Divider sx={{ ...styles.divider, mb: '1.688rem' }} />
            <Box sx={{ pl: '1.438rem', pb: '2.063rem', pr: '1.813rem' }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleConfirmReturnRequest}
                disabled={
                  !selectedReturnItems.length ||
                  selectedReturnReason === '' ||
                  isReturnRequestSuccessful
                }
              >
                {t('confirm-return-request')}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default OrderReturnItems
