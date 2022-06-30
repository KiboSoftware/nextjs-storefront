import React from 'react'

import { Add, Remove } from '@mui/icons-material'
import { Stack, TextField, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

// Interface
interface QuantitySelectorProps {
  quantity: number
  label?: string
  maxQuantity?: number
  onIncrease?: () => void
  onDecrease?: () => void
}

interface QuantityInputProps {
  quantity: number
}

// MUI
const styles = {
  iconButton: {
    border: 1,
    borderColor: 'text.primary',
    height: 22,
    width: 22,
  },
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
const QuantitySelector = (props: QuantitySelectorProps) => {
  const { quantity, label, maxQuantity, onIncrease, onDecrease } = props
  const { t } = useTranslation('common')

  return (
    <Stack direction="row" justifyContent="flec-start" alignItems="center" spacing={1.2}>
      <Typography variant="body2" component="span" sx={{ pr: '0.5rem' }} data-testid="label">
        {label}:
      </Typography>

      <IconButton
        onClick={onDecrease}
        disabled={quantity === 1 ? true : false}
        sx={{ ...styles.iconButton }}
        aria-label={t('decrease')}
        component="span"
      >
        <Remove fontSize="small" />
      </IconButton>

      <QuantityTextField quantity={quantity} />

      <IconButton
        onClick={onIncrease}
        disabled={maxQuantity === quantity ? true : false}
        sx={{ ...styles.iconButton }}
        aria-label={t('increase')}
        component="span"
      >
        <Add fontSize="small" />
      </IconButton>
    </Stack>
  )
}

export default QuantitySelector
