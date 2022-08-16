/** @format */

import * as React from 'react'

import { Box, Typography, useTheme, useMediaQuery, Grid, Link as MuiLink } from '@mui/material'
import Link from 'next/link'

import { KiboImage } from '@/components/common'

export interface TileProps {
  imgSource: string
  title: string
  subtitle: string
  link1: { title: string; url: string }
  link2: { title: string; url: string }
  link3: { title: string; url: string }
}

export interface ContentTileProps {
  largeTileProps: TileProps[]
  smallTileProps: TileProps[]
}

const styles = {
  mainStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  boxStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    marginTop: '10px',
  },
  linkBoxStyle: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  linkStyle: {
    color: 'text.primary',
    fontSize: '1rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    margin: '1rem',
  },
  titleStyle: {
    display: 'inline-block',
    veriticalAlign: 'middle',
  },
}

const ContentTiles = (props: TileProps) => {
  const kiboTheme = useTheme()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('md'))

  const { imgSource, title, subtitle, link1, link2, link3 } = props
  return (
    <Box sx={styles.mainStyle}>
      <KiboImage
        src={imgSource}
        width={'100%'}
        height={mobileView ? '150px' : '200px'}
        objectFit="cover"
      />
      <Box sx={styles.boxStyle}>
        <Box sx={styles.titleStyle}>
          <Typography variant="h2">{title}</Typography>
        </Box>
        <Box sx={styles.titleStyle}>
          <Typography
            sx={{
              fontSize: mobileView ? '0.75rem' : '1rem',
              fontWeight: '400',
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box sx={styles.linkBoxStyle}>
          <Link href={link1.url}>
            <MuiLink underline="none" component="button" sx={styles.linkStyle}>
              {link1.title}
            </MuiLink>
          </Link>
          <Link href={link2.url}>
            <MuiLink underline="none" component="button" sx={styles.linkStyle}>
              {link2.title}
            </MuiLink>
          </Link>

          <Link href={link3.url}>
            <MuiLink underline="none" component="button" sx={styles.linkStyle}>
              {link3.title}
            </MuiLink>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
const ContentTile = ({ largeTileProps, smallTileProps }: ContentTileProps) => {
  const kiboTheme = useTheme()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '30px',
          flexDirection: mobileView ? 'column' : 'row',
          marginBottom: '30px',
        }}
      >
        {largeTileProps.map((tile: TileProps, index) => (
          <ContentTiles
            key={index}
            imgSource={tile.imgSource}
            title={tile.title}
            subtitle={tile.subtitle}
            link1={tile.link1}
            link2={tile.link2}
            link3={tile.link3}
          />
        ))}
      </Box>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 4, md: 4 }}>
          {smallTileProps.map((tile: TileProps, index) => (
            <Grid key={index} item xs={mobileView ? 6 : 3}>
              <ContentTiles
                imgSource={tile.imgSource}
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
