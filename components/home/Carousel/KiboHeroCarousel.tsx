import React from 'react'

import {
  Button,
  useMediaQuery,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  Link,
  CardMedia,
} from '@mui/material'
import { styled } from '@mui/system'
import Carousel from 'react-material-ui-carousel'

import { KiboImage } from '@/components/common'

export interface ItemProps {
  imageUrl?: string
  mobileImageUrl?: string
  imageAlt?: string
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  contentPosition?: string
  color?: string
  component?: string
  topProps: TopProps
}

interface TopProps {
  name?: string
  body?: string
  link?: string
}

type HeroItemProps = {
  [key: string]: any
}

const KiboHeroCarousel = ({ carouselItem, topProps }: HeroItemProps) => {
  return (
    <MainStyle>
      <Carousel navButtonsAlwaysVisible={true} swipe={true} sx={{ width: '100%' }}>
        {carouselItem?.map((item?: ItemProps, index?: any) => {
          return <HeroItem props={item} topProps={topProps} key={index} />
        })}
      </Carousel>
    </MainStyle>
  )
}
const styles = {
  contentStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '600px',
    width: '100%',
    margin: '0px',
    padding: '0px',
    outline: 'none',
  },
  cardStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '5%',
    backgroundColor: 'common.white',
    opacity: '0.99',
    color: 'common.black',
    justifyContent: 'center',
    width: { xs: '80%', md: '50%' },
  },
  nameStyle: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 600,
  },
  desStyle: {
    width: '100%',
    textAlign: 'center',
  },
  subTitleStyle: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 800,
  },
  boxStyle: {
    margin: '0px',
    padding: '0px',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    color: 'common.white',
  },
  topStyle: {
    backgroundColor: ' #A12E87',
    color: 'common.white',
    textAlign: 'center',
    fontSize: { sm: '0.5' },
  },
}
const MainStyle = styled('div')({
  display: 'flex',
  margin: '20px',
  color: 'grey.700',
})

function HeroItem({ props, topProps }: HeroItemProps) {
  const kiboTheme = useTheme()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('sm'))
  const {
    imageUrl,
    mobileImageUrl,
    imageAlt,
    title,
    subtitle,
    description,
    buttonText,
    buttonLink,
    component,
  } = props

  const { name, body, link } = topProps

  return (
    <Card sx={styles.contentStyle}>
      <CardContent sx={styles.topStyle}>
        <Typography sx={{ fontSize: mobileView ? '0.75rem' : '1rem', fontWeight: 'bold' }}>
          {name}
        </Typography>

        <Box sx={styles.boxStyle}>
          <Typography sx={{ fontSize: mobileView ? '0.75rem' : '1rem' }}>{body}</Typography>
          <Typography sx={{ fontSize: mobileView ? '0.75rem' : '1rem' }}>
            <Link href="/" sx={{ color: 'white' }}>
              {link}
            </Link>
          </Typography>
        </Box>
      </CardContent>
      <CardMedia sx={{ width: '100%', height: '100%', position: 'relative' }}>
        <KiboImage
          src={mobileView ? mobileImageUrl : imageUrl}
          alt={imageUrl ? imageAlt : 'no-image-alt'}
          layout="fill"
          objectFit="cover"
          data-testid="product-image"
        />

        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: mobileView ? '80%' : '25%',
          }}
        >
          <CardContent sx={styles.cardStyle}>
            <Typography variant="h2" sx={styles.nameStyle}>
              {title}
            </Typography>
            <Typography variant="h1" sx={styles.subTitleStyle}>
              {subtitle}
            </Typography>
            <Typography style={{ fontSize: mobileView ? '0.75rem' : '1rem' }} sx={styles.desStyle}>
              {description}
            </Typography>

            <Button
              component={component}
              to={{ pathname: buttonLink }}
              variant="contained"
              sx={{ fontSize: mobileView ? '0.5rem' : '1rem' }}
            >
              {buttonText}
            </Button>
          </CardContent>
        </CardContent>
      </CardMedia>
    </Card>
  )
}

export default KiboHeroCarousel
