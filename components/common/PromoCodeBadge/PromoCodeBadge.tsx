/** @format */

import { useState, useRef, useEffect } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Typography, Box, Button, Stack, IconButton } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboTextBox from '../KiboTextBox/KiboTextBox'

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

export const PromoCodeBadge = (props: any) => {
  const promoRef = useRef<any>()
  const [promo, setPromo] = useState<string>('')
  const [promoActive, setPromoActive] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true)

  const handleOnChange = (_name: any, value: any) => {
    setPromo(value)
  }
  const { t } = useTranslation('common')
  const { onApplyCouponCode, onRemoveCouponCode, couponList } = props

  const handleApplyCouponCode = () => {
    setPromoActive(true)
    onApplyCouponCode(promo)
    setPromo('')
    promoRef.current.value = null
  }
  const handleRemoveCouponCode = (item: any) => {
    onRemoveCouponCode(item)
    if (couponList.length === 0) {
      setPromoActive(false)
    }
  }
  useEffect(() => {
    if (promo?.length > 0) {
      setIsEnabled(false)
    } else {
      setIsEnabled(true)
    }
  }, [promo])
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <KiboTextBox
          inputRef={promoRef}
          onChange={handleOnChange}
          sx={styles.textBoxStyle}
          placeholder={t('promo-code')}
          data-testid="enter-promo"
        />
        <Button
          disabled={isEnabled}
          onClick={handleApplyCouponCode}
          sx={styles.buttonStyle}
          variant="contained"
          data-testid="promo-button"
        >
          {t('apply')}
        </Button>
      </Box>
      {promoActive && (
        <>
          {couponList?.map((e: any) => (
            <>
              <Box component="div" sx={styles.boxStyle}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Typography sx={{ textAlign: 'left' }}>{e}</Typography>
                  <IconButton>
                    <CloseIcon
                      sx={{
                        cursor: 'pointer',
                        fontSize: '1rem',
                      }}
                      onClick={() => handleRemoveCouponCode(e)}
                    />
                  </IconButton>
                </Stack>
              </Box>
            </>
          ))}
        </>
      )}
    </>
  )
}

export const PromoCodeBadgeMain = () => {
  const [couponList, setCouponList] = useState<any>([])
  const onRemoveCouponCode = (list: any) => {
    setCouponList((coupon: any) => coupon.filter((item: any) => item !== list))
  }
  const onApplyCouponCode = (promo: any) => {
    setCouponList((e: any) => [...e, promo])
  }
  return (
    <>
      <PromoCodeBadge
        onApplyCouponCode={onApplyCouponCode}
        onRemoveCouponCode={onRemoveCouponCode}
        setCouponList={setCouponList}
        couponList={couponList}
      />
    </>
  )
}
