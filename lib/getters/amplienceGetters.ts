const formatLinkData = (links: any) => {
  const { link: title, url: href } = links
  return { title, href }
}

const formatSmallBannerData = (smallBannerData: any) => {
  return {
    small_banner: {
      title: smallBannerData.title,
      subtitle: smallBannerData.subtitle,
      call_to_action_link: {
        title: smallBannerData.callToActionText,
        href: smallBannerData.callToActionUrl,
      },
      backgroundColor: smallBannerData.backgroundColor,
    },
  }
}

const formatHeroCarouselData = (heroCarouselData: any) => {
  const heroCarouselItems = heroCarouselData?.slides?.map((item: any) => {
    return {
      desktop_image: {
        url: `https://${item.desktopImage.defaultHost}/i/${item.desktopImage.endpoint}/${item.desktopImage.name}`,
      },
      mobile_image: {
        url: `https://${item.mobileImage.defaultHost}/i/${item.mobileImage.endpoint}/${item.mobileImage.name}`,
      },
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      button_link: {
        title: item.callToAction.text,
        href: item.callToAction.href,
      },
    }
  })

  return {
    hero_carousel: {
      hero_carousel_items: heroCarouselItems,
    },
  }
}

const formatHomePageProductsData = (homePageProductsData: any) => {
  const homePageProductsReference = homePageProductsData?.products.map((reference: any) => {
    return {
      title: reference?.title,
      home_page_products: reference.productSelector?.map((productCode: string) => {
        return { productCode }
      }),
    }
  })

  return {
    home_page_products: {
      reference: homePageProductsReference,
    },
  }
}

const formatPromoBlocksLinksData = (linksData: { link: string; url: string }[]) => {
  return linksData?.map((link: any) => formatLinkData(link))
}

const formatPromoBlocksData = (promoBlocksData: any) => {
  return promoBlocksData?.blocks?.map((promoBlock: any) => {
    return {
      title: promoBlock.title,
      subtitle: promoBlock.subtitle,
      image: {
        url: `https://${promoBlock?.image?.defaultHost}/i/${promoBlock?.image?.endpoint}/${promoBlock?.image?.name}`,
      },
      links: formatPromoBlocksLinksData(promoBlock?.links),
    }
  })
}

const formatLargePromoBlocksData = (largePromoBlocksData: any) => {
  return {
    large_promo_blocks: {
      large_promo_blocks: formatPromoBlocksData(largePromoBlocksData),
    },
  }
}

const formatSmallPromoBlocksData = (smallPromoBlocksData: any) => {
  return {
    small_promo_blocks: {
      small_promo_blocks: formatPromoBlocksData(smallPromoBlocksData),
    },
  }
}

const getAmpliencePageData = (ampliencePageData: any) => {
  const smallBanner = formatSmallBannerData(
    ampliencePageData.find((data: any) => data?._meta?.name === 'Kibo Simple Banner')
  )
  const heroCarousel = formatHeroCarouselData(
    ampliencePageData.find((data: any) => data?._meta?.name === 'Kibo Hero Carousel Demo')
  )

  const homePageProducts = formatHomePageProductsData(
    ampliencePageData.find((data: any) => data?._meta?.name === 'Home Page Products')
  )

  const largePromoBlocks = formatLargePromoBlocksData(
    ampliencePageData.find((data: any) => data?._meta?.name === 'Large promo blocks')
  )

  const smallPromoBlocks = formatSmallPromoBlocksData(
    ampliencePageData.find((data: any) => data?._meta?.name === 'Small promo blocks')
  )
  return [smallBanner, heroCarousel, homePageProducts, largePromoBlocks, smallPromoBlocks]
}

export const amplienceGetters = {
  getAmpliencePageData,
}
