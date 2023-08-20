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
  name?: string
  title?: string | React.ReactNode
  selected?: string
  align?: 'baseline' | 'center' | 'flex-start'
  row?: boolean
  radioOptions: {
    label: string | number | ReactElement<any, string | JSXElementConstructor<any>>
    value: string
    name: string
    disabled?: boolean
    optionIndicator?: string // use this to assign a specific property to an option. e.g: isPrimary
  }[]
  sx?: SxProps<Theme>
  onChange: (value: string) => void
}

export const KiboRadio = (props: KiboRadioProps) => {
  const {
    name,
    title,
    radioOptions,
    selected = '',
    sx,
    align = 'center',
    row = false,
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
        aria-label={name ?? 'kibo-radio'}
        name="radio-buttons-group"
        value={selected}
        onChange={handleChange}
        row={row}
      >
        {radioOptions?.map((radio, index) => {
          return (
            <Box key={radio.value + index}>
              {radio.optionIndicator && (
                <Typography
                  sx={{ fontSize: 'subtitle2', color: 'text.primary', fontWeight: 700, pl: 4 }}
                >
                  {radio.optionIndicator}
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
