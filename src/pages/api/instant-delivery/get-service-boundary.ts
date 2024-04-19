import { getServiceBoundaryHandler } from '@/lib/api/handlers'
import withLogger from '@/lib/api/util/with-logger'

export default withLogger(getServiceBoundaryHandler as any)
