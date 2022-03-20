import { Checkbox, FormControlLabel, FormGroup, MenuItem } from '@mui/material'
import { Box } from '@mui/system'

import type { ProductOption } from '@/lib/gql/types'

interface ProductOptionCheckboxProps {
  label: any
  checked?: boolean
  row?: boolean
  onChange: (checked: boolean) => void
}

const ProductOptionCheckbox = ({
  label = '',
  checked = false,
  onChange,
}: ProductOptionCheckboxProps) => {
  return (
    <FormControlLabel
      defaultChecked={checked}
      label={label}
      control={
        <Checkbox
          defaultChecked={checked}
          inputProps={{
            'aria-label': label,
          }}
          data-testid={`kibo-checkbox`}
          onChange={(e, checked) => onChange(checked)}
        />
      }
    />
  )
}

export default ProductOptionCheckbox
