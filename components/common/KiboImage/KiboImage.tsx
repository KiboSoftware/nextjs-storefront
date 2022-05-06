import { SyntheticEvent } from 'react'

import Image, { ImageProps } from 'next/image'

import DefaultImage from '@/public/product_placeholder.svg'
const errorImage = { image: DefaultImage }
const onImageError = (
  event: SyntheticEvent<HTMLImageElement, Event> & {
    target: HTMLImageElement
  }
) => {
  const { target } = event
  target.src = errorImage.image
}

const KiboImage = (props: ImageProps) => {
  errorImage.image = props.errorimage
  return <Image {...props} alt={props.alt} onError={onImageError} />
}

export default KiboImage
