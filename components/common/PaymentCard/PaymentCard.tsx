import { useMemo } from 'react'

import { Typography, Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboImage from '../KiboImage/KiboImage'
import { getCreditCardLogo } from '@/lib/helpers/credit-card'

interface PaymentCardProps {
  title?: string
  cardNumberPart: string
  expireMonth: number
  expireYear: number
  cardType?: string
  radio?: boolean
}

const PaymentCard = (props: PaymentCardProps) => {
  const { title, cardNumberPart, expireMonth, expireYear, cardType } = props
  const { t } = useTranslation('common')
  const cardTypeMemoized = useMemo(() => getCreditCardLogo(cardType as string), [cardType])

  return (
    <>
      {title && (
        <Typography variant="subtitle2" fontWeight={600}>
          {title}
        </Typography>
      )}
      <Box display="flex" pt={1} gap={2} data-testid="credit-card-view">
        <Box minWidth={45}>
          {cardTypeMemoized && (
            <KiboImage src={cardTypeMemoized} alt={cardType as string} width={45} height={35} />
          )}
        </Box>
        <Box>
          <Box display="flex">
            <Typography variant="body1" sx={{ pr: 1 }} component="span">
              {t('ending')}
            </Typography>
            <Typography variant="body1" component="span">
              {cardNumberPart}
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

export default PaymentCard
