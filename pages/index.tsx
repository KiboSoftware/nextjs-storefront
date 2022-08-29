import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import nextI18NextConfig from '../next-i18next.config'
import CmsComponent from '@/components/home/CmsComponent/CmsComponent'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import { getPage } from '@/lib/operations/get-page'
import type { CategoryTreeResponse } from '@/lib/types'

import type { NextPage, GetStaticPropsContext } from 'next'
interface HomePageProps {
  cmsPage: any
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context
  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  const cmsPage = await getPage({
    contentTypeUid: 'home_page',
    referenceFieldPath: [
      'page_components.hero_carousel.hero_carousel_items',
      'page_components.large_promo_blocks.large_promo_blocks',
      'page_components.small_promo_blocks.small_promo_blocks',
    ],
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

const Home: NextPage<HomePageProps> = (props) => {
  const { cmsPage } = props
  return (
    <>
      {cmsPage?.components?.map((data: any) => (
        <CmsComponent key={Object.keys(data)[0]} content={data} />
      ))}
    </>
  )
}

export default Home
