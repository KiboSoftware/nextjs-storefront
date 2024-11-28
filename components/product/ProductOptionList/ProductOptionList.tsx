import { Variant } from '@mui/material/styles/createTypography'

import { KeyValueDisplay } from '@/components/common'

import type { CrProductOption } from '@/lib/gql/types'

interface ProductOptionListProps {
  options: CrProductOption[]
  variant?: Variant
  fontWeight?: 'bold' | 'normal'
}

const ProductOptionList = (props: ProductOptionListProps) => {
  const { options = [], variant, fontWeight } = props

  return (
    <>
      {options.map((option: CrProductOption) => (
        <KeyValueDisplay
          key={`${option?.name}-${option.value || option.shopperEnteredValue}`}
          option={option}
          variant={variant}
          fontWeight={fontWeight}
        />
      ))}
    </>
  )
}

export default ProductOptionList
