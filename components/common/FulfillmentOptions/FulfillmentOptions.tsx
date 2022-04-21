import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useTranslation } from 'next-i18next'

const FulfillmentOptions = () => {
  const { t } = useTranslation('common')
  const ship = t('ship')
  const pickup = t('pickup')

  return (
    <Box
      data-testid="fulfillmentOptions"
      sx={{ px: '2rem', pt: { xs: '1rem', sm: '1rem', md: 0 } }}
    >
      <RadioGroup aria-label="fulfillmentOption" name="row-radio-buttons-group">
        <FormControlLabel value="Ship" control={<Radio />} label={ship} />
        <FormControlLabel value="Pickup" control={<Radio />} label={pickup} />
      </RadioGroup>
    </Box>
  )
}

export default FulfillmentOptions
