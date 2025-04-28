import { useEffect, useState } from 'react'

import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { useAuthContext } from '@/context' // Replace with your actual context path

declare global {
  interface Window {
    chatwootSDK: any
    $chatwoot: any
  }
}
const resetChatwootButton = () => {
  const resetButton = document.createElement('button')
  resetButton.className = 'woot-widget-bubble woot-elements--left'
  resetButton.setAttribute('style', 'background: rgb(0, 156, 224);')
  resetButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="50px" height="50px" fill-rule="nonzero"><g fill="#eff0f4" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M25,2c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175c10.51712,0 19,8.48288 19,19c0,10.51712 -8.48288,19 -19,19c-10.51712,0 -19,-8.48288 -19,-19c0,-5.4758 2.30802,-10.39189 6,-13.85547v3.85547c-0.0102,0.72127 0.36875,1.39216 0.99175,1.75578c0.623,0.36361 1.39351,0.36361 2.01651,0c0.623,-0.36361 1.00195,-1.0345 0.99175,-1.75578v-11h-11c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h4.52539c-4.61869,4.20948 -7.52539,10.27232 -7.52539,17c0,12.67888 10.32112,23 23,23c12.67888,0 23,-10.32112 23,-23c0,-12.67888 -10.32112,-23 -23,-23z"></path></g></g></svg>`
  return resetButton
}

const ChatwootWidget = () => {
  const { isAuthenticated, user } = useAuthContext()
  const [isChatwootLoaded, setIsChatwootLoaded] = useState(false)
  const { publicRuntimeConfig } = getConfig()
  const router = useRouter()
  const createKiboChatSession = async (): Promise<string | null> => {
    try {
      const response = await fetch('/api/create-chat-session')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error creating kibo chat session:', error)
      return null
    }
  }
  const handleChatwootNavigation = (event: any) => {
    const { link, uri, path } = event.detail
    const url = link || uri || path
    if (url) {
      const localPath = url.replace('https://chatwoot.gdev10.gcp.kibocommerce.com', '')
      router.push(localPath)
    }
  }
  const getChatwootUserMetaData = () => { 
    const metaData = {
      email: user?.emailAddress,
      name: null
    } as any;
    const firstName = user?.firstName || '';
    const lastName = user?.lastName || '';
    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    if (fullName) {
      metaData.name = fullName;
    }
    return metaData;
  }
  useEffect(() => {
    const chatwootScriptUrl = `${publicRuntimeConfig.chatwootBaseUrl}/packs/js/sdk.js`
    const script = document.querySelector(`script[src="${chatwootScriptUrl}"]`)
    if (!publicRuntimeConfig.chatwootSiteToken) {
      return
    }
    const chatStartConversationHandler = async () => {
      const sessionId = await createKiboChatSession()
      if (sessionId && window.$chatwoot) {
        await window.$chatwoot.setCustomAttributes({
          'kibo-session-id': sessionId,
        })
      }
    }
    const resetChatwoot = () => {
      if (window.$chatwoot && user) {
        window.$chatwoot.reset()
        setTimeout(() => {
          window.$chatwoot.setUser(user.userId, getChatwootUserMetaData())
        }, 1000)
      }
    }
    if (!isAuthenticated) {
      if (window.chatwootSDK) {
        window.$chatwoot.toggleBubbleVisibility('hide')
        setIsChatwootLoaded(false)
      }
      return
    }

    if (user && isAuthenticated && !script) {
      const scriptElement = document.createElement('script')
      scriptElement.src = `${publicRuntimeConfig.chatwootBaseUrl}/packs/js/sdk.js`
      scriptElement.defer = true
      scriptElement.async = true

      scriptElement.onload = () => {
        if (window.chatwootSDK) {
          window.chatwootSDK.run({
            websiteToken: publicRuntimeConfig.chatwootSiteToken,
            baseUrl: `${publicRuntimeConfig.chatwootBaseUrl}`,
          })

          window.addEventListener('chatwoot:ready', () => {
            setIsChatwootLoaded(true)
            if (window.$chatwoot && user) {
              try {
                window.$chatwoot.setUser(user.userId, getChatwootUserMetaData())
                const bubbleHolder = document.getElementById('cw-bubble-holder')
                const resetButton = resetChatwootButton()
                resetButton.addEventListener('click', (e) => {
                  e.stopPropagation()
                  resetChatwoot()
                })
                bubbleHolder?.appendChild(resetButton)
              } catch (error) {
                console.error('Error setting Chatwoot user:', error)
              }
            } else {
              console.error('Chatwoot SDK not loaded or $chatwoot or user is undefined')
            }
          })

          window.addEventListener('chatwoot:on-start-conversation', chatStartConversationHandler)
          window.addEventListener('chatwoot:navigate-to', handleChatwootNavigation)
        }
      }

      document.head.appendChild(scriptElement)

      return () => {
        if (scriptElement.parentNode) {
          scriptElement.parentNode.removeChild(scriptElement)
        }
        window.removeEventListener('chatwoot:on-start-conversation', () => null)
        window.removeEventListener('chatwoot:ready', () => null)
      }
    }
  }, [isAuthenticated, user, isChatwootLoaded])

  return null
}

export default ChatwootWidget
