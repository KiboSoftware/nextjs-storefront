import { Checkbox, FormControlLabel } from '@mui/material'
export interface ProductOptionCheckboxProps {
  label: string
  checked?: boolean
  attributeFQN: string
  isEnabled?: boolean
  onCheckboxChange: (
    attributeFQN: string,
    value: string,
    checked?: boolean,
    isEnabled?: boolean
  ) => void
}

const ProductOptionCheckbox = (props: ProductOptionCheckboxProps) => {
  const { label = '', checked = false, attributeFQN, isEnabled, onCheckboxChange } = props
  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          checked={checked}
          inputProps={{
            'aria-label': label,
          }}
          onChange={(_, isChecked) =>
            onCheckboxChange(attributeFQN, '', isChecked, isEnabled as boolean)
          }
          data-testid={`kibo-product-option-checkbox`}
        />
      }
    />
  )
}

export default ProductOptionCheckbox
