import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { homePageResultMock } from '@/__mocks__/stories'
import KiboHeroCarousel from '@/components/home/Carousel/KiboHeroCarousel'
import { FullWidthLayout } from '@/components/layout'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import type { CategoryTreeResponse, NextPageWithLayout } from '@/lib/types'

import type { GetServerSidePropsContext } from 'next'

interface HomePageProps {
  carouselItem: any
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context
  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  return {
    props: {
      categoriesTree,
      carouselItem: homePageResultMock,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const Home: NextPageWithLayout<HomePageProps> = (props) => {
  const { carouselItem } = props
  return (
    <>
      <KiboHeroCarousel carouselItem={carouselItem || []}></KiboHeroCarousel>
    </>
  )
}

Home.getLayout = FullWidthLayout

export default Home
