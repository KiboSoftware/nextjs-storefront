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

import VISA from '@/assets/visa.svg'
import KiboImage from '@/components/common/KiboImage/KiboImage'

interface PaymentCardDetailsViewProps {
  title?: string
  cardLastFourDigits?: string
  expireMonth?: number
  expireYear?: number
  radio?: boolean
}

const PaymentCardDetailsView = (props: PaymentCardDetailsViewProps) => {
  const { title, radio = false } = props
  return (
    <Box maxWidth={168} data-testid="payment-card-details-view">
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
                label={<PaymentDetails details={props} />}
              />
            </RadioGroup>
          </FormControl>
        </>
      ) : (
        <PaymentDetails details={props} />
      )}
    </Box>
  )
}

export default PaymentCardDetailsView

const PaymentDetails = (props: { details: PaymentCardDetailsViewProps }) => {
  const { title, cardLastFourDigits, expireMonth, expireYear, radio } = props.details
  const { t } = useTranslation('checkout')

  return (
    <>
      {!radio && <Typography variant="subtitle2">{title}</Typography>}
      <Box display="flex" justifyContent={'space-between'} pt={1} gap={3}>
        <Box minWidth={32}>
          <KiboImage src={VISA} alt="visa" width={32} height={24} />
        </Box>
        <Box>
          <Box display="flex">
            <Typography variant="body1" sx={{ pr: 1 }} component="span">
              {t('ending')}
            </Typography>
            <Typography variant="body1" component="span">
              {cardLastFourDigits}
            </Typography>
          </Box>
          <Box display="flex">
            <Typography variant="body1" sx={{ pr: 1 }} component="span">
              {t('exp')}
            </Typography>
            <Typography variant="body1" component="span">
              {expireMonth}/{expireYear}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
