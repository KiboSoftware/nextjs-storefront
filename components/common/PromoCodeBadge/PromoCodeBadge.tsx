/** @format */

import { useState, useRef, useEffect } from 'react'

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { Typography, Box, Button, Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboTextBox from '../KiboTextBox/KiboTextBox'

const styles = {
  boxStyle: {
    display: 'inline-block',
    mx: '1rem',
    mt: '0.2rem',
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
  },
  textBoxStyle: {
    minWidth: '10rem',
    maxWidth: '17rem',
    mr: '0.5rem',
  },
  buttonStyle: { width: '5rem', height: '2.20rem', marginTop: '1.5rem' },
}

const PromoCodeBadge = () => {
  const promoRef = useRef()
  const [promo, setPromo] = useState('')
  const [promoActive, setPromoActive] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [isEnabled, setIsEnabled] = useState(true)

  const handleOnChange = (name: any, value: any) => {
    setPromo(value)
  }
  const { t } = useTranslation('common')

  const handleOnClick = () => {
    setPromoActive(true)
    setPromoCode(promo)
    promoRef.current.value = null
  }
  const handleClose = () => {
    setPromoActive(false)
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
          onClick={handleOnClick}
          sx={styles.buttonStyle}
          variant="contained"
          data-testid="promo-button"
        >
          {t('apply')}
        </Button>
      </Box>
      {promo?.length > 0 && promoActive && (
        <Box sx={styles.boxStyle}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Typography sx={{ mx: '1rem', textAlign: 'left' }}>
              {promoCode}
              <CancelOutlinedIcon
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  ml: '0.5rem',
                }}
                fontSize="inherit"
                onClick={handleClose}
              />
            </Typography>
          </Stack>
        </Box>
      )}
    </>
  )
}
export default PromoCodeBadge
