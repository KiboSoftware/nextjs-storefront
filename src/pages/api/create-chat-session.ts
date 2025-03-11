import createChatSession from '@/lib/api/handlers/create-chat-session'
import withLogger from '@/lib/api/util/with-logger'

export default withLogger(createChatSession as any)
