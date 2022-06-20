import { Typography, Box, SxProps, Theme } from '@mui/material'
import { useTranslation } from 'next-i18next'

import type { ProductPriceRange } from '@/lib/gql/types'

interface SalePriceTypographyProps {
  price?: string
  salePrice?: string
}
interface PriceProps extends SalePriceTypographyProps {
  priceRange?: ProductPriceRange
  variant?: 'body2' | 'body1' | 'subtitle1'
  fontWeight?: 'bold' | 'normal'
}
interface PriceTypographyProps extends PriceProps {
  children?: React.ReactNode
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

const SalePriceTypography = (salePriceTypographyProps: SalePriceTypographyProps) => {
  const { price, salePrice } = salePriceTypographyProps

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

const PriceRangeTypography = ({ priceRange }: { priceRange: ProductPriceRange }) => {
  const { t } = useTranslation('common')
  const { lower, upper } = priceRange

  return (
    <Box display="flex" alignItems="center" gap={1} data-testid="price-range">
      <Price
        price={t<string>('currency', { val: lower?.price })}
        {...(lower?.salePrice && { salePrice: t<string>('currency', { val: lower?.salePrice }) })}
      />
      <Typography variant="body2">-</Typography>
      <Price
        price={t<string>('common:currency', { val: upper?.price })}
        {...(upper?.salePrice && {
          salePrice: t<string>('common:currency', { val: upper?.salePrice }),
        })}
      />
    </Box>
  )
}

const Price = (props: PriceProps) => {
  const { price, salePrice, priceRange, ...rest } = props

  return (
    <Box display="flex" gap="0.625rem" alignItems="center">
      {priceRange ? (
        <PriceRangeTypography priceRange={priceRange} />
      ) : (
        <SalePriceTypography price={price} salePrice={salePrice} />
      )}
    </Box>
  )
}

export default Price
