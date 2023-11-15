import React from 'react'

import { parse } from 'url'

import saveSellerToken from '@/lib/api/operations/save-seller-token'

export async function getServerSideProps(context: any) {
  await saveSellerToken(context.req, context.res)

  const { query } = parse(context.req.url as string, true)
  const { redirect } = query

  // Remove "_util" from the current URL and append the redirect path
  const currentPath = context.req.url
  const destination = currentPath.replace(/\/_util\/.*/, `/${redirect}`)

  return {
    redirect: {
      destination: destination,
      permanent: false,
    },
  }
}

const AdminRedirect = () => {
  return (
    <div>
      <h1>Redirecting...</h1>
    </div>
  )
}

export default AdminRedirect
