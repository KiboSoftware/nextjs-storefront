import * as React from 'react'

import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  Link as MuiLink,
  styled,
  Container,
} from '@mui/material'
import Link from 'next/link'

import { KiboImage } from '@/components/common'

export interface TileProps {
  imgSource: string
  title: string
  subtitle: string
  tileType?: 'large' | 'small'
  link1: { title: string; url: string }
  link2: { title: string; url: string }
  link3: { title: string; url: string }
}

export interface ContentTileProps {
  title?: string
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
    marginTop: '20px',
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
    verticalAlign: 'middle',
  },
}
const LargeImageWrapper = styled('div')(
  ({ theme }) => `
  position: relative;
  width: 100%;
  min-height: 400px;
  ${theme.breakpoints.down('md')} {
    min-height: 250px;
  }
`
)
const SmallImageWrapper = styled('div')(
  ({ theme }) => `
  position: relative;
  width: 100%;
  min-height: 260px;
  ${theme.breakpoints.down('md')} {
    min-height: 175px;
  }
`
)
const ContentTiles = (props: TileProps) => {
  const kiboTheme = useTheme()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('md'))

  const { imgSource, title, subtitle, link1, link2, link3, tileType = 'large' } = props
  const ImageWrapper = tileType === 'small' ? SmallImageWrapper : LargeImageWrapper
  return (
    <Box sx={styles.mainStyle}>
      <Box>
        <ImageWrapper>
          <KiboImage src={imgSource} layout="fill" objectFit="cover" quality={75} />
        </ImageWrapper>
      </Box>
      <Box sx={styles.boxStyle}>
        <Box sx={styles.titleStyle}>
          <Typography variant="h2">{title}</Typography>
        </Box>
        <Box sx={styles.titleStyle}>
          <Typography
            sx={{
              fontSize: mobileView ? '0.75rem' : '1rem',
              fontWeight: '400',
              margin: '10px 0',
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box sx={styles.linkBoxStyle}>
          {link1?.url && (
            <Link href={link1?.url} passHref>
              <MuiLink underline="none" sx={styles.linkStyle}>
                {link1.title}
              </MuiLink>
            </Link>
          )}
          {link2?.url && (
            <Link href={link2?.url} passHref>
              <MuiLink underline="none" sx={styles.linkStyle}>
                {link2.title}
              </MuiLink>
            </Link>
          )}
          {link3?.url && (
            <Link href={link3?.url} passHref>
              <MuiLink underline="none" sx={styles.linkStyle}>
                {link3.title}
              </MuiLink>
            </Link>
          )}
        </Box>
      </Box>
    </Box>
  )
}
const ContentTile = ({ largeTileProps, smallTileProps, title }: ContentTileProps) => {
  const kiboTheme = useTheme()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('md'))

  return (
    <Container maxWidth={'xl'} sx={{ display: 'flex', flexDirection: 'column' }}>
      {(largeTileProps || smallTileProps) && (
        <>
          {title && (
            <Typography
              variant="h1"
              component="h2"
              color="primary"
              sx={{ textAlign: 'center', margin: mobileView ? '20px 0' : '40px 0' }}
            >
              {title}
            </Typography>
          )}
          <Box
            sx={{
              display: 'flex',
              gap: '30px',
              flexDirection: mobileView ? 'column' : 'row',
              marginBottom: '30px',
            }}
          >
            {largeTileProps?.map((tile: TileProps, index) => (
              <ContentTiles
                key={index}
                imgSource={tile.imgSource}
                title={tile.title}
                subtitle={tile.subtitle}
                tileType="large"
                link1={tile.link1}
                link2={tile.link2}
                link3={tile.link3}
              />
            ))}
          </Box>
          <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 4, md: 4 }}>
              {smallTileProps?.map((tile: TileProps, index) => (
                <Grid key={index} item xs={mobileView ? 6 : 3}>
                  <ContentTiles
                    imgSource={tile.imgSource}
                    title={tile.title}
                    subtitle={tile.subtitle}
                    tileType="small"
                    link1={tile.link1}
                    link2={tile.link2}
                    link3={tile.link3}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </Container>
  )
}

export default ContentTile
