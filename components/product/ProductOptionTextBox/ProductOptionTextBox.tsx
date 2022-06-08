import KiboTextBox from '@/components/common/KiboTextBox/KiboTextBox'

import type { ProductOption } from '@/lib/gql/types'

export interface ProductOptionTextBoxProps {
  option: ProductOption
  onChange: (name: string, value: string, shopperEnteredValue: string) => void
}

const ProductOptionTextBox = ({ option, onChange }: ProductOptionTextBoxProps) => {
  return (
    <KiboTextBox
      label={option?.attributeDetail?.name as string}
      name={option.attributeFQN}
      value={option?.values?.[0]?.shopperEnteredValue}
      onBlur={(name, shopperEnteredValue) => onChange(name, '', shopperEnteredValue)}
    />
  )
}

export default ProductOptionTextBox
