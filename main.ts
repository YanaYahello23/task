import './src/components/custom-select';
import { TariffService } from './src/api-service/tarif-service';
import './src/components/tarif-card';
import './src/components/custom-button';
import './src/components/price-display';
import './src/components/speed-display';

(function populateSelectDropdown() {
  const filter = document.getElementById('filter');
  const speedValues = [8, 16, 32, 50, 100, 125, 250, 500];
  const downloadOptions = speedValues.map((speed) => ({
    value: `downloadSpeed-${speed}`,
    label: `Download Speed ${speed} Mbit/s`,
  }));

  const uploadOptions = speedValues.map((speed) => ({
    value: `uploadSpeed-${speed}`,
    label: `Upload Speed ${speed} Mbit/s`,
  }));
  const priceOption = [
    { value: 'price-250', label: 'Price <= 250 €' },
    { value: 'price-251', label: 'Price > 250 €' },
  ];
  const options = [...priceOption, ...downloadOptions, ...uploadOptions];

  if (filter) {
    filter.setAttribute('options', JSON.stringify(options));
  }

  const sort = document.getElementById('sort');
  if (sort) {
    sort.setAttribute(
      'options',
      JSON.stringify([
        { value: 'price:asc', label: 'Price: Ascending' },
        { value: 'price:desc', label: 'Price: Descending' },
        { value: 'speed:asc', label: 'Speed: Ascending' },
        { value: 'speed:desc', label: 'Speed: Descending' },
        { value: 'name:asc', label: 'Name: Ascending' },
        { value: 'name:desc', label: 'Name: Descending' },
      ])
    );
  }
})();

async function displayTariffs() {
  const container = document.getElementById('list');
  if (!container) return;

  try {
    const tariffs = await TariffService.getTariffData();

    tariffs.forEach((tariff) => {
      const card = document.createElement('tariff-card');
      (card as any).data = tariff;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching tariffs:', error);
  }
}

displayTariffs();
