import React, { JSXElementConstructor, ReactElement, useState } from 'react'

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
  radioOptions: {
    label: string | number | ReactElement<any, string | JSXElementConstructor<any>>
    value: string
  }[]
  sx?: SxProps<Theme>
  onChange?: (value: string) => void
}

export const KiboRadio = (props: KiboRadioProps) => {
  const { title, radioOptions, selected = '', sx, onChange } = props

  // const [selectedRadio, setSelectedRadio] = useState(selected)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setSelectedRadio((event.target as HTMLInputElement).value)
    onChange && onChange(event.target.value)
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
        {radioOptions.map((radio) => {
          return (
            <FormControlLabel
              sx={sx}
              key={radio.value}
              value={radio.value}
              control={<Radio />}
              label={radio.label}
            />
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}

export default KiboRadio
