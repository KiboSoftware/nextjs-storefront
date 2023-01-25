import React, { useState } from 'react'

import { Stack, Button, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { useTranslation } from 'next-i18next'

import { KiboDialog } from '@/components/common'

interface EditOrderDateDialogProps {
  subscriptionId: string
  orderDate: Dayjs
  onOrderDateUpdate: (subscriptionId: string, orderDate: string) => void
  onClose: () => void
}

const EditOrderDateDialog = (props: EditOrderDateDialogProps) => {
  const { subscriptionId, orderDate, onOrderDateUpdate, onClose } = props

  const [selectedOrderDate, setSelectedOrderDate] = useState<Dayjs | null>(dayjs(orderDate))

  const { t } = useTranslation('common')

  const handleOrderDateUpdate = () => {
    const nextOrderDate: string = dayjs(selectedOrderDate).format('MM/DD/YYYY')
    onOrderDateUpdate(subscriptionId, nextOrderDate)
  }

  const error = (() => {
    if (!selectedOrderDate) return { isError: true, message: t('order-date-is-required') }

    if (!dayjs(selectedOrderDate, 'MM/DD/YYYY').isValid())
      return { isError: true, message: t('order-date-must-be-valid') }

    if (dayjs().add(1, 'day').isAfter(selectedOrderDate, 'day'))
      return { isError: true, message: t('date-must-be-in-the-future') }

    return { isError: false, message: t('enter-date-in-format') }
  })()

  const Actions = (
    <Stack gap={2} width="100%">
      <Button
        name="cancel"
        sx={{ width: '100%' }}
        variant="contained"
        color="secondary"
        onClick={() => onClose()}
      >
        {t('cancel')}
      </Button>
      <Button
        name="confirm"
        sx={{ width: '100%' }}
        variant="contained"
        disabled={error.isError}
        onClick={handleOrderDateUpdate}
      >
        {t('confirm')}
      </Button>
    </Stack>
  )

  return (
    <KiboDialog
      Title={t('select-next-order-date')}
      showCloseButton
      showContentTopDivider={true}
      showContentBottomDivider={true}
      Actions={Actions}
      Content={
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DatePicker
              disablePast
              openTo="year"
              views={['year', 'month', 'day']}
              value={selectedOrderDate}
              onChange={(newValue) => setSelectedOrderDate(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={error.isError}
                  helperText={error.message}
                  size="small"
                />
              )}
            />
          </Stack>
        </LocalizationProvider>
      }
      customMaxWidth="30rem"
      onClose={onClose}
    />
  )
}

export default EditOrderDateDialog
