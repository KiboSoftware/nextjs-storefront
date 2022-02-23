import { Typography, Box } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

// Typography fontSize
// small = 13px
// medium = 16px
// large = 18px

const classes = {
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

interface IPriceRange {
  upper: string
  lower: string
}
interface IPriceProps {
  price?: string
  salePrice?: string
  priceRange?: IPriceRange
  size?: 'small' | 'medium' | 'large'
  fontWeight?: 'bold' | 'normal'
}

const Price = ({
  price,
  salePrice,
  priceRange,
  size = 'medium',
  fontWeight = 'bold',
}: IPriceProps) => {
  const getVariant = (): Variant => {
    const sizes = {
      small: 'body2',
      medium: 'body1',
      large: 'h5',
    }
    return sizes[size] as Variant
  }

  return (
    <>
      <Box display="flex" gap="0.625rem" alignItems="center">
        {!priceRange ? (
          <>
            <Typography
              variant={getVariant()}
              fontWeight={fontWeight}
              gutterBottom
              color={salePrice ? 'error' : 'text.primary'}
              {...(salePrice && {
                sx: {
                  ...classes.price,
                  ...classes.oldPrice,
                },
              })}
            >
              {price}
            </Typography>
            {salePrice && (
              <Typography
                variant={getVariant()}
                color="text.primary"
                fontWeight={fontWeight}
                sx={classes.price}
                gutterBottom
              >
                {salePrice}
              </Typography>
            )}
          </>
        ) : (
          <Typography
            variant={getVariant()}
            color="text.primary"
            fontWeight={fontWeight}
            sx={classes.price}
            gutterBottom
          >
            {priceRange.lower} - {priceRange.upper}
          </Typography>
        )}
      </Box>
    </>
  )
}

export default Price
