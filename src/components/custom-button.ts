class CustomButton extends HTMLElement {
  private button: HTMLButtonElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      :host {
          width: 100%;
      }
      button {
        display: inline-flex;
        justify-content: center;
        padding: 7px;
        font-size: 12px;
        color: black;
        background-color: white;
        border: 1px solid orange;
        cursor: pointer;
        width: 100%;
        min-width: 110px;
        text-align: center;
      }
    `;

    this.button = document.createElement('button');
    this.button.textContent = this.getAttribute('label') || 'Click me';

    shadow.appendChild(style);
    shadow.appendChild(this.button);
  }

  static get observedAttributes() {
    return ['label', 'disabled'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'label') {
      this.button.textContent = newValue;
    }
  }

  onClick(handler: (event: Event) => void) {
    this.button.addEventListener('click', handler);
  }
}

customElements.define('custom-button', CustomButton);
