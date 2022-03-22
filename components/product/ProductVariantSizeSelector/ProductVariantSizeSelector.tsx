import { Box } from '@mui/system'

import { ProductOptionValue } from '@/lib/gql/types'

interface ProductVariantSizeSelectorProps {
  attributeFQN: string
  values: ProductOptionValue[]
  selectOption: (attributeFQN?: string, value?: string) => void
}

interface SizeOptionsProps extends ProductOptionValue {
  attributeFQN?: string
  handleSizeSelection: (attributeFQN?: string, value?: string) => void
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
  const { attributeFQN, value, isSelected = false, isEnabled = true, handleSizeSelection } = props
  return (
    <Box
      sx={{
        ...styles.sizeContainer,
        ...(isSelected && styles.selected),
        ...(!isEnabled && styles.disabled),
      }}
      {...(isEnabled && !isSelected && { onClick: () => handleSizeSelection(attributeFQN, value) })}
      data-testid="size-options"
    >
      {value}
    </Box>
  )
}

const ProductVariantSizeSelector = ({
  attributeFQN,
  values,
  selectOption,
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
          handleSizeSelection={selectOption}
        />
      ))}
    </Box>
  )
}

export default ProductVariantSizeSelector
