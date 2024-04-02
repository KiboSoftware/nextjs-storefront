import { MenuItem } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { KiboSelect, Price } from '@/components/common'

import type { Maybe, ProductOptionValue } from '@/lib/gql/types'

export interface ProductOptionSelectProps {
  optionValues: ProductOptionValue[]
  name?: Maybe<string>
  value?: string
  error?: boolean
  errorHelperText?: string
  row?: boolean
  placeholder?: string
  label?: string
  attributeFQN: string
  onDropdownChange: (attributeFQN: string, value: string) => Promise<void>
}

const ProductOptionSelect = (props: ProductOptionSelectProps) => {
  const { t } = useTranslation('common')
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

  const getValueText = (optionVal: ProductOptionValue) => {
    if (optionVal.deltaPrice)
      return `${optionVal.stringValue || optionVal.value} (${t<string>('currency', {
        val: optionVal.deltaPrice,
      })})`

    return optionVal.stringValue || optionVal.value
  }

  return (
    <KiboSelect
      name={name as string}
      error={error}
      helperText={errorHelperText}
      onChange={(_, selectedValue) => onDropdownChange(attributeFQN, selectedValue)}
      value={value}
      label={label}
      placeholder={placeholder}
    >
      {optionValues.map((optionVal) => (
        <MenuItem key={optionVal?.value} value={optionVal?.value} disabled={!optionVal?.isEnabled}>
          {getValueText(optionVal)}
        </MenuItem>
      ))}
    </KiboSelect>
  )
}

export default ProductOptionSelect
