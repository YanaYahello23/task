interface CustomSelectAttributes {
  value: string;
  label: string;
}

interface OptionData {
  value: string;
  text: string;
}

export class CustomSelect extends HTMLElement {
  private shadow: ShadowRoot;
  private label: HTMLLabelElement;
  private select: HTMLSelectElement;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      .custom-select-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 14px;
      }
      .custom-select-container label {
        font-size: 11px;
        color: #555;
      }
      select {
        font-size: 12px;
        border: inset 1px gray; 
        border-right: solid 1px black;
        padding: 4px 8px;
        width: 180px;
      }
      select:focus {
        outline: none;
      } 
    `;
    const container = document.createElement('div');
    container.classList.add('custom-select-container');

    this.label = document.createElement('label');
    this.label.textContent = this.getAttribute('label') || 'Default Label';

    this.select = document.createElement('select');
    this.select.addEventListener('change', () => {
      const selectedValue = this.select.value;
      this.dispatchEvent(
        new CustomEvent('optionSelected', {
          detail: { value: selectedValue },
          bubbles: true,
          composed: true,
        })
      );
    });

    container.appendChild(this.label);
    container.appendChild(this.select);
    this.shadow.appendChild(style);
    this.shadow.appendChild(container);
  }

  setOptions(options: OptionData[]): void {
    this.select.innerHTML = '';
    options.forEach((optionData) => {
      const option = document.createElement('option');
      option.value = optionData.value;
      option.textContent = optionData.text;
      this.select.appendChild(option);
    });
  }

  static get observedAttributes(): string[] {
    return ['label', 'options'];
  }

  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    if (name === 'label' && this.label) {
      this.label.textContent = newValue;
    }
    if (name === 'options' && newValue) {
      this.updateOptions(JSON.parse(newValue));
    }
  }

  private updateOptions(
    options: CustomSelectAttributes[],
    placeholder: string = 'Select an option'
  ): void {
    this.select.innerHTML = '';

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = placeholder;
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    this.select.appendChild(placeholderOption);

    options.forEach((optionData) => {
      const option = document.createElement('option');
      option.value = optionData.value;
      option.textContent = optionData.label;
      this.select.appendChild(option);
    });
  }
}

customElements.define('custom-select', CustomSelect);
