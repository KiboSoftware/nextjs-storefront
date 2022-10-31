import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const formatLinkData = (links: any) => {
  const { link: title, url: href } = links
  return { title, href }
}

const formatSmallBannerData = (smallBannerData: any) => ({
  small_banner: {
    title: smallBannerData?.title,
    subtitle: smallBannerData?.subtitle,
    call_to_action_link: {
      title: smallBannerData?.callToActionText,
      href: smallBannerData?.callToActionUrl,
    },
    backgroundColor: smallBannerData?.backgroundColor,
  },
})

const formatHeroCarouselData = (heroCarouselData: any) => {
  const heroCarouselItems = heroCarouselData?.slides?.map((item: any) => ({
    desktop_image: {
      url: `https://${item?.desktopImage?.defaultHost}/i/${item?.desktopImage?.endpoint}/${item?.desktopImage?.name}`,
    },
    mobile_image: {
      url: `https://${item?.mobileImage?.defaultHost}/i/${item?.mobileImage?.endpoint}/${item?.mobileImage?.name}`,
    },
    title: item?.title,
    subtitle: item?.subtitle,
    description: item?.description,
    button_link: {
      title: item?.callToAction?.text,
      href: item?.callToAction?.href,
    },
  }))

  return {
    hero_carousel: {
      hero_carousel_items: heroCarouselItems,
    },
  }
}

const formatHomePageProductsData = (homePageProductsData: any) => {
  const homePageProductsReference = homePageProductsData?.products.map((reference: any) => ({
    title: reference?.title,
    home_page_products: reference?.productSelector?.map((productCode: string) => productCode),
  }))

  return {
    home_page_products: {
      reference: homePageProductsReference,
    },
  }
}

const formatPromoBlocksLinksData = (linksData: { link: string; url: string }[]) =>
  linksData?.map((link: any) => formatLinkData(link))

const formatPromoBlocksData = (promoBlocksData: any) => {
  return promoBlocksData?.blocks?.map((promoBlock: any) => ({
    title: promoBlock?.title,
    subtitle: promoBlock?.subtitle,
    image: {
      url: `https://${promoBlock?.image?.defaultHost}/i/${promoBlock?.image?.endpoint}/${promoBlock?.image?.name}`,
    },
    links: formatPromoBlocksLinksData(promoBlock?.links),
  }))
}

const formatLargePromoBlocksData = (largePromoBlocksData: any) => ({
  large_promo_blocks: {
    large_promo_blocks: formatPromoBlocksData(largePromoBlocksData),
  },
})

const formatSmallPromoBlocksData = (smallPromoBlocksData: any) => ({
  small_promo_blocks: {
    small_promo_blocks: formatPromoBlocksData(smallPromoBlocksData),
  },
})

const getAmplienceHomePageData = (ampliencePageData: any) => {
  const smallBanner = formatSmallBannerData(
    ampliencePageData?.find(
      (data: any) =>
        data?._meta?.name === publicRuntimeConfig.amplience?.homePageContentTypes?.smallBanner
    )
  )
  const heroCarousel = formatHeroCarouselData(
    ampliencePageData?.find(
      (data: any) =>
        data?._meta?.name === publicRuntimeConfig.amplience?.homePageContentTypes?.heroCarousel
    )
  )

  const homePageProducts = formatHomePageProductsData(
    ampliencePageData?.find(
      (data: any) =>
        data?._meta?.name === publicRuntimeConfig.amplience?.homePageContentTypes?.homePageProducts
    )
  )

  const largePromoBlocks = formatLargePromoBlocksData(
    ampliencePageData?.find(
      (data: any) =>
        data?._meta?.name === publicRuntimeConfig.amplience?.homePageContentTypes?.largePromoBlocks
    )
  )

  const smallPromoBlocks = formatSmallPromoBlocksData(
    ampliencePageData?.find(
      (data: any) =>
        data?._meta?.name === publicRuntimeConfig.amplience?.homePageContentTypes?.smallPromoBlocks
    )
  )
  return [smallBanner, heroCarousel, homePageProducts, largePromoBlocks, smallPromoBlocks]
}

const formatAmplienceProductDetailsData = (cmsProducts: any) => {
  const recommendations = {
    recommendations: {
      title: cmsProducts?.recommendations?.title,
      product_recommendations: cmsProducts?.recommendations?.productSelector?.map(
        (productCode: string) => productCode
      ),
    },
  }
  const customersAlsoBought = {
    customers_also_bought: {
      title: cmsProducts?.customersAlsoBought?.title,
      customers_also_bought: cmsProducts?.customersAlsoBought?.productSelector.map(
        (productCode: string) => productCode
      ),
    },
  }
  return [recommendations, customersAlsoBought]
}

const getAmplienceProductDetailsPageData = (amplienceProductData: any) =>
  formatAmplienceProductDetailsData(amplienceProductData)

export const amplienceGetters = {
  getAmplienceHomePageData,
  getAmplienceProductDetailsPageData,
}
