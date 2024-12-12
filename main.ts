import './src/components/custom-select';
import './src/components/tarif-card';
import './src/components/custom-button';
import './src/components/price-display';
import './src/components/speed-display';
import {
  FILTER_OPTIONS,
  FilterOption,
  SORT_OPTIONS,
  SortOption,
} from './src/constants/dropdown-options';
import { Tariff, TariffService } from './src/api-service/tariff-service';

export class TariffManager {
  private filterOptions: FilterOption[] = FILTER_OPTIONS;
  private sortOptions: SortOption[] = SORT_OPTIONS;
  private selectedFilter: FilterOption | null | undefined = null;
  private selectedSort: SortOption | null | undefined = null;
  private allTariffs: Tariff[] = [];
  private filteredTariffs: Tariff[] = [];
  private displayedTariffs: Tariff[] = [];

  constructor() {
    this.initialize();
  }

  private async getTariffs(): Promise<void> {
    try {
      const data = await TariffService.getTariffData();
      this.allTariffs = data || [];
      this.filteredTariffs = [...this.allTariffs];
      this.displayedTariffs = [...this.filteredTariffs];
      this.displayTariffs();
    } catch (error) {
      console.error('Error fetching tariffs:', error);
    }
  }

  displayTariffs(): void {
    const container = document.getElementById('list');
    if (!container) return;

    container.innerHTML = '';

    this.displayedTariffs.forEach((tariff) => {
      const card = document.createElement('tariff-card');
      (card as any).data = tariff;
      container.appendChild(card);
    });
  }

  applyFilter(filter?: FilterOption): void {
    if (!filter) {
      this.filteredTariffs = [...this.allTariffs];
    } else {
      const { key, operator, threshold } = filter;
      this.filteredTariffs = this.allTariffs.filter((tariff) => {
        if (operator === 'gte')
          return (tariff[key as keyof Tariff] as number) >= threshold;
        if (operator === 'lte')
          return (tariff[key as keyof Tariff] as number) <= threshold;
        return false;
      });
    }

    this.applySort(this.selectedSort);
  }

  applySort(sort?: SortOption | null): void {
    if (!sort) {
      this.displayedTariffs = [...this.filteredTariffs];
    } else {
      const { key, order } = sort;
      this.displayedTariffs = [...this.filteredTariffs].sort((a, b) => {
        if (order === 'asc')
          return (a[key as keyof Tariff] as number) >
            (b[key as keyof Tariff] as number)
            ? 1
            : -1;
        if (order === 'desc')
          return (a[key as keyof Tariff] as number) <
            (b[key as keyof Tariff] as number)
            ? 1
            : -1;
        return 0;
      });
    }

    this.displayTariffs();
  }

  private populateDropdowns(): void {
    const filter: HTMLElement | null = document.getElementById('filter');
    const sort: HTMLElement | null = document.getElementById('sort');

    const filterOptions = [...this.filterOptions];

    if (filter) {
      filter.setAttribute('options', JSON.stringify(this.filterOptions));
      filter.addEventListener('optionSelected', (event: any) => {
        const selectedCategory = event.detail.value;
        this.selectedFilter = filterOptions.find(
          (option) => option.value === selectedCategory
        );
        this.applyFilter(this.selectedFilter);
      });
    }

    if (sort) {
      const sortOptions = [...this.sortOptions];
      sort.setAttribute('options', JSON.stringify(this.sortOptions));
      sort.addEventListener('optionSelected', (event: any) => {
        const selectedSort = event.detail.value;
        this.selectedSort = sortOptions.find(
          (option) => option.value === selectedSort
        );
        this.applySort(this.selectedSort);
      });
    }
  }

  private initialize(): void {
    this.getTariffs();
    this.populateDropdowns();
  }
}

new TariffManager();
