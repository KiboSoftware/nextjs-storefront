import { Typography, Box, SxProps, Theme } from '@mui/material'

interface PriceRange {
  upper: string
  lower: string
}
interface PriceProps {
  price?: string
  salePrice?: string
  priceRange?: PriceRange
  variant?: 'body2' | 'body1' | 'subtitle1'
  fontWeight?: 'bold' | 'normal'
}

const styles = {
  price: {
    textDecoration: 'none',
    position: 'relative',
  },
  oldPrice: {
    ':before': {
      content: "''",
      display: 'block',
      width: '100%',
      borderTopWidth: '1px',
      borderTopStyle: 'solid',
      borderTopColor: 'error.main',
      height: '10px',
      position: 'absolute',
      bottom: 0,
      left: 0,
      transform: 'rotate(-20deg)',
    },
  },
}

const Price = ({
  price,
  salePrice,
  priceRange,
  variant = 'body1',
  fontWeight = 'bold',
}: PriceProps) => {
  // common Price Text component
  const PriceTypography = ({
    children,
    color,
    sx,
  }: {
    children: React.ReactNode
    color?: string
    sx?: SxProps<Theme>
  }) => (
    <Typography
      variant={variant}
      fontWeight={fontWeight}
      color={color || 'text.primary'}
      sx={sx}
      gutterBottom
    >
      {children}
    </Typography>
  )

  return (
    <>
      <Box display="flex" gap="0.625rem" alignItems="center">
        {priceRange ? (
          <PriceTypography>
            {priceRange.lower} - {priceRange.upper}
          </PriceTypography>
        ) : (
          <>
            <PriceTypography
              {...(salePrice && { color: 'error' })}
              sx={{
                ...styles.price,
                ...(salePrice && styles.oldPrice),
              }}
            >
              {price}
            </PriceTypography>
            {salePrice && <PriceTypography>{salePrice}</PriceTypography>}
          </>
        )}
      </Box>
    </>
  )
}

export default Price
