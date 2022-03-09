import { Box } from '@mui/system'

import { ProductOption } from '@/lib/gql/types'

interface SizeSelectorProps {
  productOption: ProductOption
  selectOption: (attributeFQN?: string | null, value?: string) => {}
}

interface SizeOptionsProps {
  value: string
  isSelected?: boolean | null
  isEnabled?: boolean | null
  selectOption: (value: string) => void
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
  selected: {
    backgroundColor: 'text.primary',
    color: 'common.white',
  },
  disabled: {
    borderColor: 'text.secondary',
    color: 'text.secondary',
    opacity: 0.3,
    cursor: 'default',
  },
}

const getTestId = (isSelected: boolean | null, isEnabled: boolean | null) => {
  if (isSelected) return `size-options-selected`
  if (!isEnabled) return `size-options-disabled`
  return `size-options`
}

const SizeOptions = ({
  value,
  isSelected = false,
  isEnabled = true,
  selectOption,
}: SizeOptionsProps) => (
  <Box
    sx={{
      ...styles.sizeContainer,
      ...(isSelected && styles.selected),
      ...(!isEnabled && styles.disabled),
    }}
    onClick={() => selectOption(value)}
    data-testid={getTestId(isSelected, isEnabled)}
  >
    {value}
  </Box>
)

const ProductVariantSizeSelector = ({ productOption, selectOption }: SizeSelectorProps) => {
  return (
    <Box width="100%" display="flex" flexWrap="wrap" data-testid="product-variant-size-selector">
      {productOption?.values?.map((option, i) => (
        <SizeOptions
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
