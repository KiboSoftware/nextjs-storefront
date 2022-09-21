const getHomePageQuery = () => {
  return /* GraphQL */ `
    query {
      homePageCollection {
        items {
          small_banner: smallBanner {
            title
            subtitle
            call_to_action_link: callToActionLink
          }

          hero_carousel: heroCarousel {
            hero_carousel_item_collection: heroCarouselItemCollection {
              hero_carousel_items: items {
                title
                subtitle
                description
                button_link: buttonLink
                desktop_image: desktopImage {
                  title
                  description
                  content_type: contentType
                  filename: fileName
                  size
                  url
                  width
                  height
                }
                mobile_image: mobileImage {
                  title
                  description
                  content_type: contentType
                  filename: fileName
                  size
                  url
                  width
                  height
                }
                image_alt_text: imageAltText
              }
            }
          }
          home_page_products: homePageProductsCollection {
            reference: items {
              title
              home_page_products: products
            }
          }
          large_promo_blocks: largePromoBlocks {
            promo_blocks_collection: promoBlocksCollection {
              large_promo_blocks: items {
                title
                subtitle: subTitle
                links
                image {
                  title
                  description
                  content_type: contentType
                  filename: fileName
                  size
                  url
                  width
                  height
                }
              }
            }
          }

          small_promo_blocks: smallPromoBlocks {
            promo_blocks_collection: promoBlocksCollection {
              small_promo_blocks: items {
                title
                subtitle: subTitle
                links
                image {
                  title
                  description
                  content_type: contentType
                  filename: fileName
                  size
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `
}

export default getHomePageQuery
