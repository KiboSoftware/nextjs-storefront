const getContentfulQuery = (homePageId) => {
  return /* GraphQL */ `
    query {
      homePage(id: ${homePageId}) {
        smallBanner {
          title
          subtitle
          callToActionLink
        }

        heroCarousel {
          heroCarouselItemCollection {
            items {
              title
              subtitle
              description
              buttonLink
              desktopImage {
                title
                description
                contentType
                fileName
                size
                url
                width
                height
              }
              mobileImage {
                title
                description
                contentType
                fileName
                size
                url
                width
                height
              }
              imageAltText
            }
          }
        }

        largePromoBlocks {
          promoBlocksCollection {
            items {
              title
              subTitle
              links
              image {
                title
                description
                contentType
                fileName
                size
                url
                width
                height
              }
            }
          }
        }

        smallPromoBlocks {
          promoBlocksCollection {
            items {
              title
              subTitle
              links
              image {
                title
                description
                contentType
                fileName
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
  `
}

export default getContentfulQuery
