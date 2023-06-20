import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

export default async function Captcha(req: NextApiRequest, res: NextApiResponse) {
  const { serverRuntimeConfig } = getConfig()
  const { reCaptchaSecret, reCaptchaThreshold } = serverRuntimeConfig.recaptcha

  if (req.method === 'POST') {
    try {
      fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${reCaptchaSecret}&response=${req.body.gRecaptchaToken}`,
      })
        .then((reCaptchaRes) => reCaptchaRes.json())
        .then((reCaptchaRes) => {
          console.log(reCaptchaRes, 'Response from Google reCaptcha verification API')
          if (reCaptchaRes?.score > reCaptchaThreshold) {
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
        })
    } catch (err) {
      res.status(405).json({
        status: 'failure',
        message: 'Error submitting the enquiry form',
      })
    }
  } else {
    res.status(405)
    res.end()
  }
}
