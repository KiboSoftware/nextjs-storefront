import KiboTextBox from '@/components/common/KiboTextBox/KiboTextBox'

import type { ProductOption } from '@/lib/gql/types'

export interface ProductOptionTextBoxProps {
  option: ProductOption
  onBlur: (name: string, value: string, shopperEnteredValue: string) => void
}

const ProductOptionTextBox = ({ option, onBlur }: ProductOptionTextBoxProps) => {
  return (
    <KiboTextBox
      label={option?.attributeDetail?.name as string}
      name={option.attributeFQN}
      value={option?.values?.[0]?.shopperEnteredValue}
      disabled={!option.values?.[0]?.isEnabled}
      onBlur={(name, shopperEnteredValue) =>
        shopperEnteredValue &&
        option?.values?.[0]?.shopperEnteredValue !== shopperEnteredValue &&
        onBlur(name, '', shopperEnteredValue)
      }
    />
  )
}

export default ProductOptionTextBox
