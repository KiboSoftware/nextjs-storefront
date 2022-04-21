import KiboTextBox from '@/components/common/KiboTextBox/KiboTextBox'

import type { ProductOption } from '@/lib/gql/types'

export interface ProductOptionTextBoxProps {
  option: ProductOption
  onChange: (value: string) => void
}

const ProductOptionTextBox = ({ option, onChange, ...rest }: ProductOptionTextBoxProps) => {
  return (
    <KiboTextBox
      label={option?.attributeDetail?.name as string}
      name={option.attributeFQN}
      value={option!.values![0]!.shopperEnteredValue}
      onChange={onChange}
      {...rest}
    />
  )
}

export default ProductOptionTextBox
