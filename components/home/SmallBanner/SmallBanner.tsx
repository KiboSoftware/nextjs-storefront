import React from 'react'

import {
  useMediaQuery,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  Theme,
  Link as MuiLink,
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
                <Link href={callToAction?.url || ''} passHref>
                  <MuiLink underline="none" sx={{ color: 'common.white' }}>
                    {callToAction?.title}
                  </MuiLink>
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default SmallBanner
