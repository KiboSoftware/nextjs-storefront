export const contentStackGetters = {
  getContentStackPageData: (contentStackPageData: any) =>
    contentStackPageData.map((obj: any) => {
      if (!('home_page_products' in obj)) return obj
      if ('home_page_products' in obj) {
        return {
          home_page_products: {
            reference: obj.home_page_products.reference.map((ref: any) => ({
              ...ref,
              home_page_products: ref.home_page_products.map((obj: any) => obj.productCode),
            })),
          },
        }
      }
    }),
}
