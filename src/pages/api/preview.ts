// import { deleteCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setPreviewData({})

  res.redirect('/')
}
