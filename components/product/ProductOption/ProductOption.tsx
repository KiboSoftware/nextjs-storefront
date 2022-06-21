import { Typography, Box } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

import type { Maybe, CrProductOption } from '@/lib/gql/types'

interface ProductOptionProps {
  option: Maybe<CrProductOption>
  variant?: Variant
}

const ProductOption = (prop: ProductOptionProps) => {
  const { option, variant = 'body2' } = prop

  return (
    <Box data-testid="productOption" pt={0.5}>
      <Typography variant={variant} fontWeight={700} sx={{ pr: 1 }} component="span">
        {option?.name}:
      </Typography>
      <Typography variant={variant} component="span">
        {option?.value}
      </Typography>
    </Box>
  )
}

export default ProductOption
