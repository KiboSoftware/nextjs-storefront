import React from 'react'

import {
  useMediaQuery,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  Theme,
  styled,
} from '@mui/material'
import Link from 'next/link'

export interface ItemProps {
  bannerProps: BannerProps
}
interface BannerProps {
  title: string
  subtitle: string
  callToAction: { title: string; url: string }
  backgroundColor: string
}

const styles = {
  boxStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    color: 'common.white',
  },
  topStyle: {
    height: '60px',
    padding: '20px !important',
    color: 'common.white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  titleStyle: {
    fontSize: (theme: Theme) => theme.typography.h2,
  },
}

const StyledLink = styled(Link)(({ theme }: { theme: Theme }) => ({
  color: theme?.palette.common.white,
}))

const SmallBanner = ({ bannerProps }: ItemProps) => {
  const kiboTheme = useTheme()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('sm'))

  const { title, subtitle, callToAction, backgroundColor } = bannerProps || {}

  return (
    <>
      {bannerProps && (
        <Card sx={{ backgroundColor, borderRadius: '0px' }}>
          <CardContent
            sx={styles.topStyle}
            style={{ display: 'flex', flexDirection: mobileView ? 'column' : 'row' }}
          >
            <Typography sx={styles.titleStyle}>{title} &nbsp;</Typography>

            <Box sx={styles.boxStyle}>
              <Typography variant="h5">{subtitle}&nbsp;</Typography>
              <Typography variant="h5" data-testid="callToAction">
                <StyledLink href={callToAction?.url || ''} passHref>
                  {callToAction?.title}
                </StyledLink>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default SmallBanner
