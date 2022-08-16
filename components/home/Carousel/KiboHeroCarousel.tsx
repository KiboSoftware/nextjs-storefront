import React from 'react'

import {
  Button,
  useMediaQuery,
  Card,
  CardContent,
  Typography,
  useTheme,
  CardMedia,
} from '@mui/material'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'
import Carousel from 'react-material-ui-carousel'

import { KiboImage } from '@/components/common'

interface ItemProps {
  imageUrl: string
  mobileImageUrl: string
  imageAlt?: string
  title?: string
  subtitle?: string
  description?: string
  buttonText?: string
  buttonLink: string
}
export interface HeroCarouselProps {
  carouselItem: ItemProps[]
}

const MainStyle = styled('div')({
  display: 'flex',
  margin: '20px',
  color: 'grey.700',
})

const KiboHeroCarousel = ({ carouselItem }: HeroCarouselProps) => {
  return (
    <MainStyle>
      <Carousel navButtonsAlwaysVisible={true} swipe={true} sx={{ width: '100%' }}>
        {carouselItem?.map((item: ItemProps, index: any) => {
          return <HeroItem {...item} key={index} />
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
}

function HeroItem(props: ItemProps) {
  const kiboTheme = useTheme()
  const router = useRouter()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('md'))

  const {
    imageUrl,
    mobileImageUrl,
    imageAlt,
    title,
    subtitle,
    description,
    buttonText,
    buttonLink,
  } = props

  return (
    <Card sx={styles.contentStyle}>
      <CardMedia sx={{ width: '100%', height: '100%', position: 'relative' }}>
        <KiboImage
          src={mobileView ? mobileImageUrl : imageUrl}
          alt={imageUrl ? imageAlt : 'product-image-alt'}
          layout="fill"
          objectFit="cover"
          data-testid="product-image"
        />

        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: mobileView ? '100%' : '25%',
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
              variant="contained"
              sx={{ fontSize: mobileView ? '0.5rem' : '1rem' }}
              onClick={() => {
                router.push(buttonLink)
              }}
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
