import React from 'react'

import { useMediaQuery, Card, CardContent, Typography, Box, useTheme, Link } from '@mui/material'

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
    margin: '0px',
    padding: '0px',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    color: 'common.white',
  },
  topStyle: {
    color: 'common.white',
    textAlign: 'center',
    fontSize: { sm: '0.5' },
  },
}

const SmallBanner = ({ bannerProps }: ItemProps) => {
  const kiboTheme = useTheme()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('sm'))
  const { title, subtitle, callToAction, backgroundColor } = bannerProps

  return (
    <Card sx={{ backgroundColor }}>
      <CardContent sx={styles.topStyle}>
        <Typography sx={{ fontSize: mobileView ? '0.75rem' : '1rem', fontWeight: 'bold' }}>
          {title}
        </Typography>

        <Box sx={styles.boxStyle}>
          <Typography sx={{ fontSize: mobileView ? '0.75rem' : '1rem' }}>{subtitle}</Typography>
          <Typography sx={{ fontSize: mobileView ? '0.75rem' : '1rem' }}>
            <Link href={callToAction.url} sx={{ color: 'white' }}>
              {callToAction.title}
            </Link>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SmallBanner
