import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import nextI18NextConfig from '../next-i18next.config'
import { getPage } from '@/cms/operations/get-page'
import CmsComponent from '@/components/home/CmsComponent/CmsComponent'
import { FullWidthLayout } from '@/components/layout'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import type { CategoryTreeResponse, NextPageWithLayout } from '@/lib/types'

import type { GetServerSidePropsContext } from 'next'

interface HomePageProps {
  cmsPage: any
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  const cmsPage = await getPage({
    entryUrl: '',
  })
  return {
    props: {
      categoriesTree,
      cmsPage,
      ...(await serverSideTranslations(
        locale as string,
        ['common', 'checkout'],
        nextI18NextConfig
      )),
    },
  }
}

const Home: NextPageWithLayout<HomePageProps> = (props) => {
  const { cmsPage } = props
  return (
    <>
      {cmsPage?.components?.map((data: any) => (
        <CmsComponent key={Object.keys(data)[0]} content={data} />
      ))}
    </>
  )
}

Home.getLayout = FullWidthLayout

export default Home
