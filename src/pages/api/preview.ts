// import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const redirectTo = (req?.query?.redirect as string) || '/'

  res.setPreviewData({})

  res.redirect(redirectTo)
}
