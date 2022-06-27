import { MenuItem } from '@mui/material'
import { useTranslation } from 'next-i18next'

import KiboSelect from '@/components/common/KiboSelect/KiboSelect'

import type { ProductOptionValue } from '@/lib/gql/types'

export interface ProductOptionSelectProps {
  optionValues: ProductOptionValue[]
  name?: string
  value?: string
  error?: boolean
  errorHelperText?: string
  row?: boolean
  placeholder?: string
  label?: string
  attributeFQN: string
  onDropdownChange: (attributeFQN: string, value: string) => void
}

const ProductOptionSelect = (props: ProductOptionSelectProps) => {
  const { t } = useTranslation('product')
  const {
    optionValues,
    name = t('select-product-option'),
    value,
    error = false,
    errorHelperText = '',
    label = t('select-product-option'),
    placeholder = t('select-product-option'),
    attributeFQN,
    onDropdownChange,
  } = props

  return (
    <KiboSelect
      name={name}
      error={error}
      helperText={errorHelperText}
      onChange={(_, selectedValue) => onDropdownChange(attributeFQN, selectedValue)}
      value={value}
      label={label}
      placeholder={placeholder}
    >
      {optionValues.map((optionVal) => (
        <MenuItem key={optionVal?.value} value={optionVal?.value} disabled={!optionVal?.isEnabled}>
          {optionVal.stringValue || optionVal.value}
        </MenuItem>
      ))}
    </KiboSelect>
  )
}

export default ProductOptionSelect
