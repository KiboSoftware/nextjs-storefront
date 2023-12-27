import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import getRequestDetails from '../util/get-request-details'
import logger from '@/next-logger.config'

export default async function Captcha(req: NextApiRequest, res: NextApiResponse) {
  const { serverRuntimeConfig } = getConfig()
  const { reCaptchaSecret, reCaptchaThreshold } = serverRuntimeConfig.recaptcha

  if (req.method === 'POST') {
    try {
      const reCaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${reCaptchaSecret}&response=${req.body.gRecaptchaToken}`,
      })

      const reCaptchaData = await reCaptchaRes.json()

      if (reCaptchaData?.score > reCaptchaThreshold) {
        res.status(200).json({
          status: 'success',
          message: 'Enquiry submitted successfully',
        })
      } else {
        res.status(200).json({
          status: 'failure',
          message: 'Google ReCaptcha Failure',
        })
      }
    } catch (err) {
      res.status(405).json({
        status: 'failure',
        message: 'Error submitting the enquiry form',
      })

      const requestDetails = getRequestDetails(req)
      logger.info(requestDetails, 'Captcha handler: request details')
      logger.error(err, 'Error in Captcha handler')
    }
  } else {
    res.status(405)
    res.end()
  }
}
