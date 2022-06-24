import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { ProductListingTemplate } from '@/components/page-templates'
import { productSearch } from '@/lib/api/operations/'
import type { CategorySearchParams } from '@/lib/types'

import type {
  NextPage,
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  GetServerSidePropsContext,
} from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const response = await productSearch(context.query as unknown as CategorySearchParams)
  const { locale } = context
  return {
    props: {
      results: response?.data?.products || [],
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const SearchPage: NextPage = (props: any) => {
  const router = useRouter()
  const query = router.asPath.split('?')[1]
  const { t } = useTranslation('common')

  const performSearch = async () => {
    const response = await fetch(`/api/search?${query}`)
    const responseData = await response.json()
    return responseData.results
  }

  const { data } = useQuery('searchResults', performSearch, { initialData: props.results || [] })
  return (
    <>
      <h1>{t('search')}</h1>
      <ProductListingTemplate {...data} />
    </>
  )
}

export default SearchPage
