import { useEffect, useState } from 'react'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import nextI18NextConfig from '../next-i18next.config'
import CmsComponent from '@/components/home/CmsComponent/CmsComponent'
import { FullWidthLayout } from '@/components/layout'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import { onEntryChange } from '@/lib/cms/content-stack'
import { getPage } from '@/lib/operations/get-page'
import type { CategoryTreeResponse, NextPageWithLayout } from '@/lib/types'

import type { GetServerSidePropsContext } from 'next'

interface HomePageProps {
  cmsPage: any
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  const cmsPage = await getPage({
    contentTypeUid: 'home_page',
    referenceFieldPath: [
      'page_components.hero_carousel.hero_carousel_items',
      'page_components.large_promo_blocks.large_promo_blocks',
      'page_components.small_promo_blocks.small_promo_blocks',
    ],
    entryUrl: '',
  })
  return {
    props: {
      categoriesTree,
      cmsPage,
      ...(await serverSideTranslations(locale as string, ['common'], nextI18NextConfig)),
    },
  }
}

const Home: NextPageWithLayout<HomePageProps> = (props) => {
  const { cmsPage } = props
  const [cmsPages, setCmsPage] = useState(cmsPage)
  async function fetchData() {
    try {
      const cmsPage = await getPage({
        contentTypeUid: 'home_page',
        referenceFieldPath: [
          'page_components.hero_carousel.hero_carousel_items',
          'page_components.large_promo_blocks.large_promo_blocks',
          'page_components.small_promo_blocks.small_promo_blocks',
        ],
        entryUrl: '',
      })
      setCmsPage(cmsPage)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    console.log('useeffect home page')
    onEntryChange(() => {
      console.log('onentrychange')
      fetchData()
    })
  }, [])

  return (
    <>
      {cmsPages?.components?.map((data: any) => (
        <CmsComponent key={Object.keys(data)[0]} content={data} />
      ))}
    </>
  )
}

Home.getLayout = FullWidthLayout

export default Home
