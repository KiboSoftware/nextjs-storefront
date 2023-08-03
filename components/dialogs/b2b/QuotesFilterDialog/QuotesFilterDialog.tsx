import React from 'react'

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useTranslation } from 'next-i18next'

import { KiboDialog, KiboRadio } from '@/components/common'

interface CartDetailsProps {
  closeModal: () => void
}

interface QuotesFilterActionsProps {
  onApply: () => void
  onClear: () => void
}

const FilterInput = ({ label = '' }) => {
  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel shrink htmlFor={label}>
        {label}
      </InputLabel>
      <DatePicker
        openTo="day"
        views={['year', 'month', 'day']}
        value={''}
        onChange={(newValue) => console.log(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            id={label}
            size="small"
            sx={{
              'label + &': {
                marginTop: 3,
              },
            }}
          />
        )}
      />
    </FormControl>
  )
}

const QuotesFilterContent = () => {
  const { t } = useTranslation('common')
  const statusFilterRadioOptions = [
    {
      label: <Typography variant="body2">{t('pending')}</Typography>,
      value: 'Pending',
      name: 'pending',
    },
    {
      label: <Typography variant="body2">{t('in-review')}</Typography>,
      value: 'InReview',
      name: 'inReview',
    },
    {
      label: <Typography variant="body2">{t('ready-for-checkout')}</Typography>,
      value: 'ReadyForCheckout',
      name: 'readyForCheckout',
    },
  ]

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FilterInput label="Expiration Date" />
        </Grid>
        <Grid item xs={12}>
          <FilterInput label="Date Created" />
        </Grid>
        <Grid item xs={12}>
          <KiboRadio
            name="quote-status"
            title={<InputLabel shrink>{t('status')}</InputLabel>}
            radioOptions={statusFilterRadioOptions}
            onChange={() => null}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

const QuotesFilterActions = (props: QuotesFilterActionsProps) => {
  const { onApply, onClear } = props
  const { t } = useTranslation('common')
  const theme = useTheme()
  const tabAndDesktop = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Stack gap={2} width="100%" direction={tabAndDesktop ? 'row' : 'column'}>
      <Button
        name="clear"
        sx={{ width: '100%' }}
        variant="contained"
        color="secondary"
        onClick={onClear}
      >
        {t('clear')}
      </Button>
      <Button name="confirm" sx={{ width: '100%' }} variant="contained" onClick={onApply}>
        {t('apply')}
      </Button>
    </Stack>
  )
}

// Component
const QuotesFilterDialog = (props: CartDetailsProps) => {
  const { closeModal } = props
  const { t } = useTranslation('common')

  const handleFilterApply = () => {
    closeModal()
  }
  const handleFilterClear = () => {
    closeModal()
  }

  const DialogArgs = {
    Title: t('apply-filter'),
    Content: <QuotesFilterContent />,
    showContentTopDivider: true,
    showContentBottomDivider: false,
    Actions: <QuotesFilterActions onApply={handleFilterApply} onClear={handleFilterClear} />,
    isDialogCentered: true,
    customMaxWidth: '32.375rem',
    onClose: () => closeModal(),
  }

  return <KiboDialog {...DialogArgs} />
}
export default QuotesFilterDialog
