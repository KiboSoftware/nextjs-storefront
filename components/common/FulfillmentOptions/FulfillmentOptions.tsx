import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboRadio from '@/components/common/KiboRadio/KiboRadio'
import type { FulfillmentOption } from '@/lib/types'

interface FulfillmentOptionsProps {
  fulfillmentOptions: FulfillmentOption[]
  onFullfillmentOptionChange: () => void
  onStoreSelection: () => void
}

interface FulfillmentOptionLabelProps {
  label: string
  details?: string
  storeActionLabel?: string
  onStoreSelection: () => void
}

const FulfillmentOptionLabel = (props: FulfillmentOptionLabelProps) => {
  const { storeActionLabel, label, details, onStoreSelection } = props
  return (
    <Stack sx={{ pt: 2 }}>
      <Box display="flex" gap={2}>
        <Typography variant="body2">{label}</Typography>
        <Typography variant="body2">{details}</Typography>
      </Box>
      <Typography
        variant="caption"
        onClick={() => onStoreSelection()}
        sx={{ textDecoration: 'underline' }}
      >
        {storeActionLabel}
      </Typography>
    </Stack>
  )
}

const FulfillmentOptions = (props: FulfillmentOptionsProps) => {
  const { t } = useTranslation('common')
  const { fulfillmentOptions = [], onFullfillmentOptionChange, onStoreSelection } = props

  const radioOptions = fulfillmentOptions?.map((option) => {
    return {
      value: option.shortName as string,
      label: (
        <FulfillmentOptionLabel
          label={option?.label as string}
          details={option?.details}
          onStoreSelection={onStoreSelection}
          {...(!option?.disabled && {
            storeActionLabel: option?.details ? t('change-store') : t('select-store'),
          })}
        />
      ),
    }
  })

  return (
    <Box data-testid="fulfillmentOptions">
      <KiboRadio radioOptions={radioOptions} onChange={onFullfillmentOptionChange} />
    </Box>
  )
}

export default FulfillmentOptions
