import { Checkbox, FormControlLabel } from '@mui/material'
export interface ProductOptionCheckboxProps {
  label: string
  checked?: boolean
  attributeFQN: string
  onCheckboxChange: (attributeFQN: string, value: string, checked?: boolean) => void
}

const ProductOptionCheckbox = (props: ProductOptionCheckboxProps) => {
  const { label = '', checked = false, attributeFQN, onCheckboxChange } = props
  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          checked={checked}
          inputProps={{
            'aria-label': label,
          }}
          onChange={(_, isChecked) => onCheckboxChange(attributeFQN, '', isChecked)}
          data-testid={`kibo-product-option-checkbox`}
        />
      }
    />
  )
}

export default ProductOptionCheckbox
