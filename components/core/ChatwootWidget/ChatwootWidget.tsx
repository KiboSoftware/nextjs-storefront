import { useEffect } from 'react'

import { useAuthContext } from '@/context'

declare global {
  interface Window {
    chatwootSDK: any
    $chatwoot: any
  }
}
interface ChatSessionResponse {
  kiboChatSessionId: string
}
const ChatwootWidget = () => {
  const { isAuthenticated, user } = useAuthContext()

  const createKiboChatSession = async () => {
    const res = await fetch(`/api/create-chat-session`)
    return res.json()
  }

  useEffect(() => {
    const script = document.querySelector('script[src="https://app.chatwoot.com/packs/js/sdk.js"]')

    const chatStartConversationHandler: (e: Event) => Promise<void> = async () => {
      const kiboChatSessionId: ChatSessionResponse = await createKiboChatSession()
      if (kiboChatSessionId) {
        window.$chatwoot.setConversationCustomAttributes({
          'kibo-session-id': kiboChatSessionId.kiboChatSessionId,
        })
      }
      return
    }

    if (!isAuthenticated) {
      // Remove the script and stop the widget if not authenticated ------------> TO-DO
      if (script) {
        document.head.removeChild(script)
        if (window.chatwootSDK) {
          window.chatwootSDK.shutdown()
        }
      }
      return
    }

    if (user && isAuthenticated && !script) {
      const scriptElement = document.createElement('script')
      scriptElement.src = 'https://app.chatwoot.com/packs/js/sdk.js'
      scriptElement.defer = true
      scriptElement.async = true

      scriptElement.onload = () => {
        if (window.chatwootSDK) {
          window.chatwootSDK.run({
            websiteToken: 'DKV4TtQx1SCZphbVMhLG8jXg',
            baseUrl: 'https://app.chatwoot.com',
          })
          window.addEventListener('chatwoot:ready', () => {
            if (window.$chatwoot) {
              window.$chatwoot.setUser(user.userId, { email: user.emailAddress })
              console.log(user.userId, user.emailAddress)
            } else {
              console.error('Chatwoot SDK not loaded or $chatwoot is undefined')
            }
          })

          window.addEventListener('chatwoot:on-start-conversation', chatStartConversationHandler)
        }
      }

      document.head.appendChild(scriptElement)

      return () => {
        // Clean up event listener and remove script when component unmounts
        document.head.removeChild(scriptElement)
        window.removeEventListener('chatwoot:on-start-conversation', chatStartConversationHandler)
        window.removeEventListener('chatwoot:ready', () => null)
      }
    }
  }, [isAuthenticated, user])

  return null
}

export default ChatwootWidget
