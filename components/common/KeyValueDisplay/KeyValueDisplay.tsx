import { Typography, Box, SxProps, Theme } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

import type { CrProductOption } from '@/lib/gql/types'

interface KeyValueDisplayProps {
  option: CrProductOption
  variant?: Variant
  fontWeight?: 'bold' | 'normal'
  align?: 'right' | 'left'
  direction?: 'row' | 'column'
  sx?: SxProps<Theme>
  color?: string
}

const KeyValueDisplay = (prop: KeyValueDisplayProps) => {
  const { option, variant = 'body2', fontWeight, direction = 'row', sx, color } = prop

  return (
    <Box
      data-testid="keyValueOptions"
      pt={0.5}
      display="flex"
      flexDirection={direction}
      flexWrap="wrap"
      gap={1}
      sx={{ ...sx }}
    >
      <Typography
        variant={variant}
        color="grey.600"
        fontWeight={fontWeight ?? 700}
        sx={{ pr: 1 }}
        component="span"
      >
        {option?.name}
      </Typography>
      {typeof option?.value === 'string' ? (
        <Typography
          variant={variant}
          fontWeight={fontWeight ?? 'normal'}
          component="span"
          color={color}
        >
          {option?.value}
        </Typography>
      ) : (
        option?.value
      )}
    </Box>
  )
}

export default KeyValueDisplay
