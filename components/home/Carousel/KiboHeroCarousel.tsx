/** @format */

import React from 'react'

import { Button, useMediaQuery, Card, CardContent, Typography, Box } from '@mui/material'
import Carousel from 'react-material-ui-carousel'

const styles = {
  mainStyle: {
    display: 'flex',
    margin: '20px',
    color: 'grey.30',
  },
  contentStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '600px',
    width: '100%',
  },
  cardStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: '70%',
    marginBottom: '5%',
    backgroundColor: 'common.white',
    opacity: '0.75',
    color: 'common.black',
    justifyContent: 'center',
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
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    color: 'common.white',
  },
  topStyle: {
    backgroundColor: 'grey.10',
    color: 'common.white',
    textAlign: 'center',
  },
}

const heroItems = [
  {
    href: 'https://i.pinimg.com/474x/ac/0f/38/ac0f388b725f5c24d4f0b63c547be9f5.jpg',
    mobileImageUrl: 'https://i.pinimg.com/474x/ac/0f/38/ac0f388b725f5c24d4f0b63c547be9f5.jpg',
    imageAlt: 'image Alt text',
    name: 'Check Off Your List Event',
    subtitle: 'Save up to 50%',
    description: 'Shop early to get your holiday gifts on time.',
    buttonText: 'Shop Holiday Items on Sale',
    buttonLink: 'https://',
    contentPosition: 'right',
    color: '#7D85B1',
    title: 'Save up to 50% + Free Shipping',
    body: 'Ends Midnight | ',
    link: 'Shop Sale',
  },
  {
    href: 'https://i.pinimg.com/736x/04/96/05/04960532dffffe5e551b3fab6015a874.jpg',
    mobileImageUrl: 'https://i.pinimg.com/736x/04/96/05/04960532dffffe5e551b3fab6015a874.jpg',
    imageAlt: 'image Alt text',
    name: 'Save upto 70%',
    subtitle: 'Check Off Your List Event',
    description: 'Shop early to get your holiday gifts on time.',
    buttonText: 'Shop Holiday Items on Sale',
    contentPosition: 'right',
    buttonLink: 'https://',
    color: '#64ACC8',
    title: 'Save up to 50% + Free Shipping',
    body: 'Ends Midnight | ',
    link: 'Shop Sale',
  },
]

const KiboHeroCarousel = () => {
  return (
    <div style={styles.mainStyle}>
      <Carousel navButtonsAlwaysVisible={true} swipe={true} sx={{ width: '100%' }}>
        {heroItems.map((item, index) => {
          return <Project item={item} key={index} />
        })}
      </Carousel>
    </div>
  )
}

function Project({ item }: any) {
  const mobileView = useMediaQuery('(min-width:600px)')

  return (
    <Card sx={styles.contentStyle} style={{ backgroundImage: `url(${item.href})` }}>
      <CardContent sx={styles.topStyle}>
        <Typography
          sx={{ fontWeight: 'bold' }}
          style={{
            fontSize: mobileView ? '1rem' : '0.75rem',
          }}
        >
          {item.title}
        </Typography>

        <Box sx={styles.boxStyle}>
          <Typography
            style={{
              fontSize: mobileView ? '1rem' : '0.75rem',
            }}
          >
            {item.body}
          </Typography>
          <Typography style={{ fontSize: mobileView ? '1rem' : '0.75rem' }}>
            <a href="#home" style={{ color: 'white' }}>
              {item.link}
            </a>
          </Typography>
        </Box>
      </CardContent>

      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CardContent sx={styles.cardStyle} style={{ width: mobileView ? '50%' : '80%' }}>
          <Typography
            sx={styles.nameStyle}
            style={{
              fontSize: mobileView ? '2rem' : '1rem',
            }}
          >
            {item.name}
          </Typography>
          <Typography
            sx={styles.subTitleStyle}
            style={{
              fontSize: mobileView ? '1.75rem' : '0.75rem',
            }}
          >
            {item.subtitle}
          </Typography>
          <Typography
            sx={styles.desStyle}
            style={{
              fontSize: mobileView ? '1rem' : '0.5rem',
            }}
          >
            {item.description}
          </Typography>
          <Button variant="contained" sx={{ fontSize: mobileView ? '1rem' : '0.50rem' }}>
            {item.buttonText}
          </Button>
        </CardContent>
      </CardContent>
    </Card>
  )
}

export default KiboHeroCarousel
