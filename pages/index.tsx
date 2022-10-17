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
  preview?: boolean
}
const getCmsHomePageData = async ({ preview }: { preview?: boolean }) => {
  const cmsPage = await getPage({
    contentTypeUid: 'home_page',
    referenceFieldPath: [
      'page_components.hero_carousel.hero_carousel_items',
      'page_components.home_page_products.reference',
      'page_components.large_promo_blocks.large_promo_blocks',
      'page_components.small_promo_blocks.small_promo_blocks',
    ],
    entryUrl: '',
    preview,
  })
  return cmsPage
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, preview = false } = context
  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  const cmsPage = await getCmsHomePageData({ preview })
  return {
    props: {
      categoriesTree,
      cmsPage,
      preview,
      ...(await serverSideTranslations(locale as string, ['common'], nextI18NextConfig)),
    },
  }
}

const Home: NextPageWithLayout<HomePageProps> = (props) => {
  const { cmsPage, preview } = props
  const [cmsPages, setCmsPage] = useState(cmsPage)
  const fetchData = async () => {
    try {
      const cmsPage = await getCmsHomePageData({ preview })
      setCmsPage(cmsPage)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    onEntryChange(() => {
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
