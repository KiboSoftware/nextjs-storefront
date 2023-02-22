import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboRadio } from '@/components/common'
import { FulfillmentOptions as FulfillmentOptionsConstant } from '@/lib/constants'
import type { FulfillmentOption } from '@/lib/types'

interface FulfillmentOptionsProps {
  fulfillmentOptions: FulfillmentOption[]
  selected: string
  onFulfillmentOptionChange: (value: string) => void
  onStoreSetOrUpdate: () => void
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
    <Stack sx={{ pt: storeActionLabel ? 2 : 0 }}>
      <Box display="flex" gap={2} justifyContent="flex-start">
        <Typography variant="body2">{label}</Typography>
        <Typography variant="body2">{details}</Typography>
      </Box>
      {
        <Typography
          variant="caption"
          onClick={() => onStoreSelection()}
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

  const { fulfillmentOptions, selected, onFulfillmentOptionChange, onStoreSetOrUpdate } = props

  const radioOptions = fulfillmentOptions?.map((option) => {
    return {
      value: option.shortName as string,
      name: option.shortName as string,
      disabled: option?.disabled,
      label: (
        <FulfillmentOptionLabel
          label={option?.label as string}
          details={option?.details}
          onStoreSelection={onStoreSetOrUpdate}
          {...(!option?.disabled &&
            option.shortName !== FulfillmentOptionsConstant.SHIP && {
              storeActionLabel: option?.details ? t('change-store') : t('select-store'),
            })}
        />
      ),
    }
  })

  return (
    <Box data-testid="fulfillmentOptions">
      <KiboRadio
        title={t('fulfillment-options')}
        radioOptions={radioOptions}
        selected={selected}
        onChange={onFulfillmentOptionChange}
      />
    </Box>
  )
}

export default FulfillmentOptions
