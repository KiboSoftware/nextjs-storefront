import { MenuItem } from '@mui/material'
import { Box } from '@mui/system'

import KiboSelect from '@/components/common/KiboSelect/KiboSelect'
import type { ProductOption } from '@/lib/gql/types'

interface ProductOptionListProps {
  listOptions: ProductOption[]
  error?: boolean
  errorHelperText?: string
  value: string
  row?: boolean
  placeholder?: string
  handleChange: (value: string) => void
}

export default function ProductOptionList({
  listOptions,
  error = false,
  errorHelperText = '',
  value,
  row,
  handleChange,
}: ProductOptionListProps) {
  return (
    <Box display={'flex'} flexDirection={row ? 'row' : 'column'} gap={1}>
      {listOptions.map((option: ProductOption) => {
        return (
          <KiboSelect
            key={option?.attributeDetail?.name}
            name={option?.attributeDetail?.name as string}
            error={error}
            errorHelperText={errorHelperText}
            handleChange={handleChange}
            value={value}
            placeholder="Select product option"
          >
            {option.values?.map((optionVal) => (
              <MenuItem key={optionVal?.value} value={optionVal?.value}>
                {optionVal?.stringValue}
              </MenuItem>
            ))}
          </KiboSelect>
        )
      })}
    </Box>
  )
}
