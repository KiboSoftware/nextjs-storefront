import { Typography, Box } from '@mui/material'

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
  const getSaleFontSize = (sizeInput: 'small' | 'medium' | 'large'): string => {
    const sizes = {
      small: '0.75rem',
      medium: 'small',
      large: 'medium',
    }
    return sizes[sizeInput]
  }

  return (
    <>
      <Box display="flex" gap="10px" alignItems="center">
        {!priceRange ? (
          <>
            <Typography
              variant="body1"
              fontWeight={fontWeight}
              color={salePrice ? 'common.black' : 'text.primary'}
              fontSize={salePrice ? getSaleFontSize(size) : size}
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
                variant="body1"
                color="text.primary"
                fontSize={size}
                fontWeight={fontWeight}
                sx={classes.price}
              >
                {salePrice}
              </Typography>
            )}
          </>
        ) : (
          <Typography
            variant="body1"
            color="text.primary"
            fontSize={size}
            fontWeight={fontWeight}
            sx={classes.price}
          >
            {priceRange.lower} - {priceRange.upper}
          </Typography>
        )}
      </Box>
    </>
  )
}

export default Price
