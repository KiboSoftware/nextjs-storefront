import { ListsTemplate } from '@/components/page-templates'

import type { NextPage } from 'next'

const B2BListsPage: NextPage = (props) => {
  return (
    <>
      <ListsTemplate {...props} />
    </>
  )
}

export default B2BListsPage
