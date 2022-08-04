import React, { JSXElementConstructor, ReactElement } from 'react'

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Theme,
  SxProps,
} from '@mui/material'

interface KiboRadioProps {
  title?: string
  selected?: string
  align?: 'baseline' | 'center'
  radioOptions: {
    label: string | number | ReactElement<any, string | JSXElementConstructor<any>>
    value: string
    name: string
  }[]
  sx?: SxProps<Theme>
  onChange: (value: string) => void
}

export const KiboRadio = (props: KiboRadioProps) => {
  const { title, radioOptions, selected = '', sx, align = 'center', onChange } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <FormControl>
      <FormLabel
        id="kibo-radio-buttons-group-label"
        sx={{ fontSize: 'subtitle2', color: 'text.primary', pb: 1 }}
      >
        {title}
      </FormLabel>
      <RadioGroup
        aria-labelledby="kibo-radio"
        name="radio-buttons-group"
        value={selected}
        onChange={handleChange}
      >
        {radioOptions.map((radio, index) => {
          return (
            <FormControlLabel
              sx={{ width: 'fit-content', alignItems: align, ...sx }}
              key={radio.value + index}
              value={radio.value}
              control={<Radio inputProps={{ 'aria-label': radio.name }} />}
              label={radio.label}
            />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}

export default KiboRadio
