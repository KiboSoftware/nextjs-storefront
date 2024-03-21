// import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('====================================setting Preview Data', req.query.siteId)
  res.setPreviewData({
    siteId: req.query.siteId,
  })

  res.redirect('/')
}
