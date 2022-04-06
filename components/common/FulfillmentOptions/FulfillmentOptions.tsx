import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useTranslation } from 'next-i18next'

const FulfillmentOptions = () => {
  const { t } = useTranslation('common')
  const ship = t('ship')
  const pickup = t('pickup')

  return (
    <Box data-testid="fulfillmentOptions" sx={{ px: '2rem' }}>
      <RadioGroup aria-label="fulfillmentOption" name="row-radio-buttons-group">
        <FormControlLabel value="Ship" control={<Radio />} label={ship} />
        <FormControlLabel value="Pickup" control={<Radio />} label={pickup} />
      </RadioGroup>
    </Box>
  )
}

export default FulfillmentOptions
