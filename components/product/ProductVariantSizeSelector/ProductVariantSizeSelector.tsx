import { Box } from '@mui/system'

import { ProductOption } from '@/lib/gql/types'

interface SizeSelectorProps {
  sizeOptions: ProductOption
  selectOption: (attributeFQN?: string | null, value?: string) => {}
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

const getTestId = (isSelected: boolean | null, isEnabled: boolean | null) => {
  if (isSelected) return `size-options-selected`
  if (!isEnabled) return `size-options-disabled`
  return `size-options`
}

const ProductVariantSizeSelector = ({ sizeOptions, selectOption }: SizeSelectorProps) => {
  const SizeOptions = ({ value, isSelected = false, isEnabled = true }: SizeOptionsProps) => (
    <Box
      sx={{
        ...styles.sizeContainer,
        ...(isSelected && styles.selected),
        ...(!isEnabled && styles.disabled),
      }}
      {...(isEnabled && { onClick: () => selectOption(sizeOptions.attributeFQN, value) })}
      data-testid={getTestId(isSelected, isEnabled)}
    >
      {value}
    </Box>
  )

  return (
    <Box width="100%" display="flex" flexWrap="wrap" data-testid="product-variant-size-selector">
      {sizeOptions?.values?.map((option, i) => (
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
