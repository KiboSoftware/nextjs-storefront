import { Checkbox, FormControlLabel } from '@mui/material'
export interface ProductOptionCheckboxProps {
  label: string
  checked?: boolean
  onChange: (checked: boolean) => void
}

const ProductOptionCheckbox = (props: ProductOptionCheckboxProps) => {
  const { label = '', checked = false, onChange } = props
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
