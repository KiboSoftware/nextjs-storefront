import { Box } from '@mui/system'

import type { ProductOptionValue } from '@/lib/gql/types'

interface ProductVariantSizeSelectorProps {
  attributeFQN: string
  values: ProductOptionValue[]
  onSizeChange: (
    attributeFQN: string,
    value: string,
    shopperEnteredValue?: string | boolean,
    isEnabled?: boolean
  ) => void
}

interface SizeOptionsProps extends ProductOptionValue {
  attributeFQN: string
  onSizeSelection: (
    attributeFQN: string,
    value: string,
    shopperEnteredValue?: string | boolean,
    isEnabled?: boolean
  ) => void
}

const styles = {
  sizeContainer: {
    width: 'fit-content',
    height: 22,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0.5,
    borderWidth: '1px',
    borderColor: 'text.primary',
    borderStyle: 'solid',
    cursor: 'pointer',
    padding: 1,
  },
  selected: {
    backgroundColor: 'text.primary',
    color: 'common.white',
    cursor: 'default',
  },
  disabled: {
    borderColor: 'text.secondary',
    color: 'text.secondary',
    opacity: 0.3,
    cursor: 'default',
  },
}

const SizeOptions = (props: SizeOptionsProps) => {
  const { attributeFQN, value, isSelected = false, isEnabled = true, onSizeSelection } = props
  return (
    <Box
      sx={{
        ...styles.sizeContainer,
        ...(isSelected && styles.selected),
        ...(!isEnabled && styles.disabled),
      }}
      {...(isEnabled &&
        !isSelected && { onClick: () => onSizeSelection(attributeFQN, value, true, isEnabled) })}
      data-testid={`size-options-${value}-${isSelected ? 'selected' : ''}`}
    >
      {value}
    </Box>
  )
}

const ProductVariantSizeSelector = ({
  attributeFQN,
  values,
  onSizeChange,
}: ProductVariantSizeSelectorProps) => {
  return (
    <Box width="100%" display="flex" flexWrap="wrap" data-testid="product-variant-size-selector">
      {values?.map((option, i) => (
        <SizeOptions
          key={i}
          attributeValueId={i}
          attributeFQN={attributeFQN}
          value={option?.value}
          isSelected={option?.isSelected}
          isEnabled={option?.isEnabled}
          onSizeSelection={onSizeChange}
        />
      ))}
    </Box>
  )
}

export default ProductVariantSizeSelector
