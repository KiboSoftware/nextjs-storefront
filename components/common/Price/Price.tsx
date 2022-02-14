import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Button, Typography, Box } from '@mui/material'

// Typography fontSize
// small = 13px
// medium = 16px
// large = 18px

const PriceTypography = styled(Typography)({
  textDecoration: 'none',
  position: 'relative',
})

const Price = ({
  price,
  salePrice,
  priceRange,
  size = 'medium',
  fontWeight = 'normal',
}: {
  price?: string
  salePrice?: string
  priceRange?: {
    upper: string
    lower: string
  }
  size?: 'small' | 'medium' | 'large'
  fontWeight?: 'bold' | 'normal'
}) => {
  const theme = useTheme()

  const getSaleFontSize = (sizeinput: 'small' | 'medium' | 'large'): string => {
    const sizes = {
      small: '0.75rem',
      medium: 'small',
      large: 'medium',
    }
    return sizes[sizeinput]
  }

  return (
    <>
      <Box display="flex" gap="10px" alignItems="center">
        {!priceRange ? (
          <>
            <PriceTypography
              variant="body1"
              fontWeight={fontWeight}
              color={salePrice ? 'error' : 'text.primary'}
              fontSize={salePrice ? getSaleFontSize(size) : size}
              {...(salePrice && {
                sx: {
                  '&:before': {
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
              })}
            >
              {price}
            </PriceTypography>
            {salePrice && (
              <Typography
                variant="body1"
                color="text.primary"
                fontSize={size}
                fontWeight={fontWeight}
              >
                {salePrice}
              </Typography>
            )}
          </>
        ) : (
          <Typography variant="body1" color="text.primary" fontSize={size} fontWeight={fontWeight}>
            {priceRange.lower} - {priceRange.upper}
          </Typography>
        )}
      </Box>
    </>
  )
}

export default Price
