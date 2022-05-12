import { Typography, Box } from '@mui/material'

import type { CrProductOption } from '@/lib/gql/types'
interface ProductOptionProps {
  option: CrProductOption | any
  fontWeight?: string
}

const ProductOption = (prop: ProductOptionProps) => {
  const { option, fontWeight } = prop

  return (
    <Box data-testid="productOption">
      <Typography variant="body2" fontWeight={fontWeight} sx={{ pr: 1 }} component="span">
        {option.name}:
      </Typography>
      <Typography variant="body2" component="span">
        {option.value}
      </Typography>
    </Box>
  )
}

export default ProductOption
