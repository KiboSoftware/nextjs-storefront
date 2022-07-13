/** @format */

import React from 'react'

import {
  Button,
  useMediaQuery,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  createTheme,
} from '@mui/material'
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
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    color: 'common.white',
  },
  topStyle: {
    backgroundColor: 'grey.10',
    color: 'common.white',
    textAlign: 'center',
    fontSize: { sm: '0.5' },
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
  const kiboTheme = useTheme()
  const mobileView = useMediaQuery(kiboTheme.breakpoints.down('sm'))

  return (
    <Card sx={styles.contentStyle} style={{ backgroundImage: `url(${item.href})` }}>
      <CardContent sx={styles.topStyle}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {item.title}
        </Typography>

        <Box sx={styles.boxStyle}>
          <Typography variant="h4">{item.body}</Typography>
          <Typography variant="h4">
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
        <CardContent sx={styles.cardStyle}>
          <Typography variant="h2" sx={styles.nameStyle}>
            {item.name}
          </Typography>
          <Typography variant="h1" sx={styles.subTitleStyle}>
            {item.subtitle}
          </Typography>
          <Typography variant="h4" sx={styles.desStyle}>
            {item.description}
          </Typography>
          <Button variant="contained" sx={{ fontSize: mobileView ? '0.5rem' : '1rem' }}>
            {item.buttonText}
          </Button>
        </CardContent>
      </CardContent>
    </Card>
  )
}

export default KiboHeroCarousel
