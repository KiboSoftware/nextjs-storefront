import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboRadio } from '@/components/common'
import { FulfillmentOptions as FulfillmentOptionsConstant } from '@/lib/constants'
import type { FulfillmentOption } from '@/lib/types'

interface FulfillmentOptionsProps {
  title?: string
  fulfillmentOptions: FulfillmentOption[]
  selected: string
  onFulfillmentOptionChange: (value: string) => void
  onStoreSetOrUpdate: (value: string) => void
}

interface FulfillmentOptionLabelProps {
  label: string
  details?: string
  storeActionLabel?: string
  optionValue?: string
  onStoreSelection: (value: string) => void
}

const FulfillmentOptionLabel = (props: FulfillmentOptionLabelProps) => {
  const { storeActionLabel, label, details, optionValue, onStoreSelection } = props
  return (
    <Stack sx={{ pt: storeActionLabel ? 2 : 0 }}>
      <Box display="flex" gap={2} justifyContent="flex-start">
        <Typography variant="body2">{label}</Typography>
        <Typography variant="body2">{details}</Typography>
      </Box>
      {
        <Typography
          variant="caption"
          onClick={() => onStoreSelection(optionValue as string)}
          sx={{ textDecoration: 'underline' }}
        >
          {storeActionLabel}
        </Typography>
      }
    </Stack>
  )
}

const FulfillmentOptions = (props: FulfillmentOptionsProps) => {
  const { t } = useTranslation('common')

  const { title, fulfillmentOptions, selected, onFulfillmentOptionChange, onStoreSetOrUpdate } =
    props

  const getStoreActionLabel = (option: FulfillmentOption) => {
    if (!option?.disabled && option.shortName !== FulfillmentOptionsConstant.SHIP) {
      if (option.shortName === FulfillmentOptionsConstant.DELIVERY) {
        return ''
      } else if (option?.details) {
        return t('change-store')
      } else {
        return t('select-store')
      }
    }
    return ''
  }
  const radioOptions = fulfillmentOptions?.map((option) => {
    return {
      value: option.shortName as string,
      name: option.shortName as string,
      disabled: option?.disabled,
      label: (
        <FulfillmentOptionLabel
          label={option?.label as string}
          details={option?.details}
          onStoreSelection={() => onStoreSetOrUpdate(option?.value as string)}
          storeActionLabel={getStoreActionLabel(option)}
          optionValue={option?.value as string}
        />
      ),
    }
  })

  return (
    <Box data-testid="fulfillmentOptions">
      <KiboRadio
        title={title}
        radioOptions={radioOptions}
        selected={selected}
        onChange={onFulfillmentOptionChange}
      />
    </Box>
  )
}

export default FulfillmentOptions
