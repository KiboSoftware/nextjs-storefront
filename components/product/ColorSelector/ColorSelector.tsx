import React from 'react'

import { Box, Chip, Tooltip } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTranslation } from 'next-i18next'

import type { ProductOptionValue } from '@/lib/gql/types'

interface ColorSelectorProps {
  attributeFQN: string
  values: ProductOptionValue[]
  onColorChange: (attributeFQN: string, value: string) => void
}

interface ColorOptionsProps extends ProductOptionValue {
  attributeFQN: string
  onColorSelection: (attributeFQN: string, value: string) => void
}

const styles = {
  productVariantColor: {
    width: '1.938rem',
    height: '1.938rem',
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    elevation: 0,
    borderColor: `${grey[300]}`,
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  selected: {
    outlineColor: 'common.black',
    outlineWidth: '1px',
    outlineStyle: 'solid',
    outlineOffset: 4,
    elevation: 2,
    cursor: 'default',
  },
  disabled: {
    cursor: 'default',
  },
}

const ColorOptions = (props: ColorOptionsProps) => {
  const { attributeFQN, value, isSelected = false, isEnabled = true, onColorSelection } = props
  const { t } = useTranslation('common')
  const chipCustom = (
    <Chip
      sx={{
        ...styles.productVariantColor,
        ...(isSelected && styles.selected),
        ...(!isEnabled && styles.disabled),
        backgroundColor: `${value}`,
        '&:hover': {
          backgroundColor: `${value}`,
        },
      }}
      {...(!isSelected && isEnabled && { onClick: () => onColorSelection(attributeFQN, value) })}
      data-testid={`colorvalue-${value}-${isSelected ? 'selected' : ''}`}
    ></Chip>
  )

  return isEnabled ? (
    <>{chipCustom}</>
  ) : (
    <Tooltip title={t('not-available !') || ''}>{chipCustom}</Tooltip>
  )
}

const ColorSelector = ({ attributeFQN, values, onColorChange }: ColorSelectorProps) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} data-testid="color-selector">
      {values?.map((option) => (
        <ColorOptions
          key={option.value}
          attributeValueId={option.attributeValueId}
          attributeFQN={attributeFQN}
          value={option?.value}
          isSelected={option?.isSelected}
          isEnabled={option?.isEnabled}
          onColorSelection={onColorChange}
        />
      ))}
    </Box>
  )
}

export default ColorSelector
