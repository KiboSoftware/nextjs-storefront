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
      defaultChecked={checked}
      label={label}
      control={
        <Checkbox
          defaultChecked={checked}
          inputProps={{
            'aria-label': label,
          }}
          data-testid={`kibo-checkbox`}
          onChange={(_, isChecked) => onCheckboxChange(attributeFQN, '', isChecked)}
        />
      }
    />
  )
}

export default ProductOptionCheckbox
