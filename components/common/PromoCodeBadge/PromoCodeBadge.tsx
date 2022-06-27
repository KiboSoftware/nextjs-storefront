/** @format */

import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Typography, Box, Button, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboTextBox from '@/components/common/KiboTextBox/KiboTextBox'

export interface PromocodeBadgeProps {
  onApplyCouponCode: (promo: string) => void
  onRemoveCouponCode: (promo: string) => void
  promoList: string[]
  promoError: boolean
  helpText?: string
}
const styles = {
  boxStyle: {
    display: 'inline-block',
    mr: '0.5rem',
    mt: '0.5rem',
    px: '0.5rem',
    backgroundColor: '#DCDCDC',
  },
  textBoxStyle: {
    minWidth: '10rem',
    maxWidth: '17rem',
    mr: '0.5rem',
  },
  buttonStyle: { width: '5rem', height: '2.20rem', marginTop: '1.5rem' },
}

export const PromoCodeBadge = (props: PromocodeBadgeProps) => {
  const { t } = useTranslation('common')
  const { onApplyCouponCode, onRemoveCouponCode, promoList, promoError, helpText } = props
  const [promo, setPromo] = useState<string>('')
  const handleChange = (_name: any, value: string) => {
    setPromo(value)
  }

  const handleApplyCouponCode = () => {
    const couponCode = (element: string) => element === promo
    if (!promoList?.some(couponCode)) {
      onApplyCouponCode(promo)
      setPromo('')
    }
  }
  const handleRemoveCouponCode = (item: any) => {
    onRemoveCouponCode(item)
  }

  return (
    <>
      <Stack direction="row" sx={{ maxWidth: '20rem' }}>
        <KiboTextBox
          name="promocode"
          value={promo}
          placeholder={t('promo-code')}
          sx={styles.textBoxStyle}
          onChange={handleChange}
          error={promoError}
          helperText={helpText}
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
        <>
          <Box data-testid="promotype" component="div" sx={styles.boxStyle}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography sx={{ textAlign: 'left' }}>{coupon}</Typography>
              <CloseIcon
                sx={{
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
                onClick={() => handleRemoveCouponCode(coupon)}
              />
            </Stack>
          </Box>
        </>
      ))}
    </>
  )
}
