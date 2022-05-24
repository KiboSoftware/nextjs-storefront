/** @format */

import { useState } from 'react'

import { Box, Button } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboTextBox from '../KiboTextBox/KiboTextBox'

const styles = {
  textBoxStyle: {
    minWidth: '10rem',
    maxWidth: '17rem',
    mr: '0.5rem',
  },
  buttonStyle: { width: '5rem', height: '2.20rem', marginTop: '1.5rem' },
}
const PromoCode = () => {
  const [, setPromo] = useState('')

  const handleOnChange = (_name: any, value: string) => {
    setPromo(value)
  }
  const { t } = useTranslation('common')

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <KiboTextBox
          onChange={handleOnChange}
          sx={styles.textBoxStyle}
          placeholder={t('promo-code')}
        />
        <Button disabled sx={styles.buttonStyle} variant="contained">
          {t('apply')}
        </Button>
      </Box>
    </>
  )
}
export default PromoCode
