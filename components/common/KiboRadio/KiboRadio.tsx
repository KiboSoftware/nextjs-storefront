import React, { JSXElementConstructor, ReactElement, useState } from 'react'

import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'

interface KiboRadioProps {
  title?: string
  selected?: string
  radioOptions: {
    label: string | number | ReactElement<any, string | JSXElementConstructor<any>>
    value: string
  }[]
  onChange?: (value: string) => void
}

export const KiboRadio = (props: KiboRadioProps) => {
  const { title, radioOptions, selected = '', onChange } = props

  const [selectedRadio, setSelectedRadio] = useState(selected)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio((event.target as HTMLInputElement).value)
    onChange && onChange((event.target as HTMLInputElement).value as string)
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
        aria-labelledby="payment-details-radio"
        name="radio-buttons-group"
        value={selectedRadio}
        onChange={handleChange}
      >
        {radioOptions.map((radio) => {
          return (
            <FormControlLabel
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
