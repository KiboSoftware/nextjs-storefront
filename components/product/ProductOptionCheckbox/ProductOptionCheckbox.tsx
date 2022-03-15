import { Box } from '@mui/system'

interface KiboLogoProps {
  logo: string | StaticImageData // URL or File
  alt: string
}

export default function ProductOptionCheckbox({ logo, alt }: KiboLogoProps) {
  return (
    <Box width={'100%'}>
      {/* <KiboImage src={logo} alt={alt} width={'100%'} height={'100%'} /> */}
    </Box>
  )
}
