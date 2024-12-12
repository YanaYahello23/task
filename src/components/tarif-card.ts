import { Tariff } from '../api-service/tariff-service';

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
     .card__content {
       padding: 10px;
       display: flex;
       gap: 15px;
       width: 100%;
       justify-content: space-between;
      }
      .card__id {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 15px;
        border-right: 1px solid black;
      }
      .card__speed-block {
         display: flex;
         flex-direction: column;
         gap: 10px;
         flex-shrink: 0;
         flex-basis: 130px;
      }
      .card__speed-block-label {
        display: none;
      }
      .card__actions {
        display: flex;
        justify-content: flex-end;
      }
      .card__price-actions {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
      }
      .card__benefits {
        display: none;
      }
      .card__benefits > li {
        margin-bottom: 5px;
      }
      @media (min-width: 768px) {
       .card__speed-block-label {
        display: block;
      }
       .card__price-actions {
         justify-content: flex-start;
         align-items: flex-end;
         flex-basis: 180px;
       }
     } 
     @media (min-width: 900px) {
       .card__benefits {
        display: block;
      }
     }    
    `;

    const container = document.createElement('div');
    container.className = 'card';

    container.innerHTML = `
      <div class="card__id"></div>
      <div class="card__content">
      <h3 class="card__title"></h3>
      <div class="card__speed-block">
       <div class="card__speed-block-label">Download</div>
      <speed-display value="" direction="down"></speed-display>
       <div  class="card__speed-block-label">Upload</div>
      <speed-display value="" direction="up"></speed-display>
      </div>
      <ul class="card__benefits"></ul>
      <div class="card__price-actions">
        <price-display price=""></price-display>
        <custom-button label="To Tariff >"></custom-button>
      </div>
      </div>
    `;

    shadow.appendChild(style);
    shadow.appendChild(container);
  }

  set data(tariffData: Tariff) {
    const shadow = this.shadowRoot;

    const titleElement = shadow?.querySelector('.card__title');
    if (titleElement) titleElement.textContent = tariffData.title;
    const idElement = shadow?.querySelector('.card__id');
    if (idElement) idElement.textContent = tariffData.id + '.';

    const downloadSpeedElement = shadow?.querySelector(
      'card__speed-display:first-of-type'
    );
    if (downloadSpeedElement) {
      downloadSpeedElement.setAttribute(
        'value',
        String(tariffData.downloadSpeed)
      );
      downloadSpeedElement.setAttribute('direction', 'down');
    }

    const uploadSpeedElement = shadow?.querySelector(
      'card__speed-display:last-of-type'
    );
    if (uploadSpeedElement) {
      uploadSpeedElement.setAttribute('value', String(tariffData.uploadSpeed));
      uploadSpeedElement.setAttribute('direction', 'up');
    }

    const priceElement = shadow?.querySelector('price-display');
    if (priceElement)
      priceElement.setAttribute('price', String(tariffData.price));

    if (tariffData.benefits.length) {
      const benefitsBlock = shadow?.querySelector('.card__benefits');
      if (benefitsBlock) {
        tariffData.benefits.forEach((benefit) => {
          const li = document.createElement('li');
          li.textContent = benefit;
          benefitsBlock.appendChild(li);
        });
      }
    }
  }
}

customElements.define('tariff-card', TariffCard);
