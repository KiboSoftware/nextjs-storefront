import { fetcher, getAdditionalHeader, getOperationDetails } from '../util'
import { GraphQLError } from '../util/graphql-error-class'
import { KIBO_HEADERS } from '@/lib/constants'
import { NextApiRequestWithLogger } from '@/lib/types'

import type { NextApiResponse } from 'next'

export default async function graphQLWithoutUserClaimsHandler(
  req: NextApiRequestWithLogger,
  res: NextApiResponse
) {
  try {
    const { query, variables } = req.body
    const gqlDetails = getOperationDetails(query)
    req.logger.info('incoming graphql request', { gql: gqlDetails })

    const headers = getAdditionalHeader(req)
    const response = await fetcher({ query, variables }, { headers })

    const correlationId = response.headers && response.headers.get(KIBO_HEADERS.CORRELATION_ID)
    correlationId && req.logger.info({ gql: gqlDetails, correlationId })

    if (response?.errors) {
      req.logger.error({ ...gqlDetails, correlationId })
      throw new GraphQLError(response?.errors, gqlDetails, correlationId)
    }

    if (correlationId) {
      res.setHeader(KIBO_HEADERS.CORRELATION_ID, correlationId)
    }

    res.status(200).json(response)
  } catch (error: any) {
    if (error instanceof GraphQLError) {
      req.logger.error(error.dumpErrors(), error.toJson())
    } else {
      req.logger.error(error)
    }
    res.status(error?.code).json({ message: error?.message })
  }
}
