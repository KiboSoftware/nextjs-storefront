import { Box } from '@mui/system'

import { ProductOption } from '@/lib/gql/types'

interface SizeSelectorProps {
  productOption: ProductOption
  selectOption: (attributeFQN?: string | null, value?: string) => {}
}

interface SizeVariantContainerProps {
  value: string
  isSelected?: boolean | undefined | null
  isEnabled?: boolean | undefined | null
  selectOption: (value: string) => {}
}

const styles = {
  sizeContainer: {
    width: 54,
    height: 37,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0.5,
    borderWidth: '1px',
    borderColor: 'text.primary',
    borderStyle: 'solid',
    cursor: 'pointer',
  },
}

const SizeVariantContainer = ({
  value,
  isSelected = false,
  isEnabled = true,
  selectOption,
}: SizeVariantContainerProps) => (
  <Box
    sx={{
      ...styles.sizeContainer,
      ...(isSelected && {
        backgroundColor: 'text.primary',
        color: 'common.white',
      }),
      ...(!isEnabled && {
        borderColor: 'text.secondary',
        color: 'text.secondary',
        opacity: 0.3,
      }),
    }}
    onClick={() => selectOption(value)}
  >
    {value}
  </Box>
)

const ProductVariantSizeSelector = ({ productOption, selectOption }: SizeSelectorProps) => {
  return (
    <Box width="100%" display="flex" flexWrap="wrap">
      {productOption?.values?.map((option, i) => (
        <SizeVariantContainer
          key={i}
          value={option?.value}
          isSelected={option?.isSelected}
          isEnabled={option?.isEnabled}
          selectOption={(value) => selectOption(productOption?.attributeFQN, value)}
        />
      ))}
    </Box>
  )
}

export default ProductVariantSizeSelector
