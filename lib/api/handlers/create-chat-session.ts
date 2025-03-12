import { NextApiResponse } from 'next'

import { apiAuthClient } from '../util/api-auth-client'
import { getApiConfig } from '../util/config-helpers'
import { requestMetaData } from '../util/with-logger'
import { decodeParseCookieValue, getAuthCookieName } from '@/lib/helpers'
import { NextApiRequestWithLogger } from '@/lib/types'

async function createChatSession(req: NextApiRequestWithLogger, res: NextApiResponse) {
  const authToken = await apiAuthClient.getAccessToken()
  const cookie = req?.cookies
  const authTicket = decodeParseCookieValue(cookie[getAuthCookieName()])
  try {
    const apiConfig = getApiConfig()

    const response = await fetch(`https://${apiConfig.apiHost}/api/commerce/chat/sessions/`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + authToken,
        'content-type': 'application/json',
        'x-vol-locale': 'en-US',
      },
      body: JSON.stringify({
        userId: authTicket.userId,
        accountId: authTicket.accountId,
        data: {},
        isAnonymous: false,
      }),
    })
    const id = await response.json()
    return res.status(200).json(id)
  } catch (error: any) {
    res.redirect(`/error-page?status=500&message=${encodeURIComponent(error.message)}`)
  }
}

export default createChatSession as any
