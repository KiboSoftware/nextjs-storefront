import { LitElement, html, css } from 'lit'

export class ProductCard extends LitElement {
  static properties = {
    productcode: { type: String },
    name: { type: String },
    image: { type: String },
    price: { type: Number },
    rating: { type: Number },
  }

  constructor() {
    super()
    this.productcode = ''
    this.name = ''
    this.image = ''
    this.price = 0
    this.rating = 0
  }

  static styles = css`
    :host {
      display: block;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      overflow: hidden;
      height: 100%;
      cursor: pointer;
    }
    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .image {
      position: relative;
      height: 12rem;
      width: 100%;
      cursor: pointer;
    }
    .image img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .content {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
    h2 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      font-weight: normal;
    }
    .price-rating {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .price {
      font-size: 1rem;
      font-weight: 600;
    }
    .rating {
      display: flex;
      align-items: center;
    }
    .star {
      width: 1.25rem;
      height: 1.25rem;
      fill: #facc15;
    }
    .rating-value {
      margin-left: 0.25rem;
      font-size: 0.875rem;
      color: #4b5563;
    }
    .buttons {
      display: flex;
      gap: 0.5rem;
      margin-top: auto;
      padding-top: 1rem;
    }
    .button {
      flex: 1;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      padding: 0.5rem 1rem;
      transition: all 0.2s;
    }
    .button-outline {
      border: 1px solid #d1d5db;
      background-color: transparent;
      color: #111827;
      padding: 0;
    }
    .button-outline:hover {
      background-color: #f3f4f6;
    }
    .button-primary {
      background-color: #2563eb;
      color: white;
      border: none;
    }
    .button-primary:hover {
      background-color: #1d4ed8;
    }
    .heart-icon {
      width: 1rem;
      height: 1rem;
    }
  `
  _productClick() {
    console.log('product clicked')
    this.dispatchEvent(
      new CustomEvent('df-messenger-product-click', {
        bubbles: true,
        composed: true,
        detail: { productCode: this.productcode },
      })
    )
  }
  _buyNowClick() {
    console.log('buy now clicked')
    this.dispatchEvent(
      new CustomEvent('df-messenger-buy-now-click', {
        bubbles: true,
        composed: true,
        detail: { productCode: this.productcode },
      })
    )
  }
  render() {
    return html`
      <div class="container">
        <div @click=${this._productClick} class="image">
          <img src="${this.image}" alt="${this.name}" />
        </div>
        <div class="content">
          <h2>${this.name}</h2>
          <div class="price-rating">
            <span class="price">$${this.price.toFixed(2)}</span>
            <div class="rating">
              <svg class="star" viewBox="0 0 24 24">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              <span class="rating-value">${this.rating.toFixed(1)}</span>
            </div>
          </div>
          <div class="buttons">
            <button class="button button-outline">
              <svg
                class="heart-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
            </button>
            <button @click=${this._buyNowClick} class="button button-primary">Buy Now</button>
          </div>
        </div>
      </div>
    `
  }
}

// customElements.define('df-messenger-product-card', ProductCard);
