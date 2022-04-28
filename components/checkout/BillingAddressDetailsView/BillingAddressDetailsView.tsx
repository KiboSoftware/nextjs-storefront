import React from 'react'

import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'

interface BillingAddressDetailsViewProps {
  title?: string
  streetAddress?: string
  apartment?: string
  city?: string
  state?: string
  zipCode?: string
  radio?: boolean
}

const BillingAddressDetailsView = (props: BillingAddressDetailsViewProps) => {
  const { title, radio = false } = props
  const { t } = useTranslation('checkout')

  return (
    <Box maxWidth={168}>
      {radio ? (
        <>
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ fontSize: 'subtitle2', color: 'text.primary' }}
            >
              {title}
            </FormLabel>
            <RadioGroup aria-labelledby="payment-details-radio" name="radio-buttons-group">
              <FormControlLabel
                value=""
                control={<Radio />}
                label={<BillingAddress details={props} />}
              />
            </RadioGroup>
          </FormControl>
        </>
      ) : (
        <BillingAddress details={props} />
      )}
    </Box>
  )
}

export default BillingAddressDetailsView

const BillingAddress = (props: { details: BillingAddressDetailsViewProps }) => {
  const { title, streetAddress, apartment, city, state, zipCode, radio } = props.details
  const { t } = useTranslation('checkout')

  return (
    <>
      {!radio && <Typography variant="subtitle2">{title}</Typography>}

      <Box pt={1}>
        <Typography variant="body1">{streetAddress}</Typography>
        <Typography variant="body1">
          {t('apartment')}
          {apartment}
        </Typography>
        <Box display="flex">
          <Typography variant="body1" sx={{ '&::after': { content: "','" } }}>
            {city}
          </Typography>
          <Typography variant="body1" sx={{ '&::after': { content: "','" } }}>
            {state}
          </Typography>
          <Typography variant="body1">{zipCode}</Typography>
        </Box>
      </Box>
    </>
  )
}
