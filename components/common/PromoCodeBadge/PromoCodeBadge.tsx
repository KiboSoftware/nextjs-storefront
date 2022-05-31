/** @format */

import { useState, useRef } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Typography, Box, Button, Stack, IconButton } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboTextBox from '@/components/common/KiboTextBox/KiboTextBox'
export interface PromocodeBadgeProps {
  onApplyCouponCode: (promo: string) => void
  onRemoveCouponCode: (promo: string) => void
  couponList: any
  errorPromo: string
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
  const { onApplyCouponCode, onRemoveCouponCode, couponList, errorPromo } = props

  const [promo, setPromo] = useState<string>('')
  const [promoerr, setpromoerr] = useState(false)
  const promoRef = useRef<any>()

  const handleOnChange = (_name: any, value: string) => {
    setPromo(value)
  }
  const { t } = useTranslation('common')

  const handleApplyCouponCode = () => {
    const Coupon = (element: string) => element === promo
    if (couponList?.some(Coupon)) {
    } else {
      if (promo === errorPromo) {
        setpromoerr(true)
        promoRef.current.value = null
      } else {
        setpromoerr(false)
        onApplyCouponCode(promo)
        setPromo('')
        promoRef.current.value = null
      }
    }
  }
  const handleRemoveCouponCode = (item: any) => {
    onRemoveCouponCode(item)
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <KiboTextBox
          inputRef={promoRef}
          onChange={handleOnChange}
          sx={styles.textBoxStyle}
          placeholder={t('promo-code')}
          data-testid="promo-input"
          helperText="Oops, this code is not valid. Please try again."
          error={promoerr}
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
      </Box>
      {couponList?.map((coupon: string[]) => (
        <>
          <Box data-testid="promotype" component="div" sx={styles.boxStyle}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography sx={{ textAlign: 'left' }}>{coupon}</Typography>
              <IconButton>
                <CloseIcon
                  sx={{
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                  onClick={() => handleRemoveCouponCode(coupon)}
                />
              </IconButton>
            </Stack>
          </Box>
        </>
      ))}
    </>
  )
}
