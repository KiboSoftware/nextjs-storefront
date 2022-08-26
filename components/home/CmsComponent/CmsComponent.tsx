import React from 'react'

import KiboHeroCarousel from '../Carousel/KiboHeroCarousel'
import ContentTile from '../ContentTile/ContentTile'
import SmallBanner from '../SmallBanner/SmallBanner'
import { ProductRecommendations } from '@/components/product'

interface CmsComponentProps {
  content: any
  ComponentMap?: any
}

interface SmallBannerProps {
  title: string
  subtitle: string
  call_to_action_link: { title: string; href: string }
}

interface KiboHeroCarouselProps {
  hero_carousel_items: any[]
}

interface ContentTileProps {
  large_promo_blocks: any[]
}

interface PromoBlocksDataProps {
  image: { url: string }
  title: string
  subtitle: string
  links: { href: string }[]
}

const promoBlocksData = (item: PromoBlocksDataProps) => {
  return {
    imgSource: item?.image?.url,
    title: item?.title,
    subtitle: item?.subtitle,
    link1: { ...item?.links[0], url: item?.links[0]?.href },
    link2: { ...item?.links[1], url: item?.links[1]?.href },
    link3: { ...item?.links[2], url: item?.links[2]?.href },
  }
}

const DefaultComponentMap = {
  small_banner: {
    component: SmallBanner,
    mapDataToProps: (data: SmallBannerProps) => {
      return {
        bannerProps: {
          title: data?.title,
          subtitle: data?.subtitle,
          callToAction: {
            title: data?.call_to_action_link?.title,
            url: data?.call_to_action_link?.href,
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
        carouselItem: data?.hero_carousel_items?.map((item) => {
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
        largeTileProps: data?.large_promo_blocks?.map((item) => promoBlocksData(item)),
      }
    },
  },
  small_promo_blocks: {
    component: ContentTile,
    mapDataToProps: (data: { small_promo_blocks: any[] }) => {
      return {
        smallTileProps: data?.small_promo_blocks?.map((item) => promoBlocksData(item)),
      }
    },
  },
  recommendations: {
    component: ProductRecommendations,
    mapDataToProps: (data: { title: string; product_recommendations: any }) => {
      return {
        title: data?.title,
        productCodes: data?.product_recommendations,
      }
    },
  },
  customers_also_bought: {
    component: ProductRecommendations,
    mapDataToProps: (data: { title: string; customer_also_bought: any }) => {
      return {
        title: data?.title,
        productCodes: data?.customer_also_bought,
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
  const cmsProps = mapping?.mapDataToProps(content[name])
  return Component ? <Component {...cmsProps} /> : null
}

export default CmsComponent
