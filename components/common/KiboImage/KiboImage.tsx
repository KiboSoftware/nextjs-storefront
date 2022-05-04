import { SyntheticEvent } from 'react'

import Image, { ImageProps } from 'next/image'

import DefaultImage from '@/public/product_placeholder.svg'

const onImageError = (
  event: SyntheticEvent<HTMLImageElement, Event> & {
    target: HTMLImageElement
  }
) => {
  const { target } = event
  target.src = DefaultImage
}

const KiboImage = (props: ImageProps) => {
  return <Image {...props} alt={props.alt} onError={onImageError} />
}

export default KiboImage
