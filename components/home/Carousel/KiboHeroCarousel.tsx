import React from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import MinimizeIcon from '@mui/icons-material/Minimize'
import {
  Button,
  useMediaQuery,
  Card,
  CardContent,
  Typography,
  useTheme,
  CardMedia,
  Skeleton,
} from '@mui/material'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'
import Carousel from 'react-material-ui-carousel'

import { heroCarouselStyles } from './KiboHeroCarousel.style'
import { KiboImage } from '@/components/common'

interface ItemProps {
  imageUrl: string
  mobileImageUrl: string
  imageAlt: string
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
  color: 'grey.700',
  minHeight: '600px',
})

const KiboHeroCarousel = ({ carouselItem }: HeroCarouselProps) => {
  return (
    <>
      {carouselItem?.length > 0 ? (
        <MainStyle>
          <Carousel
            navButtonsAlwaysVisible={true}
            index={carouselItem?.length - 1}
            autoPlay={false}
            swipe={true}
            sx={{ width: '100%' }}
            height="600"
            IndicatorIcon={<MinimizeIcon />}
            NextIcon={<ArrowForwardIosIcon />}
            PrevIcon={<ArrowBackIosIcon />}
          >
            {carouselItem?.map((item: ItemProps) => {
              return <HeroItem {...item} key={item.imageUrl} />
            })}
          </Carousel>
        </MainStyle>
      ) : (
        <HeroItemSkeleton />
      )}
    </>
  )
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
    <Card sx={heroCarouselStyles.contentStyle}>
      <CardMedia
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'end', md: 'center' },
        }}
      >
        <KiboImage
          src={mobileView ? mobileImageUrl : imageUrl}
          alt={imageAlt || 'carousel-image'}
          sizes="(max-width: 1200px) 92vw, 1152px"
          loading="eager"
          layout="fill"
          objectFit="cover"
          data-testid="product-image"
          priority
        />

        <CardContent sx={heroCarouselStyles.cardStyle}>
          {title && (
            <Typography variant="h2" sx={heroCarouselStyles.nameStyle}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="h1" sx={heroCarouselStyles.subTitleStyle}>
              {subtitle}
            </Typography>
          )}
          {description && (
            <Typography
              style={{ fontSize: mobileView ? '0.75rem' : '1rem' }}
              sx={heroCarouselStyles.desStyle}
            >
              {description}
            </Typography>
          )}

          {buttonText && (
            <Button
              variant="contained"
              sx={{ fontSize: mobileView ? '0.5rem' : '1rem' }}
              onClick={() => {
                router.push(buttonLink)
              }}
            >
              {buttonText}
            </Button>
          )}
        </CardContent>
      </CardMedia>
    </Card>
  )
}

const HeroItemSkeleton = () => {
  return (
    <Card sx={heroCarouselStyles.contentStyle}>
      <CardMedia
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'end', md: 'center' },
        }}
      >
        <Skeleton height={'100%'} width="100%" />
      </CardMedia>
    </Card>
  )
}

export default KiboHeroCarousel
