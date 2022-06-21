import ProductOption from '@/components/product/ProductOption/ProductOption'

import type { Maybe, CrProductOption } from '@/lib/gql/types'

interface ProductOptionListProps {
  options: Maybe<CrProductOption>[]
}

const ProductOptionList = (props: ProductOptionListProps) => {
  const { options = [] } = props

  return (
    <>
      {options.map((option: Maybe<CrProductOption>) => (
        <ProductOption key={option?.value} option={option} />
      ))}
    </>
  )
}

export default ProductOptionList
