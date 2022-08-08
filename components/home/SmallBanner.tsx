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
    fontSize: { sm: '0.5' },
  },
  titleStyle: {
    fontSize: (theme: Theme) => theme.typography.h2,
  },
}

const SmallBanner = ({ bannerProps }: ItemProps) => {
  const kiboTheme = useTheme()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('sm'))

  const { title, subtitle, callToAction, backgroundColor } = bannerProps

  return (
    <Card sx={{ backgroundColor }}>
      <CardContent
        sx={styles.topStyle}
        style={{ display: 'flex', flexDirection: mobileView ? 'column' : 'row' }}
      >
        <Typography sx={styles.titleStyle}>{title} &nbsp;</Typography>

        <Box sx={styles.boxStyle}>
          <Typography sx={{ fontSize: '0.875rem' }}>{subtitle}&nbsp;</Typography>
          <Typography data-testid="callToAction" sx={{ fontSize: '0.875rem' }}>
            <Link href={callToAction.url} passHref>
              <MuiLink sx={{ color: 'white', textDecoration: 'underline' }}>
                {callToAction.title}
              </MuiLink>
            </Link>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SmallBanner
