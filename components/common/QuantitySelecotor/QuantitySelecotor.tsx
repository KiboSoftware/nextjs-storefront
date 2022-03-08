import React from 'react'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Stack, TextField, IconButton } from '@mui/material'
import { useTranslation } from 'next-i18next'

// Interface
interface QuantitySelecotorProps {
  quantity?: number
  onIncrease: () => void
  onDecrease: () => void
}

interface QuantityInputProps {
  quantity: number
}

// MUI
const sx = {
  border: 1,
  borderColor: 'text.primary',
  height: 25,
  width: 25,
}

const QuantityTextField = ({ quantity }: QuantityInputProps) => (
  <TextField
    name="quantity"
    value={quantity}
    inputProps={{
      'aria-label': 'quantity',
      inputMode: 'numeric',
      pattern: '[0-9]*',
      style: {
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
      },
    }}
    sx={{ width: '46px', height: '37px' }}
  />
)

// Component
const QuantitySelecotor = (props: QuantitySelecotorProps) => {
  const { quantity = 1, onIncrease, onDecrease } = props
  const { t } = useTranslation('common')

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1.5}>
      <IconButton
        onClick={onDecrease}
        disabled={quantity === 1 ? true : false}
        sx={{ ...sx }}
        aria-label={t('decrease')}
        component="span"
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <QuantityTextField quantity={quantity} />
      <IconButton onClick={onIncrease} sx={{ ...sx }} aria-label={t('increase')} component="span">
        <AddIcon fontSize="small" />
      </IconButton>
    </Stack>
  )
}

export default QuantitySelecotor
