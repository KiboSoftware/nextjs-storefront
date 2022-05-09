import { Typography, Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboImage from '../KiboImage/KiboImage'
import VISA from '@/assets/visa.svg'

interface PaymentCardDetailsViewProps {
  title?: string
  cardLastFourDigits?: string
  expireMonth?: number
  expireYear?: number
  radio?: boolean
}

const PaymentCard = (props: PaymentCardDetailsViewProps) => {
  const { title, cardLastFourDigits, expireMonth, expireYear } = props
  const { t } = useTranslation('checkout')

  return (
    <>
      {title && (
        <Typography variant="subtitle2" fontWeight={600}>
          {title}
        </Typography>
      )}
      <Box display="flex" pt={1} gap={3}>
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

export default PaymentCard
