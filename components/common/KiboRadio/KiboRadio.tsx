import React, { JSXElementConstructor, ReactElement } from 'react'

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Theme,
  SxProps,
  Typography,
  Box,
} from '@mui/material'

interface KiboRadioProps {
  title?: string
  selected?: string
  align?: 'baseline' | 'center' | 'flex-start'
  radioOptions: {
    label: string | number | ReactElement<any, string | JSXElementConstructor<any>>
    value: string
    name: string
    disabled?: boolean
  }[]
  optionIndicator?: string // use this to assign a specific property to an option. e.g: isPrimary
  sx?: SxProps<Theme>
  onChange: (value: string) => void
}

export const KiboRadio = (props: KiboRadioProps) => {
  const {
    title,
    radioOptions,
    selected = '',
    sx,
    align = 'center',
    optionIndicator,
    onChange,
  } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <FormControl>
      <FormLabel
        id="kibo-radio-buttons-group-label"
        sx={{ fontSize: 'body2', color: 'text.primary', pb: 1 }}
      >
        {title}
      </FormLabel>
      <RadioGroup
        aria-labelledby="kibo-radio"
        name="radio-buttons-group"
        value={selected}
        onChange={handleChange}
      >
        {radioOptions?.map((radio, index) => {
          return (
            <Box key={radio.value + index}>
              {optionIndicator && (
                <Typography
                  sx={{ fontSize: 'subtitle2', color: 'text.primary', fontWeight: 700, pl: '18%' }}
                >
                  {optionIndicator}
                </Typography>
              )}
              <FormControlLabel
                sx={{ width: 'fit-content', alignItems: align, ...sx }}
                value={radio.value}
                control={
                  <Radio
                    inputProps={{ 'aria-label': radio.name }}
                    {...(radio.disabled && { disabled: radio.disabled })}
                  />
                }
                label={radio.label}
              />
            </Box>
          )
        })}
      </RadioGroup>
    </FormControl>
  )
}

export default KiboRadio
