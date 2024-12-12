class SpeedDisplay extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      .speed {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 0 10px;
      }
      .speed > div {
         flex: 1;
      }
      .down {
        width: 120px; 
        min-width: 120px;
        max-width: 120px;
        margin: 0 auto;
        display: flex;
        border: 1px solid lightgreen;
      }
      .up {
        width: 120px; 
        min-width: 120px;
        max-width: 120px;
        margin: 0 auto;
        display: flex;
        border: 1px solid lightblue;
      }
      .speed-data {
       display: flex;
       align-items: center;
       justify-content: center;
       gap: 2px;
       flex: 1 1 0;
       text-align: center;
      }

      .direction, .block {
        display: flex; 
        justify-content: center; 
        align-items: center;
        flex: 1 1 0;
       }
      .arrow {
        font-size: 25px;
        text-align: center;
       }
      @media (min-width: 768px) {
        .up, .down {
        width: 180px; 
        min-width: 180px;
        max-width: 180px;
      }
      .border-up {
        border-right: 1px solid lightblue;
      }
      .border-down {
        border-right: 1px solid lightgreen;
      }
     }
    `;
    const div = document.createElement('div');
    div.className = 'speed';
    div.innerHTML = `
      <div class="direction block"></div>
      <div class="speed-data">
       <span class="speed-value">${this.getAttribute('value')}</span>
       <span class="speed-unit">${this.getAttribute('unit')}</span>
      </div>
    `;
    shadow.appendChild(style);
    shadow.appendChild(div);
  }

  static get observedAttributes() {
    return ['direction', 'value', 'unit'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const shadow = this.shadowRoot;
    if (name === 'direction') {
      const directionElement: Element | null | undefined =
        shadow?.querySelector('.direction');
      const parentElement: Element | null | undefined =
        shadow?.querySelector('.speed');
      const isUp = newValue === 'up';
      if (directionElement) {
        directionElement.classList.add(isUp ? 'border-up' : 'border-down');
      }
      if (parentElement) {
        parentElement.className = isUp ? 'up' : 'down';
      }
      if (directionElement) {
        const safeValue: 'up' | 'down' | '' =
          isUp || newValue === 'down' ? newValue : '';
        directionElement.innerHTML = `<div class="arrow">${safeValue === 'up' ? '&#x21A5;' : '&#x21A7;'}</div>`;
      }
    }
    if (name === 'value') {
      const valueElement: Element | null | undefined =
        shadow?.querySelector('.speed-value');
      if (valueElement) valueElement.textContent = `${newValue || ''}`;
    }
    if (name === 'unit') {
      const unitElement: Element | null | undefined =
        shadow?.querySelector('.speed-unit');
      if (unitElement) unitElement.textContent = `${newValue || ''}`;
    }
  }
}
customElements.define('speed-display', SpeedDisplay);
