/** @format */

import { useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Typography, Box, Button, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboTextBox } from '@/components/common'

export interface PromoCodeBadgeProps {
  onApplyCouponCode: (promo: string) => void
  onRemoveCouponCode: (promo: string) => void
  promoList?: string[] | null
  promoError: boolean
  helpText?: string
}
const styles = {
  boxStyle: {
    display: 'inline-block',
    mr: '0.5rem',
    px: '0.5rem',
    backgroundColor: 'grey.500',
  },
  textBoxStyle: {
    minWidth: '10rem',
    mr: '0.5rem',
  },
  buttonStyle: { width: '5rem', height: '2.20rem', marginTop: '1.5rem' },
}

const PromoCodeBadge = (props: PromoCodeBadgeProps) => {
  const { t } = useTranslation('common')
  const { onApplyCouponCode, onRemoveCouponCode, promoList, promoError, helpText } = props
  const [promo, setPromo] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | undefined>(helpText as string)

  const handleApplyCouponCode = () => {
    setErrorMessage('')
    const isPromoCodeApplied = promoList?.find((promoCode) => {
      return promoCode.toLowerCase() === promo.toLowerCase()
    })

    if (!isPromoCodeApplied) {
      onApplyCouponCode(promo)
      setPromo('')
    } else {
      setErrorMessage(t('promo-code-already-in-use'))
    }
  }

  const handleRemoveCouponCode = (item: string) => {
    onRemoveCouponCode(item)
  }

  useEffect(() => {
    setErrorMessage(helpText as string)
  }, [promoError])

  return (
    <>
      <Stack direction="row">
        <KiboTextBox
          name="promocode"
          value={promo}
          placeholder={t('promo-code')}
          sx={styles.textBoxStyle}
          onChange={(_name, value) => setPromo(value)}
          error={!!errorMessage}
          helperText={errorMessage}
          data-testid="promo-input"
        />
        <Button
          disabled={promo?.length > 0 ? false : true}
          onClick={handleApplyCouponCode}
          sx={styles.buttonStyle}
          variant="contained"
          data-testid="promo-button"
        >
          {t('apply')}
        </Button>
      </Stack>
      {promoList?.map((coupon: string) => (
        <Box key={coupon} data-testid="promotype" component="div" sx={styles.boxStyle}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography sx={{ textAlign: 'left' }}>{coupon}</Typography>
            <CloseIcon
              aria-label="remove-promo-code"
              sx={{
                cursor: 'pointer',
                fontSize: '1rem',
              }}
              onClick={() => handleRemoveCouponCode(coupon)}
            />
          </Stack>
        </Box>
      ))}
    </>
  )
}

export default PromoCodeBadge
