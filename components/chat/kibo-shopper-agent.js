import { LitElement, html } from 'lit'

import { ProductGrid } from './lit-grid.js'
import { ProductCard } from './lit-product-card.js'
import { OrderItemSelector } from './order-item-selector.js'

class Tool {
  constructor(name, toolId, fn) {
    this.name = name
    this.toolId = toolId
    this.fn = fn
  }
}

class KiboShopperAgent {
  constructor() {
    this._dfMessenger = null
    this.tools = [
      new Tool(
        'Render Order Item Selection',
        'projects/kibo-bq-dev-presentation/locations/us/agents/33c36d2a-8171-4f3a-807e-50bafe98c3c1/tools/fb7637bf-f067-4660-b029-bcd8e294ac56',
        this.renderOrderItemSelection
      ),
      new Tool(
        'Render Returnable Item Selection',
        'projects/kibo-bq-dev-presentation/locations/us/agents/33c36d2a-8171-4f3a-807e-50bafe98c3c1/tools/7ea5d040-5358-4c8b-98f8-9ad59df30f09',
        this.renderOrderItemSelection
      ),
      new Tool(
        'Render Product Grid',
        'projects/kibo-bq-dev-presentation/locations/us/agents/33c36d2a-8171-4f3a-807e-50bafe98c3c1/tools/40190155-a871-4d36-89f3-22a42252764d',
        this.renderProductGrid
      ),
    ]
  }
  get dfMessenger() {
    return document.querySelectorAll('df-messenger')?.[0]
  }
  async renderOrderItemSelection(data) {
    const renderSelectItemPayload = {
      type: 'custom_template',
      name: 'order-item-selector',
      mode: 'blocking',
      payload: { ...data, mode: 'blocking' },
    }
    const customCard = {
      richContent: [[renderSelectItemPayload]],
    }
    this.dfMessenger.renderCustomCard(customCard.richContent[0])
    try {
      this.dfMessenger.children.item(0).setAttribute('chat-height', 800)
      this.dfMessenger.children.item(0).setAttribute('chat-width', 600)
      this.dfMessenger.isWaitingForElement = true
    } catch (error) {}
    return new Promise((resolve, reject) => {
      window.addEventListener(
        'df-messenger-order-item-selector-end',
        (event) => {
          console.log('Order Item Selector End', event)
          resolve({ items: event.detail.items })
          this.dfMessenger.isWaitingForElement = false
        },
        { once: true }
      )
    })
  }
  async renderProductGrid(data) {
    data.items = (data?.items || []).filter((item) => item.productName && item.price)
    const card = {
      type: 'custom_template',
      name: 'df-messenger-product-grid',
      payload: data,
    }
    this.dfMessenger.renderCustomCard([card])
    try {
      this.dfMessenger.children.item(0).setAttribute('chat-height', 800)
      this.dfMessenger.children.item(0).setAttribute('chat-width', 1000)
      this.dfMessenger.isWaitingForElement = true
      return new Promise((resolve, reject) => {
        window.addEventListener(
          'df-messenger-product-click',
          (event) => {
            console.log('Product Grid End', event)
            resolve({ selectProductCode: event.detail.productCode })
            this.dfMessenger.isWaitingForElement = false
            this.dfMessenger.children.item(0).setAttribute('chat-height', 560)
            this.dfMessenger.children.item(0).setAttribute('chat-width', 320)
            window.navigationToNextPage(`/product/${event.detail.productCode}`)
          },
          { once: true }
        )
      })
    } catch (error) {}
    // return { seen: true }
  }
  getCustomerLocation() {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        // Request the current position
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Success callback: position contains the geolocation data
            const { latitude, longitude } = position.coords
            resolve({ latitude, longitude })
          },
          (err) => {
            console.log('Error getting location', err)
            reject()
          }
        )
      }
    })
  }
  registerChatTools() {
    if (this.dfMessenger) {
      for (const tool of this.tools) {
        this.dfMessenger.registerClientSideFunction(tool.toolId, tool.name, tool.fn.bind(this))
      }
    }
  }
  defineCustomElements() {
    try {
      customElements.define('kibo-shopper-agent', KiboShopperAgent)
      customElements.define('df-messenger-product-grid', ProductGrid)
      customElements.define('df-messenger-product-card', ProductCard)
      customElements.define('order-item-selector', OrderItemSelector)
    } catch (error) {
      console.error('Error defining custom elements', error)
    }
  }
  init() {
    setTimeout(() => {

    if(!this.dfMessenger) {
      document.body.insertAdjacentHTML('beforeend', `<df-messenger chat-title="KiboShopper" location="us" project-id="kibo-bq-dev-presentation" agent-id="33c36d2a-8171-4f3a-807e-50bafe98c3c1" max-query-length="-1" language-code="en"><df-messenger-chat-bubble chat-title="Shopping Agent"></df-messenger-chat-bubble></df-messenger>`)
    }
    setTimeout(() => {
      this.defineCustomElements()
      this.registerChatTools()  
    }, 500)
  }, 1000)

  }
}
// customElements.define('kibo-shopper-agent', KiboShopperAgent);
// export function registerChatTools(){
//   const dfMessenger = document.querySelectorAll('df-messenger')?.[0];
//   if(dfMessenger){
//     for (const tool of tools) {
//       dfMessenger.registerClientSideFunction(tool.toolId, tool.name, tool.fn);
//     }
//   }
// }
// const renderOrderItemSelection = async (data) => {
//   const renderSelectItemPayload = {
//     type: "custom_template",
//     name: "order-item-selector",
//     mode: "blocking",
//     payload: { ...data, mode: 'blocking' }
//   }
//   const customCard = {
//     "richContent": [
//       [renderSelectItemPayload]
//     ]
//   }
//   dfMessenger.renderCustomCard(customCard.richContent[0]);
//   try {
//     dfMessenger.children.item(0).setAttribute('chat-height', 800)
//     dfMessenger.children.item(0).setAttribute('chat-width', 600)
//     dfMessenger.isWaitingForElement = true
//   } catch (error) {

//   }
//   return new Promise((resolve, reject) => {
//     window.addEventListener('df-messenger-order-item-selector-end', (event) => {
//       console.log('Order Item Selector End', event);
//       resolve({ items: event.detail.items });
//       dfMessenger.isWaitingForElement = false
//     });
//   })
// }
// const renderProductGrid = async (data) => {
//   data.items = (data?.items || []).filter(item => item.productName && item.price)
//   const card = {
//     "type": "custom_template",
//     "name": "df-messenger-product-grid",
//     payload: data
//   }
//   dfMessenger.renderCustomCard([card]);
//   try {
//     dfMessenger.children.item(0).setAttribute('chat-height', 800)
//     dfMessenger.children.item(0).setAttribute('chat-width', 1000)
//     dfMessenger.isWaitingForElement = true
//   } catch (error) {

//   }
//   return { seen: true }
// }

// const tools = [
//   new Tool(
//     "Render Order Item Selection",
//     "projects/kibo-bq-dev-presentation/locations/us/agents/33c36d2a-8171-4f3a-807e-50bafe98c3c1/tools/fb7637bf-f067-4660-b029-bcd8e294ac56",
//     renderOrderItemSelection
//   ),
//   new Tool(
//     "Render Product Grid",
//     "projects/kibo-bq-dev-presentation/locations/us/agents/33c36d2a-8171-4f3a-807e-50bafe98c3c1/tools/40190155-a871-4d36-89f3-22a42252764d",
//     renderProductGrid
//   )
// ]

export default KiboShopperAgent

// const renderOrderItemSelection = async (data) => {
//   const renderSelectItemPayload = {
//     type: "custom_template",
//     name: "order-item-selector",
//     mode: "blocking",
//     payload: { ...data, mode: 'blocking' }
//   }
//   const customCard = {
//     "richContent": [
//       [renderSelectItemPayload]
//     ]
//   }
//   dfMessenger.renderCustomCard(customCard.richContent[0]);
//   try {
//     dfMessenger.children.item(0).setAttribute('chat-height', 800)
//     dfMessenger.children.item(0).setAttribute('chat-width', 600)
//     dfMessenger.isWaitingForElement = true
//   } catch (error) {

//   }
//   return new Promise((resolve, reject) => {
//     window.addEventListener('df-messenger-order-item-selector-end', (event) => {
//       console.log('Order Item Selector End', event);
//       resolve({ items: event.detail.items });
//       dfMessenger.isWaitingForElement = false
//     });
//   })
// }
// const renderProductGrid = async (data) => {
//   data.items = (data?.items || []).filter(item => item.productName && item.price)
//   const card = {
//     "type": "custom_template",
//     "name": "df-messenger-product-grid",
//     payload: data
//   }
//   dfMessenger.renderCustomCard([card]);
//   try {
//     dfMessenger.children.item(0).setAttribute('chat-height', 800)
//     dfMessenger.children.item(0).setAttribute('chat-width', 1000)
//     dfMessenger.isWaitingForElement = true
//   } catch (error) {

//   }
//   return { seen: true }
// }

// const tools = [
//   new Tool(
//     "Render Order Item Selection",
//     "projects/kibo-bq-dev-presentation/locations/us/agents/33c36d2a-8171-4f3a-807e-50bafe98c3c1/tools/fb7637bf-f067-4660-b029-bcd8e294ac56",
//     renderOrderItemSelection
//   ),
//   new Tool(
//     "Render Product Grid",
//     "projects/kibo-bq-dev-presentation/locations/us/agents/33c36d2a-8171-4f3a-807e-50bafe98c3c1/tools/40190155-a871-4d36-89f3-22a42252764d",
//     renderProductGrid
//   )
// ]
