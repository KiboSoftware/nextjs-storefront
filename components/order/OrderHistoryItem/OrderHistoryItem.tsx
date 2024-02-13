import React from 'react'

import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
import {
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Button,
  IconButton,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { FullWidthDivider, Price } from '@/components/common'
import { useSnackbarContext } from '@/context'
import { useProductCardActions } from '@/hooks'
import { useAddItemsToCurrentCart } from '@/hooks/mutations/cart/useAddItemsToCurrentCart/useAddItemsToCurrentCart'

import { CrOrderItem } from '@/lib/gql/types'

export interface OrderHistoryItemProps {
  id: string
  items: CrOrderItem[]
  submittedDate: string
  productNames: string
  orderTotal: number
  orderStatus: string
  onHistoryItemClick: (id: string) => void
}

const styles = {
  stack: {
    pt: 2,
    pb: 3,
    display: 'flex',
    alignItems: 'center',
  },
  box: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,
  },
}

const OrderHistoryItem = (props: OrderHistoryItemProps) => {
  const { id, submittedDate, productNames, orderTotal, orderStatus, items, onHistoryItemClick } =
    props
  const { t } = useTranslation('common')
  const { showSnackbar } = useSnackbarContext()

  const theme = useTheme()
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'))
  const router = useRouter()

  const { addItemsToCurrentCart } = useAddItemsToCurrentCart()
  const { handleDeleteCurrentCart } = useProductCardActions()

  const handleHistoryItemClick = () => {
    onHistoryItemClick(id)
  }

  const handleAddListToCart = async () => {
    try {
      const response = await addItemsToCurrentCart.mutateAsync({
        items: items,
      })
      if (response) {
        showSnackbar(t('list-added-to-cart'), 'success')
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleReorder = async () => {
    await handleDeleteCurrentCart()
    await handleAddListToCart()
    router.push('/cart')
  }

  return (
    <Stack>
      <Stack sx={styles.stack} direction="row" data-testid="history-item">
        <Stack sx={{ width: '95%' }} gap={0.6}>
          <Typography variant="body1" fontWeight="bold">
            {submittedDate}
          </Typography>
          <Typography variant="body1" color={'text.secondary'}>
            {productNames}
          </Typography>

          <Price price={t('currency', { val: orderTotal })} />

          <Typography variant="body2" color={'primary'}>
            {orderStatus}
          </Typography>
        </Stack>
        <Box sx={styles.box}>
          <Button variant="outlined" onClick={handleReorder}>
            {' '}
            Reorder
          </Button>
          <IconButton
            onClick={handleHistoryItemClick}
            data-testid="order-history-details-navigator"
          >
            <ArrowForwardIos fontSize="inherit" />
          </IconButton>
        </Box>
      </Stack>
      <Stack>
        {mdScreen ? <Divider sx={{ borderColor: 'grey.500' }} /> : <FullWidthDivider />}
      </Stack>
    </Stack>
  )
}

export default OrderHistoryItem
