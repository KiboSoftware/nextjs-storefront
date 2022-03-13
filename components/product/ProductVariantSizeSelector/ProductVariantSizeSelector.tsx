import { Box } from '@mui/system'

import { ProductOptionValue } from '@/lib/gql/types'

interface SizeSelectorProps {
  attributeFQN: string
  values: ProductOptionValue[]
  selectOption: (attributeFQN?: string | null, value?: string) => void
}

interface SizeOptionsProps {
  value: string
  isSelected?: boolean | null
  isEnabled?: boolean | null
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

const ProductVariantSizeSelector = ({ attributeFQN, values, selectOption }: SizeSelectorProps) => {
  const SizeOptions = ({ value, isSelected = false, isEnabled = true }: SizeOptionsProps) => (
    <Box
      sx={{
        ...styles.sizeContainer,
        ...(isSelected && styles.selected),
        ...(!isEnabled && styles.disabled),
      }}
      {...(isEnabled && { onClick: () => selectOption(attributeFQN, value) })}
      data-testid="size-options"
    >
      {value}
    </Box>
  )

  return (
    <Box width="100%" display="flex" flexWrap="wrap" data-testid="product-variant-size-selector">
      {values?.map((option, i) => (
        <SizeOptions
          key={i}
          value={option?.value}
          isSelected={option?.isSelected}
          isEnabled={option?.isEnabled}
        />
      ))}
    </Box>
  )
}

export default ProductVariantSizeSelector
