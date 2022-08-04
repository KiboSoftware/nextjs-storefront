/** @format */

import * as React from 'react'

import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  Link as MuiLink,
  styled,
} from '@mui/material'
import { Theme } from '@mui/material/styles'
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
    marginTop: '5px',
  },
  linkBoxStyle: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
  },
}

const ContentTiles = (props: TileProps) => {
  const kiboTheme = useTheme()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('sm'))
  const LinkStyle = styled('div')({
    display: 'flex',
    fontWeight: 'bold',
    margin: mobileView ? '5%' : '3%',
    fontSize: mobileView ? '0.75rem' : '1rem',
  })

  const { imgSource, title, subtitle, link1, link2, link3 } = props
  return (
    <Box sx={styles.mainStyle}>
      <KiboImage src={imgSource} width={'100%'} height={mobileView ? '150px' : '250px'} />
      <Box sx={styles.boxStyle}>
        <Box
          sx={{
            display: 'inline-block',
            veriticalAlign: 'middle',
          }}
        >
          <Typography
            sx={{
              fontSize: (theme: Theme) => theme.typography.h2,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'inline-block',
            veriticalAlign: 'middle',
          }}
        >
          <Typography
            sx={{
              fontSize: mobileView ? '0.75rem' : '1rem',
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box sx={styles.linkBoxStyle}>
          <LinkStyle>
            <Link href={link1.url}>
              <MuiLink underline="none" component="button" variant="body1" color="text.primary">
                {link1.title}
              </MuiLink>
            </Link>
          </LinkStyle>
          <LinkStyle>
            <Link href={link2.url}>
              <MuiLink underline="none" component="button" variant="body1" color="text.primary">
                {link2.title}
              </MuiLink>
            </Link>
          </LinkStyle>
          <LinkStyle>
            <Link href={link3.url}>
              <MuiLink underline="none" component="button" variant="body1" color="text.primary">
                {link3.title}
              </MuiLink>
            </Link>
          </LinkStyle>
        </Box>
      </Box>
    </Box>
  )
}
function ContentTile({ largeTileProps, smallTileProps }: ContentTileProps) {
  const kiboTheme = useTheme()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('sm'))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          flexDirection: mobileView ? 'column' : 'row',
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
        <Grid container rowSpacing={2} columnSpacing={{ xs: 3, sm: 4, md: 3 }}>
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
