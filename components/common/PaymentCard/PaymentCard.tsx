import { Typography, Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboImage from '../KiboImage/KiboImage'
import { getCreditCardLogo } from '@/lib/helpers/credit-card'

interface PaymentCardDetailsViewProps {
  title?: string
  cardNumberPart: string
  expireMonth: number
  expireYear: number
  cardType?: string
  radio?: boolean
}

const PaymentCard = (props: PaymentCardDetailsViewProps) => {
  const { title, cardNumberPart, expireMonth, expireYear, cardType } = props
  const { t } = useTranslation('common')

  return (
    <>
      {title && (
        <Typography variant="subtitle2" fontWeight={600}>
          {title}
        </Typography>
      )}
      <Box display="flex" pt={1} gap={2}>
        <Box minWidth={45}>
          <KiboImage
            src={getCreditCardLogo(cardType as string)}
            alt={cardType!}
            width={45}
            height={35}
          />
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
