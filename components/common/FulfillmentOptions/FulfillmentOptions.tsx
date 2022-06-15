import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboRadio from '../KiboRadio/KiboRadio'
import { FulfillmentOption } from '@/lib/types'

interface FulfillmentOptionsProps {
  fulfillmentOptions: FulfillmentOption[]
  onRadioChange?: () => void
  onStoreSelectClick?: () => void
}

interface FulfillmentOptionLabelProps {
  label?: string
  details?: string
  cta?: string
  onStoreSelectClick?: () => void
}

const FulfillmentOptionLabel = (props: FulfillmentOptionLabelProps) => {
  const { cta, label, details, onStoreSelectClick } = props
  return (
    <Stack sx={{ pt: 2 }}>
      <Box display="flex" gap={2}>
        <Typography variant="body2">{label}</Typography>
        <Typography variant="body2">{details}</Typography>
      </Box>
      <Typography
        variant="caption"
        onClick={() => onStoreSelectClick && onStoreSelectClick()}
        sx={{ textDecoration: 'underline' }}
      >
        {cta}
      </Typography>
    </Stack>
  )
}

const FulfillmentOptions = (props: FulfillmentOptionsProps) => {
  const { t } = useTranslation('common')
  const { fulfillmentOptions, onRadioChange, onStoreSelectClick } = props

  const radioOptions = fulfillmentOptions.map((option) => {
    return {
      value: option.shortName as string,
      label: (
        <FulfillmentOptionLabel
          label={option.label}
          details={option.details}
          onStoreSelectClick={onStoreSelectClick}
          {...(!option.disabled && {
            cta: option.details ? t('change store') : t('select store'),
          })}
        />
      ),
    }
  })

  return (
    <Box
      data-testid="fulfillmentOptions"
      sx={{ px: '2rem', pt: { xs: '1rem', sm: '1rem', md: 0 } }}
    >
      <KiboRadio radioOptions={radioOptions} onChange={onRadioChange} />
    </Box>
  )
}

export default FulfillmentOptions
