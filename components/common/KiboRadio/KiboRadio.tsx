import React, { JSXElementConstructor, ReactElement } from 'react'

import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'

interface KiboRadioProps {
  title?: string
  selected?: string
  radioOptions: {
    label: string | number | ReactElement<any, string | JSXElementConstructor<any>>
    value: string
  }[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const KiboRadio = (props: KiboRadioProps) => {
  const { title, radioOptions, selected, onChange } = props
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
        value={selected}
        onChange={onChange}
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
