import {
  fetcher,
  getAdditionalHeader,
  getOperationDetails,
  getUserClaimsFromRequest,
} from '../util'
import { KIBO_HEADERS } from '@/lib/constants'
import { NextApiRequestWithLogger } from '@/lib/types'

import type { NextApiResponse } from 'next'

type GraphQLOperation = {
  operationType: string | undefined
  operationName: string | undefined
}

class GraphQLError extends Error {
  metadata: GraphQLOperation
  rawErrors: any
  code: string | undefined
  correlationId?: string | null

  constructor(
    responseErrors: any,
    operationMetaData: GraphQLOperation,
    correlationId?: string | null
  ) {
    super(responseErrors[0]?.extensions?.response?.body?.message)

    this.name = 'GraphQLError' // Set the name of the error
    this.code = responseErrors[0]?.extensions.response.status
    this.rawErrors = responseErrors
    this.metadata = operationMetaData
    this.correlationId = correlationId
  }

  toJson() {
    return {
      gql: {
        ...this.metadata,
        statusCode: this.code,
      },
      correlationId: this.correlationId,
    }
  }

  dumpErrors(): string {
    if (this.rawErrors && typeof this.rawErrors === 'object') {
      return JSON.stringify(this.rawErrors, null, 2)
    }
    return ''
  }
}

export default async function graphQLHandler(req: NextApiRequestWithLogger, res: NextApiResponse) {
  try {
    const { query, variables } = req.body
    const gqlDetails = getOperationDetails(query)
    req.logger.info({ gql: gqlDetails }, 'incoming graphql request')

    const headers = getAdditionalHeader(req)
    const userClaims = await getUserClaimsFromRequest(req, res)
    const response = await fetcher({ query, variables }, { userClaims, headers })

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
      req.logger.error(error.toJson(), error.dumpErrors())
    } else {
      req.logger.error(error)
    }
    res.status(error?.code).json({ message: error?.message })
  }
}
