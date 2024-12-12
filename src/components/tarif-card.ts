class TariffCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      .card {
        display: flex;
        border: 1px solid black;
      }
     .content {
       padding: 10px;
       display: flex;
       gap: 15px;
       width: 100%;
       justify-content: space-between;
      }
      .id {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 15px;
        border-right: 1px solid black;
      }
      .speed-block {
         display: flex;
         flex-direction: column;
         gap: 10px;
         flex-shrink: 0;
         flex-basis: 130px;
      }
      .speed-block-label {
        display: none;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
      }
      .price-actions {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
      }
      @media (min-width: 768px) {
       .speed-block-label {
        display: block;
      }
       .price-actions {
         justify-content: flex-start;
         align-items: flex-end;
         flex-basis: 180px;
       }
     }    
    `;

    const container = document.createElement('div');
    container.className = 'card';

    container.innerHTML = `
      <div class="id"></div>
      <div class="content">
      <h3 class="title"></h3>
      <div class="speed-block">
       <div class="speed-block-label">Download</div>
      <speed-display value="" unit="" direction="down"></speed-display>
       <div  class="speed-block-label">Upload</div>
      <speed-display value="" unit="" direction="up"></speed-display>
      </div>
      <div class="price-actions">
        <price-display price=""></price-display>
        <custom-button label="To Tariff >"></custom-button>
      </div>
      </div>
    `;

    shadow.appendChild(style);
    shadow.appendChild(container);
  }

  set data(tariffData: {
    title: string;
    downloadSpeed: string;
    uploadSpeed: string;
    price: string;
    id: string;
  }) {
    const shadow = this.shadowRoot;

    const titleElement = shadow?.querySelector('.title');
    if (titleElement) titleElement.textContent = tariffData.title;
    const idElement = shadow?.querySelector('.id');
    if (idElement) idElement.textContent = tariffData.id + '.';

    const downloadSpeedElement = shadow?.querySelector(
      'speed-display:first-of-type'
    );
    if (downloadSpeedElement) {
      downloadSpeedElement.setAttribute(
        'value',
        tariffData.downloadSpeed.split(' ')[0]
      );
      downloadSpeedElement.setAttribute(
        'unit',
        tariffData.downloadSpeed.split(' ')[1]
      );
      downloadSpeedElement.setAttribute('direction', 'down');
    }

    const uploadSpeedElement = shadow?.querySelector(
      'speed-display:last-of-type'
    );
    if (uploadSpeedElement) {
      uploadSpeedElement.setAttribute(
        'value',
        tariffData.uploadSpeed.split(' ')[0]
      );
      uploadSpeedElement.setAttribute(
        'unit',
        tariffData.uploadSpeed.split(' ')[1]
      );
      uploadSpeedElement.setAttribute('direction', 'up');
    }

    const priceElement = shadow?.querySelector('price-display');
    if (priceElement) priceElement.setAttribute('price', tariffData.price);
  }
}
customElements.define('tariff-card', TariffCard);
