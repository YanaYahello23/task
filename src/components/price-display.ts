class PriceDisplay extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      .price {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
      }
    `;
    const div = document.createElement('div');
    div.className = 'price';
    div.textContent = `${this.getAttribute('price')} €`;
    shadow.appendChild(style);
    shadow.appendChild(div);
  }

  static get observedAttributes(): string[] {
    return ['price'];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    const shadow = this.shadowRoot;
    if (name === 'price') {
      const priceElement = shadow?.querySelector('.price');
      if (priceElement) priceElement.textContent = `${newValue || ''} €`;
    }
  }
}
customElements.define('price-display', PriceDisplay);
