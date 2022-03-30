import { useState, useRef } from 'react'

import {
  ArrowBackIos,
  ArrowForwardIos,
  Clear,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Replay,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import KiboImage from '@/components/common/KiboImage/KiboImage'
import { swipeDetect } from '@/lib/helpers/swipeDetect'
import DefaultImage from '@/public/product_placeholder.svg'

import { ProductImage } from '@/lib/gql/types'

interface ImageGalleryProps {
  images: ProductImage[]
  title: string
  isZoomed?: boolean
  initialThumbnailDisplayCount?: number
  placeholderImageUrl?: string
}

const styles = {
  dots: {
    cursor: 'pointer',
    height: '10px',
    width: '10px',
    margin: '0 0.5rem',
    borderRadius: '50%',
    display: 'inline-block',
    transition: 'backgroundColor 0.6s ease',
  },
}

const ImageGallery = ({
  images,
  title,
  isZoomed = false,
  initialThumbnailDisplayCount = 4,
  placeholderImageUrl = DefaultImage,
}: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState({
    image: images[0],
    index: 0,
  })

  // handle if vertical slider arrow should be visible or not
  const [showArrow, setArrowVisibility] = useState({
    up: false,
    down: images?.length > initialThumbnailDisplayCount,
  })

  const scrollContainerRef = useRef<HTMLDivElement>()

  // Mobile: handle touch swipe
  const handleSwipe = () => {
    const gestureZone = document.getElementById('gestureZone')
    if (gestureZone) {
      swipeDetect(gestureZone, (dir: string) => {
        if (dir === 'left') {
          selectedImage.index !== images.length - 1 &&
            setSelectedImage({
              image: images[selectedImage.index + 1],
              index: selectedImage.index + 1,
            })
        } else if (dir === 'right') {
          selectedImage.index > 0 &&
            setSelectedImage({
              image: images[selectedImage.index - 1],
              index: selectedImage.index - 1,
            })
        }
      })
    }
  }

  const isScrollAtBottom = (element?: HTMLElement) => {
    if (element) {
      return element.scrollHeight - (element.scrollTop + element.clientHeight) < 136
    }
  }

  // Desktop: handle vertical slider scrolling
  const handleVerticalSlider = (isDirectionUp: boolean) => {
    const scrollableDiv = scrollContainerRef.current

    scrollableDiv?.scrollBy({
      top: isDirectionUp ? -136 : 136,
      behavior: 'smooth',
    })

    setArrowVisibility(
      isDirectionUp
        ? {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            up: scrollableDiv!.scrollTop > 136,
            down: true,
          }
        : {
            up: true,
            down: !isScrollAtBottom(scrollableDiv),
          }
    )
  }

  const maxHeight = initialThumbnailDisplayCount * 119 + initialThumbnailDisplayCount * 12 + 60

  return (
    <Box
      id="gestureZone"
      component={'div'}
      onTouchStartCapture={handleSwipe}
      data-testid="gestureZone"
    >
      {/* Title section */}
      <Box
        display={isZoomed ? 'flex' : 'none'}
        justifyContent="space-between"
        alignItems={'center'}
        mb={5}
      >
        <Typography variant="h1" fontWeight="bold">
          {title}
        </Typography>
        <Clear color="action" />
      </Box>

      {/* Gallary Section start */}
      <Stack direction="row" spacing={{ xs: 0, md: 2 }} maxHeight={maxHeight}>
        {/* Vertical slider secton start */}
        <Box
          width="10%"
          minWidth={119}
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
            },
          }}
        >
          <Stack spacing={1}>
            {showArrow.up && (
              <Box textAlign={'center'}>
                <IconButton
                  aria-label="up"
                  // sx={{ visibility: showArrow.up ? 'visible' : 'hidden' }}
                  onClick={() => handleVerticalSlider(true)}
                  size="large"
                >
                  <KeyboardArrowUp fontSize="large" />
                </IconButton>
              </Box>
            )}

            <Stack
              spacing={1.5}
              role="tablist"
              className="scrolling-div"
              ref={scrollContainerRef}
              sx={{
                maxHeight: maxHeight,
                width: '100%',
                overflowY: 'auto',
                '::-webkit-scrollbar': { width: '0px' },
              }}
            >
              {images?.map((image, i) => {
                return (
                  <Box
                    key={image?.altText}
                    component="div"
                    width={119}
                    minHeight={119}
                    position="relative"
                    sx={{
                      borderWidth: i === selectedImage.index ? 3 : 1,
                      borderStyle: 'solid',
                      borderColor: 'grey.600',
                      cursor: 'pointer',
                    }}
                    aria-label={image?.altText || ''}
                    aria-selected={i === selectedImage.index}
                    onClick={() =>
                      setSelectedImage({
                        image: image,
                        index: i,
                      })
                    }
                  >
                    <KiboImage
                      src={image?.imageUrl as string}
                      alt={image?.altText as string}
                      layout="fill"
                      objectFit="contain"
                    />
                  </Box>
                )
              })}
            </Stack>

            {showArrow.down && (
              <Box textAlign={'center'}>
                <IconButton
                  aria-label="down"
                  size="large"
                  onClick={() => handleVerticalSlider(false)}
                >
                  <KeyboardArrowDown fontSize="large" />
                </IconButton>
              </Box>
            )}
          </Stack>
        </Box>
        {/* Vertical slider secton end */}

        {/* Selected Image secton start */}
        {images.length > 1 && (
          <Box display={isZoomed ? 'flex' : 'none'} alignItems="center">
            <IconButton
              aria-label="previous"
              disabled={selectedImage.index < 1}
              onClick={() =>
                setSelectedImage({
                  image: images[selectedImage.index - 1],
                  index: selectedImage.index - 1,
                })
              }
            >
              <ArrowBackIos />
            </IconButton>
          </Box>
        )}
        <Box
          position="relative"
          sx={{
            border: { xs: 'none', md: '1px solid #ccc' },
            width: { xs: '100%', md: '90%' },
            height: { xs: '40vh', md: 596 },
          }}
          display="flex"
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent="flex-start"
        >
          <TransformWrapper>
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <Box
                  justifyContent="flex-end"
                  width="100%"
                  sx={{
                    display: {
                      xs: 'none',
                      md: isZoomed ? 'flex' : 'none',
                    },
                  }}
                >
                  <IconButton aria-label="zoom in" onClick={() => zoomIn()}>
                    <ZoomIn />
                  </IconButton>
                  <IconButton aria-label="zoom out" onClick={() => zoomOut()}>
                    <ZoomOut />
                  </IconButton>
                  <IconButton aria-label="reset" onClick={() => resetTransform()}>
                    <Replay />
                  </IconButton>
                </Box>
                <TransformComponent
                  wrapperStyle={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  contentStyle={{ width: '100%', height: '100%' }}
                >
                  <Box
                    width="100%"
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    alignContent="center"
                    justifyContent="space-between"
                    position="relative"
                  >
                    <KiboImage
                      src={(selectedImage.image?.imageUrl as string) || placeholderImageUrl}
                      alt={selectedImage.image?.altText as string}
                      layout="fill"
                      objectFit="contain"
                      data-testid="selected-image"
                    />
                  </Box>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </Box>
        {images.length > 1 && (
          <Box display={isZoomed ? 'flex' : 'none'} alignItems="center">
            <IconButton
              aria-label="next"
              disabled={selectedImage.index == images.length - 1}
              onClick={() =>
                setSelectedImage({
                  image: images[selectedImage.index + 1],
                  index: selectedImage.index + 1,
                })
              }
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>
        )}
        {/* Selected Image secton end */}
      </Stack>
      {/* Gallary Section start */}

      {/* Mobile: show dots for mobile view */}
      <Box
        pt={2}
        sx={{
          display: {
            xs: 'flex',
            md: 'none',
          },
          justifyContent: 'center',
        }}
      >
        {images.map((dot, i) => (
          <Box
            key={i}
            sx={{
              ...styles.dots,
              backgroundColor: i === selectedImage.index ? 'text.primary' : 'grey.500',
            }}
            onClick={() =>
              setSelectedImage({
                image: dot,
                index: i,
              })
            }
          ></Box>
        ))}
      </Box>

      <Box
        sx={{
          display: {
            xs: isZoomed ? 'flex' : 'none',
            md: 'none',
          },
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: '60%',
        }}
      >
        <Box sx={{ backgroundColor: 'text.primary', color: 'common.white', padding: '5% 10%' }}>
          <Typography variant="body1">Pinch Image to Zoom</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default ImageGallery
