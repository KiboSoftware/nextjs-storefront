import { Typography, Box } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

import type { CrProductOption } from '@/lib/gql/types'

interface KeyValueDisplayProps {
  option: CrProductOption
  variant?: Variant
  fontWeight?: 'bold' | 'normal'
  align?: 'right' | 'left'
}

const KeyValueDisplay = (prop: KeyValueDisplayProps) => {
  const { option, variant = 'body2', fontWeight } = prop

  return (
    <Box data-testid="keyValueOptions" pt={0.5} display="flex" flexWrap="wrap">
      <Typography variant={variant} fontWeight={fontWeight || 700} sx={{ pr: 1 }} component="span">
        {option?.name}:
      </Typography>
      {typeof option?.value === 'string' ? (
        <Typography variant={variant} fontWeight={fontWeight || 'normal'} component="span">
          {option?.value}
        </Typography>
      ) : (
        option?.value
      )}
    </Box>
  )
}

export default KeyValueDisplay
