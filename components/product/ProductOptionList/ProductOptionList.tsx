import { MenuItem } from '@mui/material'
import { useTranslation } from 'next-i18next'

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

const ProductOptionList = (props: ProductOptionListProps) => {
  const { optionValues, name, value, error = false, errorHelperText = '', onChange } = props
  const { t } = useTranslation('product-page')

  return (
    <KiboSelect
      name={name}
      error={error}
      helperText={errorHelperText}
      onChange={onChange}
      value={value}
      placeholder={t('select-product-option')}
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
