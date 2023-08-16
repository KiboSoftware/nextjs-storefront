import React, { useState } from 'react'

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
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'

import { KiboDialog, KiboRadio } from '@/components/common'
import { QuoteFilters } from '@/lib/types'

interface QuotesFilterDialogProps {
  filters: QuoteFilters
  onFilterAction: (val: QuoteFilters) => void
  closeModal: () => void
}

interface QuotesFilterActionsProps {
  onApply: () => void
  onClear: () => void
}

interface FilterInputProps {
  label: string
  value: string
  handleDateChange: (date: string) => void
}

const FilterTypes = {
  EXPIRATION_DATE: 'expirationDate',
  CREATE_DATE: 'createDate',
  STATUS: 'status',
}

const FilterInput = ({ label = '', value = '', handleDateChange }: FilterInputProps) => {
  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel shrink htmlFor={label}>
        {label}
      </InputLabel>
      <DatePicker
        openTo="day"
        views={['year', 'month', 'day']}
        inputFormat="YYYY-MM-DD"
        value={value ? dayjs(value) : null}
        onChange={(newValue) => {
          handleDateChange(dayjs(newValue).format('YYYY-MM-DD'))
        }}
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

interface QuotesFilterContentProps {
  filterValues: any
  onFilterInput: (value: string, field: string) => void
}
const QuotesFilterContent = (props: QuotesFilterContentProps) => {
  const { filterValues, onFilterInput } = props
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
          <FilterInput
            label={t('expiration-date')}
            value={filterValues[FilterTypes.EXPIRATION_DATE]}
            handleDateChange={(value) => onFilterInput(value, FilterTypes.EXPIRATION_DATE)}
          />
        </Grid>
        <Grid item xs={12}>
          <FilterInput
            label={t('date-created')}
            value={filterValues[FilterTypes.CREATE_DATE]}
            handleDateChange={(value) => onFilterInput(value, FilterTypes.CREATE_DATE)}
          />
        </Grid>
        <Grid item xs={12}>
          <KiboRadio
            name="quote-status"
            title={<InputLabel shrink>{t('status')}</InputLabel>}
            radioOptions={statusFilterRadioOptions}
            selected={filterValues[FilterTypes.STATUS]}
            onChange={(value) => {
              onFilterInput(value, FilterTypes.STATUS)
            }}
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
const QuotesFilterDialog = (props: QuotesFilterDialogProps) => {
  const { filters, onFilterAction, closeModal } = props
  const { t } = useTranslation('common')

  const [filterValues, setFilterValues] = useState<QuoteFilters>(filters)

  const handleFilterInput = (value: string, field: string) => {
    setFilterValues({
      ...filterValues,
      [field]: value,
    })
  }

  const handleFilterApply = () => {
    onFilterAction(filterValues)
    closeModal()
  }

  const handleFilterClear = () => {
    setFilterValues({
      ...filterValues,
      expirationDate: '',
      createDate: '',
      status: '',
    })
    onFilterAction(filterValues)
  }

  const DialogArgs = {
    Title: t('apply-filter'),
    Content: <QuotesFilterContent filterValues={filterValues} onFilterInput={handleFilterInput} />,
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
