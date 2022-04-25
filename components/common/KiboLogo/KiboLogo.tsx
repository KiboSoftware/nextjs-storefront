import { Box } from '@mui/system'

import KiboImage from '../KiboImage/KiboImage'
import Logo from '@/public/kibo_logo.png'

interface KiboLogoProps {
  logo?: string | StaticImageData // URL or File
  alt?: string
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
}

const KiboLogo = ({ logo = Logo, alt = 'kibo-logo' }: KiboLogoProps) => {
  return (
    <Box width={'100%'} sx={styles.logoContainer}>
      <KiboImage src={logo} alt={alt} width={'100%'} height={'100%'} />
    </Box>
  )
}

export default KiboLogo
