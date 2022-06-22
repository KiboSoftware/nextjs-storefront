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
interface TextPriceProps {
  children: React.ReactNode
  color?: string
  sx?: SxProps<Theme>
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

const Price = (props: PriceProps) => {
  const { price, salePrice, priceRange, variant = 'body1', fontWeight = 'bold' } = props
  // common Price Text component
  const PriceTypography = (priceProps: TextPriceProps) => {
    const { children, color, sx } = priceProps
    return (
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
  }

  const PriceRangeTypography = () => {
    return (
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
    )
  }

  const PriceOnlyTypography = () => {
    return (
      <PriceTypography>
        {priceRange?.lower} - {priceRange?.upper}
      </PriceTypography>
    )
  }

  return (
    <>
      <Box display="inline-flex" gap="0.625rem" alignItems="center">
        {priceRange ? <PriceOnlyTypography /> : <PriceRangeTypography />}
      </Box>
    </>
  )
}

export default Price
