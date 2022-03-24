import React from 'react'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'

import { ProductOptionValue } from '@/lib/gql/types'

interface ProductVariantColorSelectorProps {
  attributeFQN: string
  values: ProductOptionValue[]
  onChange: (attributeFQN?: string, value?: string) => void
}

interface ColorOptionsProps extends ProductOptionValue {
  attributeFQN?: string
  handleColorSelection: (attributeFQN?: string, value?: string) => void
}

const styles = {
  productVariantColor: {
    width: '1.938rem',
    height: '1.938rem',
    marginRight: 3,
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    elevation: 0,
    borderColor: '#DCDCDC',
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
  const { attributeFQN, value, isSelected = false, isEnabled = true, handleColorSelection } = props
  const chipCustom = (
    <Chip
      sx={{
        ...styles.productVariantColor,
        ...(isSelected && styles.selected),
        ...(!isEnabled && styles.disabled),
        backgroundColor: `${value}`,
      }}
      {...(!isSelected &&
        isEnabled && { onClick: () => handleColorSelection(attributeFQN, value) })}
      data-testid={`colorvalue-${value}`}
    ></Chip>
  )

  return isEnabled ? <>{chipCustom}</> : <Tooltip title="Not available !">{chipCustom}</Tooltip>
}

const KiboColorPicker = ({ attributeFQN, values, onChange }: ProductVariantColorSelectorProps) => {
  return (
    <Box display="flex" flexWrap="wrap" data-testid="color-selector">
      {values?.map((option, index) => (
        <ColorOptions
          key={index}
          attributeValueId={option.attributeValueId}
          attributeFQN={attributeFQN}
          value={option?.value}
          isSelected={option?.isSelected}
          isEnabled={option?.isEnabled}
          handleColorSelection={onChange}
        />
      ))}
    </Box>
  )
}

export default KiboColorPicker
