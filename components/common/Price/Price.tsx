import { Typography, Box } from '@mui/material'

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
  return (
    <>
      <Box display="flex" gap="0.625rem" alignItems="center">
        {priceRange ? (
          <Typography
            variant={variant}
            color="text.primary"
            fontWeight={fontWeight}
            sx={styles.price}
            gutterBottom
          >
            {priceRange.lower} - {priceRange.upper}
          </Typography>
        ) : (
          <>
            <Typography
              variant={variant}
              fontWeight={fontWeight}
              gutterBottom
              color={salePrice ? 'error' : 'text.primary'}
              sx={{
                ...styles.price,
                ...(salePrice && styles.oldPrice),
              }}
            >
              {price}
            </Typography>
            {salePrice && (
              <Typography
                variant={variant}
                color="text.primary"
                fontWeight={fontWeight}
                sx={styles.price}
                gutterBottom
              >
                {salePrice}
              </Typography>
            )}
          </>
        )}
      </Box>
    </>
  )
}

export default Price
