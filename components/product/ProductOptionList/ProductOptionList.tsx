import { MenuItem } from '@mui/material'
import { Box } from '@mui/system'

import KiboSelect from '@/components/common/KiboSelect/KiboSelect'
import type { ProductOptionValue } from '@/lib/gql/types'

interface ProductOptionListProps {
  optionValues: ProductOptionValue[]
  name?: string
  value?: string
  error?: boolean
  errorHelperText?: string
  row?: boolean
  placeholder?: string
  onChange: (value: string) => void
}

const ProductOptionList = ({
  optionValues,
  name,
  value,
  error = false,
  errorHelperText = '',
  onChange,
}: ProductOptionListProps) => {
  return (
    <KiboSelect
      name={name}
      error={error}
      helperText={errorHelperText}
      onChange={onChange}
      value={value}
      placeholder="Select product option"
    >
      {optionValues.map((optionVal) => (
        <MenuItem key={optionVal?.value} value={optionVal?.value}>
          {optionVal?.stringValue}
        </MenuItem>
      ))}
    </KiboSelect>
  )
}

export default ProductOptionList
