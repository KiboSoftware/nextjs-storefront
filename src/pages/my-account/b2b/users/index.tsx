import { UsersTemplate } from '@/components/page-templates'

import type { NextPage } from 'next'

const B2BUsersPage: NextPage = (props) => {
  return (
    <>
      <UsersTemplate {...props} />
    </>
  )
}

export default B2BUsersPage
