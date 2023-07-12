export const validateGoogleReCaptcha = async (gReCaptchaToken: any) => {
  const response = await fetch('/api/captcha', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      gRecaptchaToken: gReCaptchaToken,
    }),
  })

  const data = await response.json()

  return data
}
