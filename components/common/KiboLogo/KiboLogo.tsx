import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { StaticImageData } from 'next/image'

import KiboImage from '../KiboImage/KiboImage'
import Logo from '@/public/Kibo Furniture.svg'

interface KiboLogoProps {
  logo?: string | StaticImageData // URL or File
  alt?: string
  small?: boolean
}

const styles = {
  logoContainer: {
    width: {
      xs: 33,
      md: 300,
    },
    height: {
      xs: 33,
      md: 50,
    },
    position: 'relative',
  },
  smallLogo: {
    width: 160,
    height: 40,
  },
}

const KiboLogo = ({ logo = Logo, alt = 'kibo-logo', small }: KiboLogoProps) => {
  return (
    <Box width={'100%'} sx={small ? styles.smallLogo : styles.logoContainer}>
      {/* <KiboImage src={logo} alt={alt} layout="fill" objectFit="contain" loading="eager" /> */}
      <Typography
        color={'common.black'}
        sx={{
          fontFamily: 'PotteryBarn',
          fontSize: '2rem',
          letterSpacing: 8,
        }}
      >
        Kibo Furniture
      </Typography>
    </Box>
  )
}

export default KiboLogo
