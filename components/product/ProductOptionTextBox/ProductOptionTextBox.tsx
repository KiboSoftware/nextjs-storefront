import { useEffect, useState } from 'react'

import { KiboTextBox } from '@/components/common'

import type { ProductOption } from '@/lib/gql/types'

export interface ProductOptionTextBoxProps {
  option: ProductOption
  onBlur: (name: string, value: string, shopperEnteredValue: string, isEnabled?: boolean) => void
}

const ProductOptionTextBox = ({ option, onBlur }: ProductOptionTextBoxProps) => {
  const [value, setValue] = useState(option?.values?.[0]?.shopperEnteredValue || '')

  const handleChange = (_: string, value: string) => {
    setValue(value)
  }

  useEffect(() => {
    if (option?.values?.[0]?.shopperEnteredValue?.trim() !== value?.trim()) {
      setValue(option?.values?.[0]?.shopperEnteredValue || '')
    }
  }, [option?.values?.[0]?.shopperEnteredValue])

  return (
    <KiboTextBox
      label={option?.attributeDetail?.name as string}
      name={option?.attributeFQN}
      value={value}
      disabled={!option.values?.[0]?.isEnabled}
      onChange={handleChange}
      onBlur={(name) =>
        option?.values?.[0]?.shopperEnteredValue?.trim() !== value?.trim() &&
        onBlur(option?.attributeFQN as string, '', value, option?.values?.[0]?.isEnabled as boolean)
      }
    />
  )
}

export default ProductOptionTextBox
