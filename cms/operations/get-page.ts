import amplience from '@/cms'
import { amplienceGetters } from '@/lib/getters'

interface PageProps {
  entryUrl: string
}

const getAmpliencePage = async (productCode?: string) => {
  if (productCode) {
    const response = await amplience.fetchProductDetails(productCode)
    const pageData = response && amplienceGetters.getAmplienceProductDetailsPageData(response)
    return { components: pageData || [] }
  } else {
    const response = await amplience.fetchHomePage()
    const pageData =
      response &&
      response?.contentTypes &&
      amplienceGetters.getAmplienceHomePageData(response?.contentTypes)
    return { components: pageData || [] }
  }
}

export const getPage = async (params: PageProps) => {
  return getAmpliencePage(params.entryUrl)
}
