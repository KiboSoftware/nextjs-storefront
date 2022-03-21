import React from 'react'

import { CardActionArea } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

// Interface
interface ColorSelecotorProps {
  colors?: Array<string>
  onChange: (color: string) => void
}

export default function KiboColorPicker(props: ColorSelecotorProps) {
  const { colors = [], onChange } = props
  const [selectedColor, changeSelectedColor] = React.useState('#fff')
  const handleChange = (color: string) => {
    changeSelectedColor(color)
    onChange(color)
  }

  const styles = {
    width: '1.938rem',
    height: '1.938rem',
    m: 0.5,
    borderRadius: 0,
  }

  return (
    <Box width="100%" display="flex" pb={1} data-testid="product-variant-color-selector">
      {colors.map((each, i) => {
        return (
          <Paper
            key={i}
            elevation={each === selectedColor ? 2 : 0}
            sx={({ palette }) => ({
              ...styles,
              backgroundColor: `${each}`,
              ...(each === selectedColor && {
                border: `1px solid ${palette.common.white}`,
                outline: `2px solid ${palette.common.black}`,
              }),
            })}
            onClick={() => handleChange(each)}
            data-testid="color-options"
          ></Paper>
        )
      })}
    </Box>
  )
}
