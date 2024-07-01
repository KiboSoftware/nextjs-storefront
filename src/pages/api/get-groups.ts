// export default handler
import { getGroupsHandler } from '@/lib/api/handlers'
import withLogger from '@/lib/api/util/with-logger'

export default withLogger(getGroupsHandler as any)
