import { switchUserHandler } from '@/lib/api/handlers'
import withLogger from '@/lib/api/util/with-logger'

export default withLogger(switchUserHandler as any)

// import { NextApiResponse } from 'next'

// import { shopperAuthClient } from '@/lib/api/util/api-auth-client'
// import { decodeParseCookieValue, getAuthCookieName } from '@/lib/helpers'
// import { NextApiRequestWithLogger } from '@/lib/types'

// export default async function switchUser(
//   req: NextApiRequestWithLogger,
//   res: NextApiResponse
// ) {
//   try {
//     const cookies = req?.cookies
//     let authTicket = decodeParseCookieValue(cookies[getAuthCookieName()])

//     const response = await fetcher()
//       if (response.accessToken) {
//         authTicket = response
//       }
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong, cookie not deleted', error })
//     req.logger.error('Error in deletePreviewCookie handler', error)
//   }
// }
