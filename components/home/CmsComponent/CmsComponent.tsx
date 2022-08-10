import React from 'react'

import KiboHeroCarousel from '../Carousel/KiboHeroCarousel'
import ContentTile from '../ContentTile/ContentTile'
import SmallBanner from '../SmallBanner/SmallBanner'

interface CmsComponentProps {
  content: any
  ComponentMap?: any
}

interface SmallBannerProps {
  small_banner: {
    title: any
    subtitle: any
    call_to_action_link: { title: any; href: any }
  }
}

interface KiboHeroCarouselProps {
  hero_carousel: { hero_carousel_items: any[] }
}

interface ContentTileProps {
  large_promo_blocks: {
    large_promo_blocks: any[]
  }
}
const DefaultComponentMap = {
  small_banner: {
    component: SmallBanner,
    mapDataToProps: (data: SmallBannerProps) => {
      return {
        bannerProps: {
          title: data.small_banner.title,
          subtitle: data.small_banner.subtitle,
          callToAction: {
            title: data?.small_banner?.call_to_action_link?.title,
            url: data?.small_banner?.call_to_action_link?.href,
          },
          backgroundColor: '#A12E87',
        },
      }
    },
  },
  hero_carousel: {
    component: KiboHeroCarousel,
    mapDataToProps: (data: KiboHeroCarouselProps) => {
      return {
        carouselItem: data.hero_carousel.hero_carousel_items.map((item) => {
          return {
            imageUrl: item.desktop_image.url,
            mobileImageUrl: item.mobile_image.url,
            imageAlt: item.image_alt_text,
            title: item.title,
            subtitle: item.subtitle,
            description: item.description,
            buttonText: item.button_link.title,
            buttonLink: item.button_link.href,
          }
        }),
      }
    },
  },
  large_promo_blocks: {
    component: ContentTile,
    mapDataToProps: (data: ContentTileProps) => {
      return {
        largeTileProps: data.large_promo_blocks.large_promo_blocks.map((item) => {
          return {
            imgSource: item?.image?.url,
            title: item?.title,
            subtitle: item?.subtitle,
            link1: { ...item?.links[0], url: item?.links[0]?.href },
            link2: { ...item?.links[1], url: item?.links[1]?.href },
            link3: { ...item?.links[2], url: item?.links[2]?.href },
          }
        }),
      }
    },
  },
  small_promo_blocks: {
    component: ContentTile,
    mapDataToProps: (data: { small_promo_blocks: { small_promo_blocks: any[] } }) => {
      return {
        smallTileProps: data?.small_promo_blocks?.small_promo_blocks?.map((item) => {
          return {
            imgSource: item?.image?.url,
            title: item?.title,
            subtitle: item?.subtitle,
            link1: { ...item?.links[0], url: item?.links[0]?.href },
            link2: { ...item?.links[1], url: item?.links[1]?.href },
            link3: { ...item?.links[2], url: item?.links[2]?.href },
          }
        }),
      }
    },
  },
}

const CmsComponent = (props: CmsComponentProps) => {
  const { content } = props
  const name = Object.keys(content)[0]
  const ComponentMapping = props.ComponentMap || DefaultComponentMap
  const mapping = ComponentMapping[name]
  const Component = mapping?.component
  const cmsProps = mapping.mapDataToProps(content)
  return Component ? <Component {...cmsProps} /> : null
}

export default CmsComponent
