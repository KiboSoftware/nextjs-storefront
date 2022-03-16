import { Checkbox, FormControlLabel, FormGroup, MenuItem } from '@mui/material'
import { Box } from '@mui/system'

import type { ProductOption } from '@/lib/gql/types'

interface ProductOptionCheckboxProps {
  yesNoOptions: ProductOption[]
  label: any
  checked?: boolean
  row?: boolean
  handleChange: (checked: boolean) => void
}

export default function ProductOptionCheckbox({
  yesNoOptions,
  label = '',
  checked = false,
  row,
  handleChange,
}: ProductOptionCheckboxProps) {
  return (
    <Box display={'flex'} flexDirection={row ? 'row' : 'column'} gap={1}>
      <FormGroup>
        {yesNoOptions.map((option: ProductOption) => {
          return (
            <FormControlLabel
              key={option?.attributeDetail?.name}
              defaultChecked={checked}
              control={
                <Checkbox
                  defaultChecked={checked}
                  inputProps={{
                    defaultChecked: checked,
                  }}
                  onChange={(e, checked) => handleChange(checked)}
                />
              }
              label={label}
            />
          )
        })}
      </FormGroup>
    </Box>
  )
}
