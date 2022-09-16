const formatContentfulProduct = (cmsProducts: any) => {
  if (cmsProducts?.product_recommendations) {
    return {
      ...cmsProducts,
      product_recommendations: cmsProducts?.product_recommendations?.map((productCode: string) => {
        return { productCode }
      }),
    }
  } else {
    return {
      ...cmsProducts,
      customers_also_bought: cmsProducts?.customers_also_bought?.map((productCode: string) => {
        return { productCode }
      }),
    }
  }
}

const getContentfulProductData = (contentfulProductData: any) => {
  return (
    contentfulProductData &&
    Object.entries(contentfulProductData)?.map((item) => {
      return { [item[0]]: formatContentfulProduct(item[1]) }
    })
  )
}

const formatLinkData = (linkData: { Title: string; URL: string }) => {
  const { Title: title, URL: href } = linkData
  return { title, href }
}

const formatSmallBannerData = (smallBannerData: any) => {
  return {
    small_banner: {
      ...smallBannerData,
      call_to_action_link: formatLinkData(smallBannerData?.call_to_action_link),
    },
  }
}

const formatHeroCarouselData = (heroCarouselData: any) => {
  const heroCarouselItems =
    heroCarouselData?.hero_carousel_item_collection?.hero_carousel_items?.map((item: any) => {
      return { ...item, button_link: formatLinkData(item?.button_link) }
    })

  return {
    hero_carousel: {
      hero_carousel_items: heroCarouselItems,
    },
  }
}

const formatHomePageProductsData = (homePageProductsData: any) => {
  const homePageProductsReference = homePageProductsData?.reference.map((reference: any) => {
    return {
      ...reference,
      home_page_products: reference.home_page_products?.map((productCode: string) => {
        return { productCode }
      }),
    }
  })

  return {
    home_page_products: {
      ...homePageProductsData,
      reference: homePageProductsReference,
    },
  }
}

// const formatPromoBlocksLinksData = (linksData: { Title: string; URL: string }[]) => {
const formatPromoBlocksLinksData = (linksData: any) => {
  return linksData?.map((link: any) => formatLinkData(link))
}

const formatPromoBlocksData = (promoBlocksData: any) => {
  return promoBlocksData?.map((promoBlock: any) => {
    return {
      ...promoBlock,
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

const formatSmallPromoBlocksData = (largePromoBlocksData: any) => {
  return {
    small_promo_blocks: {
      small_promo_blocks: formatPromoBlocksData(largePromoBlocksData),
    },
  }
}

const getContentfulPageData = (contentfulPageData: any) => {
  // console.log('###contentfulPageData###', JSON.stringify(contentfulPageData))
  const smallBanner =
    contentfulPageData[0]?.small_banner &&
    formatSmallBannerData(contentfulPageData[0]?.small_banner)

  const heroCarousel =
    contentfulPageData[0]?.hero_carousel &&
    formatHeroCarouselData(contentfulPageData[0]?.hero_carousel)

  const homePageProducts =
    contentfulPageData[0]?.home_page_products &&
    formatHomePageProductsData(contentfulPageData[0]?.home_page_products)

  const largePromoBlocks =
    contentfulPageData[0]?.large_promo_blocks?.promo_blocks_collection?.large_promo_blocks &&
    formatLargePromoBlocksData(
      contentfulPageData[0]?.large_promo_blocks?.promo_blocks_collection?.large_promo_blocks
    )

  const smallPromoBlocks =
    contentfulPageData[0]?.small_promo_blocks?.promo_blocks_collection?.small_promo_blocks &&
    formatSmallPromoBlocksData(
      contentfulPageData[0]?.small_promo_blocks?.promo_blocks_collection?.small_promo_blocks
    )

  return [smallBanner, heroCarousel, homePageProducts, largePromoBlocks, smallPromoBlocks]
}

export const contentfulGetters = {
  getContentfulProductData,
  getContentfulPageData,
}
