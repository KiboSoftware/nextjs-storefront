import Image, { ImageProps } from 'next/image'

const KiboImage = (props: ImageProps) => {
  return <Image {...props} alt={props.alt} />
}

export default KiboImage
