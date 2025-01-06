export class OrderItemSelector extends HTMLElement {
  constructor() {
    super()
    // The `dfPayload` field will be provided before `connectedCallback` is
    // being called.
    this.dfPayload = null
    // The `dfResponseId` field will be provided before `connectedCallback` is
    // being called.
    this.dfResponseId = null
    // It is not strictly required but recommended to contain the custom
    // element in a shadow root.
    // https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot
    this.renderRoot = this.attachShadow({ mode: 'open' })
    // Component's root styles
    this.displayItems = []
    this.shadowRoot.innerHTML = `
            <style>

                @import url(https://fonts.googleapis.com/icon?family=Material+Icons);
      
                .grid-container { 
                    background: var(--df-messenger-message-bot-background, var(--df-messenger-message-bot-background-color, #ecf3fe));
                    border: var(--df-messenger-message-bot-border, var(--df-messenger-message-border, none));
                    border-bottom-left-radius: var(--df-messenger-message-bot-border-bottom-left-radius, var(--df-messenger-message-internal-border-bottom-left-radius));
                    border-bottom-right-radius: var(--df-messenger-message-bot-border-bottom-right-radius, var(--df-messenger-message-internal-border-bottom-right-radius));
                    border-top-left-radius: var(--df-messenger-message-bot-border-top-left-radius, var(--df-messenger-message-internal-border-top-left-radius));
                    border-top-right-radius: var(--df-messenger-message-bot-border-top-right-radius, var(--df-messenger-message-internal-border-top-right-radius));
                    color: var(--df-messenger-message-bot-font-color, var(--df-messenger-font-color, var(--df-messenger-default-font-color)));
                    font-weight: var(--df-messenger-message-bot-font-weight, var(--df-messenger-message-font-weight, normal));
                    padding: var(--df-messenger-message-bot-padding, var(--df-messenger-message-padding, 12px));
                }

                .grid-container {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .grid-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px;
                }
                .grid-row:not(:last-of-type) {
                    border-bottom: var(--df-messenger-list-border-bottom, var(--df-messenger-default-border));
                    padding-bottom: var(--df-messenger-list-spacing, 10px);
                }
                .checkbox-column {
                    flex: 0 0 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .image-column {
                    flex: 0 0 75px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .image-column img {
                    width: 75px;
                    height: 75px;
                    object-fit: cover;
                }

                .details-column {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .item-container {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1rem;
                    padding: 0.5rem;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }

                .item-container img {
                    width: 50px;
                    height: 50px;
                    margin-right: 1rem;
                }

                .item-details {
                    flex-grow: 1;
                }

                .item-details span {
                    display: block;
                }
                .material-button-icon {
                    height: var(--df-messenger-button-icon-font-size, 24px);
                    width: var(--df-messenger-button-icon-font-size, 24px);
                }
                .grid-row-header {
                    font-weight: bold;
                }
                .button {
                    align-items: center;
                    background: none;
                    border: var(--df-messenger-button-border, none);
                    border-radius: var(--df-messenger-button-border-radius, var(--df-messenger-default-border-radius));
                    box-sizing: border-box;
                    color: var(--df-messenger-button-font-color, var(--df-messenger-font-color, var(--df-messenger-default-font-color)));
                    cursor: pointer;
                    display: flex;
                    font-family: var(--df-messenger-button-font-family, var(--df-messenger-font-family, var(--df-messenger-default-font-family)));
                    font-size: var(--df-messenger-button-font-size, var(--df-messenger-default-font-size));
                    overflow: hidden;
                    padding: var(--df-messenger-button-padding, var(--df-messenger-card-padding, 16px));
                    text-decoration: none;
                    width: 100%;
                }
            </style>
            <div class="grid-container"> 
                <h3>Order Details</h3>
                <span id="instructions"></span>
                <div id="items-container" class="grid-container">
                    <div class="grid-row">
                        <div class="checkbox-column">Select</div>
                        <div class="image-column"></div>
                        <div class="details-column">Item</div>
                    </div>
                </div>
                <div style="text-align:center;">
                    <button id="order-item-selector-submit" class="button">
                        <span class="material-icons material-button-icon">forward_arrow</span>
                        <span>Confirm</span>
                    </button>
                </div>
            </div>
        `
  }

  connectedCallback() {
    if (this.dfPayload) {
      this.shadowRoot.getElementById('instructions').innerText =
        this.dfPayload.instructions || 'Select the items from your order.'
      if (this.dfPayload.items) {
        this.displayItems = this.dfPayload.items.map((item) => {
          return {
            ...item,
            // name: item.name,
            // quantity: item.quantity,
            // orderNumber: item.orderNumber,
            // lineId: item.lineId,
            // shipmentNumber: item.shipmentNumber,
            key: `${item.orderNumber}-${item.shipmentNumber}-${item.lineId}`,
            checked: true,
          }
        })
        this.render()
      }
    }
    this.shadowRoot
      .getElementById('order-item-selector-submit')
      .addEventListener('click', this.onSubmit.bind(this))
  }

  render() {
    const items = this.displayItems || []
    const container = this.shadowRoot.getElementById('items-container')
    container.innerHTML = '' // Clear any existing items
    const headerRow = document.createElement('div')
    headerRow.classList.add('grid-row')
    headerRow.innerHTML = `
                    <div class="checkbox-column grid-row-header">Selected</div>
                    <div class="image-column grid-row-header"></div>
                    <div class="details-column grid-row-header">Item Detail</div>`
    container.appendChild(headerRow)
    items.forEach((item, index) => {
      const itemElement = document.createElement('div')
      itemElement.classList.add('grid-row')
      itemElement.innerHTML = `
                <div class="checkbox-column">
                    <input type="checkbox" id="item-checkbox-${item.key}" ${
        item.checked ? 'checked' : ''
      }/>
                </div>
                <div class="image-column"> 
                    <img src="${item.imageUrl}"/>
                </div>
                <div class="details-column">
                    <span>Product: ${item.name}</span>
                    <span>Quantity: ${item.quantity}</span>
                    <span>${item.shipmentNumber ? 'Shipment: ' + item.shipmentNumber : ''}</span>
                </div>
            `

      const checkbox = itemElement.querySelector(`#item-checkbox-${item.key}`)

      // Add event listeners for checkbox enable/disable
      checkbox.addEventListener('change', () => {
        item.checked = checkbox.checked
      })

      container.appendChild(itemElement)
    })
  }
  onSubmit() {
    const selectedItems = this.displayItems
      .filter((item) => item.checked)
      .map((item) => {
        const { key, checked, ...selectedItem } = item
        return selectedItem
      })
    const response = {
      dfResponseId: this.dfResponseId,
      items: selectedItems,
    }
    const selectionEndEvent = new CustomEvent('df-messenger-order-item-selector-end', {
      detail: response,
      bubbles: true,
      composed: true,
    })
    window.dispatchEvent(selectionEndEvent)
  }
  onCancel() {
    if (this._rejectSelection) {
      this._rejectSelection()
    }
    this._pendingSelection = null
  }
  waitForSelection() {
    if (this._pendingSelection) {
      return this._pendingSelection
    }
    this._pendingSelection = new Promise((resolve, reject) => {
      this._resolveSelection = resolve
      this._rejectSelection = reject
    })
    return this._pendingSelection
  }
}

// customElements.define('order-item-selector', OrderItemSelector);
