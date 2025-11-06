import { SyntheticEvent, useState } from 'react'

import { SvgIconComponent } from '@mui/icons-material'
import Image, { ImageProps } from 'next/image'

import DefaultImage from '@/public/product_placeholder.svg'

interface KiboImageProps extends ImageProps {
  errorimage?: ImageData | SvgIconComponent
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
}

const errorImage = { image: DefaultImage }

const KiboImage = (props: KiboImageProps) => {
  const [hasError, setHasError] = useState(false)

  const onImageError = (
    event: SyntheticEvent<HTMLImageElement, Event> & {
      target: HTMLImageElement
    }
  ) => {
    if (!hasError) {
      setHasError(true)
      const { target } = event
      target.src = errorImage.image?.src
    }
  }
  const { src, ...rest } = props
  if (!src || hasError) {
    return <Image {...rest} src={errorImage.image?.src} alt={props.alt} />
  }
  return (
    <Image
      {...props}
      alt={props.alt}
      onError={onImageError}
      style={{ objectFit: props.objectFit ?? 'contain' }}
    />
  )
}

export default KiboImage
