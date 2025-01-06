import { LitElement, html, css } from 'lit'

export class ProductGrid extends LitElement {
  static properties = {
    dfPayload: { type: Object },
    _products: { type: Array },
  }
  constructor() {
    super()
    this.dfPayload = null
    this._products = []
  }
  connectedCallback() {
    super.connectedCallback()
    if (this.dfPayload && this.dfPayload.items) {
      this._products = this.dfPayload.items
      this.render()
    }
  }
  static styles = css`
    :host {
      display: block;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 1.5rem;
    }
    @media (min-width: 640px) {
      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
    @media (min-width: 1024px) {
      .grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
  `

  render() {
    return html`
      <div class="grid">
        ${this._products.map(
          (product) => html`
            <df-messenger-product-card
              productcode="${product.productCode}"
              name="${product.productName}"
              image="${product.imageUrl}"
              price="${product.price}"
              rating="${product.rating}"
            ></df-messenger-product-card>
          `
        )}
      </div>
    `
  }
}

// customElements.define('df-messenger-product-grid', ProductGrid);
