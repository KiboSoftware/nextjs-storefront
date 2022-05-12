import { Typography, Box } from '@mui/material'

import type { CrProductOption } from '@/lib/gql/types'
interface ProductOptionProps {
  option: CrProductOption | any
}

const ProductOption = (prop: ProductOptionProps) => {
  const { option } = prop

  return (
    <Box data-testid="productOption" pt={0.5}>
      <Typography variant="body2" fontWeight={700} sx={{ pr: 1 }} component="span">
        {option.name}:
      </Typography>
      <Typography variant="body2" component="span">
        {option.value}
      </Typography>
    </Box>
  )
}

export default ProductOption
