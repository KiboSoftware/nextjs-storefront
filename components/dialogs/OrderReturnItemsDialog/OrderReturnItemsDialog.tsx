import React from 'react'

import { CheckCircle } from '@mui/icons-material'
import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboDialog, ProductItemList } from '@/components/common'

import { Maybe, CrOrderItem } from '@/lib/gql/types'

interface OrderReturnItemsDialogProps {
  orderItems: Maybe<CrOrderItem>[]
  reason: string
  closeModal: () => void
}

// Component
const OrderReturnItemsDialog = (props: OrderReturnItemsDialogProps) => {
  const { orderItems, reason, closeModal } = props
  const { t } = useTranslation('common')

  const DialogArgs = {
    Title: (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CheckCircle sx={{ color: 'primary.main' }} />
        <Typography
          sx={{
            fontWeight: 'bold',
            display: 'block',
            marginLeft: '1rem',
            color: 'text.primary',
          }}
        >
          {t('return-request-submitted')}
        </Typography>
      </Box>
    ),
    Content: (
      <Stack>
        <Box display="flex" flexWrap="wrap" mb={'1.625rem'}>
          <Typography variant={'body2'} fontWeight={700} component="span" mr={'0.25rem'}>
            {t('reason-for-your-return')}:
          </Typography>
          <Typography variant={'body2'} fontWeight={'normal'} component="span">
            {reason}
          </Typography>
        </Box>
        <ProductItemList items={orderItems} showAddress={false} showDivider={false} />
      </Stack>
    ),
    showContentTopDivider: true,
    showContentBottomDivider: false,
    customMaxWidth: '32.375rem',
    onClose: () => closeModal(),
  }

  return <KiboDialog {...DialogArgs} />
}
export default OrderReturnItemsDialog
