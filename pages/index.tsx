import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import nextI18NextConfig from '../next-i18next.config'
import CmsComponent from '@/components/home/CmsComponent/CmsComponent'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import { getHomePageCMSRes } from '@/lib/operations/get-page'

import type { CategoryCollection } from '@/lib/gql/types'
import type { NextPage, GetStaticPropsContext } from 'next'

interface HomePageProps {
  cmsResults: any
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context
  const categoriesTree: CategoryCollection = await getCategoryTree()
  const cmsResults = await getHomePageCMSRes()
  return {
    props: {
      categoriesTree,
      cmsResults,
      ...(await serverSideTranslations(
        locale as string,
        ['common', 'checkout'],
        nextI18NextConfig
      )),
    },
  }
}

const Home: NextPage<HomePageProps> = (props) => {
  const { cmsResults } = props
  return (
    <>
      {cmsResults?.map((data: any) => (
        <CmsComponent key={Object.keys(data)[0]} content={data} />
      ))}
    </>
  )
}

export default Home
