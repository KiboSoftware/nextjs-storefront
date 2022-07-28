/** @format */

import * as React from 'react'

import { Box, Link, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'

import { KiboImage } from '@/components/common'

export interface TileProps {
  imgSource: string
  title: string
  subtitle: string
  link1: string
  link2: string
  link3: string
}

const ContentTiles = (props: TileProps) => {
  const kiboTheme = useTheme()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('sm'))
  const styles = {
    linkStyle: {
      display: 'flex',
      fontWeight: 'bold',
      margin: mobileView ? '3%' : '2%',
      fontSize: mobileView ? '0.75rem' : '1rem',
    },
    mainStyle: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      margin: '10px',
    },
    boxStyle: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: '5px',
    },
    linkBoxStyle: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      flexDirection: 'column',
    },
  }
  const { imgSource, title, subtitle, link1, link2, link3 } = props
  return (
    <Box sx={styles.mainStyle}>
      <KiboImage src={imgSource} width={'100%'} height={'250px'} />

      <Box sx={styles.boxStyle}>
        <Typography variant="h2" sx={{ justifyContent: 'center' }}>
          {title}
        </Typography>

        <Typography sx={{ fontSize: mobileView ? '0.75rem' : '1rem' }}>{subtitle}</Typography>

        <Box sx={styles.linkBoxStyle}>
          <Link
            sx={styles.linkStyle}
            href="#"
            underline="none"
            component="button"
            variant="body1"
            color="text.primary"
          >
            {link1}
          </Link>
          <Link
            sx={styles.linkStyle}
            href="#"
            underline="none"
            component="button"
            variant="body1"
            color="text.primary"
          >
            {link2}
          </Link>
          <Link
            sx={styles.linkStyle}
            href="#"
            underline="none"
            component="button"
            variant="body1"
            color="text.primary"
          >
            {link3}
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
function ContentTile({ largeTileProps, smallTileProps }: any) {
  const mobileView = useMediaQuery('(max-width:600px)')
  return (
    <Box sx={{ display: 'flex', padding: '2%', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: mobileView ? 'column' : 'row' }}>
        {largeTileProps.map((tile: any, _key:any) => (
          <ContentTiles
            imgSource={tile.imageSource}
            title={tile.title}
            subtitle={tile.subtitle}
            link1={tile.link1}
            link2={tile.link2}
            link3={tile.link3}
          />
        ))}
      </Box>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {smallTileProps.map((tile: any) => (
            <Grid item xs={mobileView ? 6 : 3}>
              <ContentTiles
                imgSource={tile.imageSource}
                title={tile.title}
                subtitle={tile.subtitle}
                link1={tile.link1}
                link2={tile.link2}
                link3={tile.link3}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default ContentTile
