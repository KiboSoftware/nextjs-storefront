import { Box } from '@mui/system'
import { StaticImageData } from 'next/image'

import KiboImage from '../KiboImage/KiboImage'
import Logo from '@/public/kibo_logo.png'

interface KiboLogoProps {
  logo?: string | StaticImageData // URL or File
  alt?: string
  small?: boolean
}

const styles = {
  logoContainer: {
    width: {
      xs: 33,
      md: 78,
    },
    height: {
      xs: 33,
      md: 78,
    },
  },
  smallLogo: {
    width: 40,
    height: 40,
  },
}

const KiboLogo = ({ logo = Logo, alt = 'kibo-logo', small }: KiboLogoProps) => {
  return (
    <Box width={'100%'} sx={small ? styles.smallLogo : styles.logoContainer}>
      <KiboImage src={logo} alt={alt} layout="fill" objectFit="contain" />
    </Box>
  )
}

export default KiboLogo
