import { Typography, Box, SxProps, Theme } from '@mui/material'

import type { PriceOnly, PriceRange, SalePrice } from '@/lib/types'
interface PriceProps extends PriceOnly, SalePrice, PriceStyles {
  priceRange?: PriceRange
}
interface PriceStyles {
  variant?: 'body2' | 'body1' | 'subtitle1'
  fontWeight?: 'bold' | 'normal'
}
interface PriceTypographyProps extends PriceStyles {
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

const PriceTypography = (priceTypographyProps: PriceTypographyProps) => {
  const { children, color, sx, variant = 'body1', fontWeight = 'bold' } = priceTypographyProps
  return (
    <Typography
      variant={variant}
      fontWeight={fontWeight}
      color={color || 'text.primary'}
      sx={sx}
      data-testid="price-text"
    >
      {children}
    </Typography>
  )
}

const SalePriceTypography = (salePriceTypographyProps: SalePrice & PriceStyles) => {
  const { price, salePrice, variant, fontWeight } = salePriceTypographyProps

  return (
    <>
      <PriceTypography
        variant={variant}
        fontWeight={fontWeight}
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

const PriceRangeTypography = ({ priceRange }: { priceRange: PriceRange }) => {
  const { lower, upper } = priceRange

  return (
    <Box display="flex" alignItems="center" gap={1} data-testid="price-range">
      <Price price={lower?.price} {...(lower?.salePrice && { salePrice: lower?.salePrice })} />
      <Typography variant="body2">-</Typography>
      <Price price={upper?.price} {...(upper?.salePrice && { salePrice: upper?.salePrice })} />
    </Box>
  )
}

const Price = (props: PriceProps) => {
  const { price, salePrice, priceRange, variant, fontWeight } = props

  return (
    <Box display="flex" gap="0.625rem" alignItems="center">
      {priceRange ? (
        <PriceRangeTypography priceRange={priceRange} />
      ) : (
        <SalePriceTypography
          price={price}
          salePrice={salePrice}
          variant={variant}
          fontWeight={fontWeight}
        />
      )}
    </Box>
  )
}

export default Price
