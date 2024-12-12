import { FilterOption, SortOption } from '../src/constants/dropdown-options';
import { Tariff } from '../src/api-service/tariff-service';

export const MOCK_TARIFFS: Tariff[] = [
  {
    id: 2,
    title: 'Tariff Name C',
    downloadSpeed: 100,
    uploadSpeed: 50,
    price: 12,
    benefits: [
      'Tariff benefit 1',
      'Tariff benefit 2',
      'Tariff benefit 3',
      'Tariff benefit 4',
    ],
  },
  {
    id: 1,
    title: 'Tariff Name B',
    downloadSpeed: 32,
    uploadSpeed: 16,
    price: 150,
    benefits: [
      'Tariff benefit 1',
      'Tariff benefit 2',
      'Tariff benefit 3',
      'Tariff benefit 4',
    ],
  },
];

export const MOCK_FILTER_OPTIONS: FilterOption = {
  key: 'price',
  operator: 'gte',
  threshold: 15,
  value: 'price',
  label: 'Test filter',
};

export const MOCK_SORT_OPTIONS: SortOption = {
  value: 'speedUpload:asc',
  label: 'Upload Speed: Ascending',
  key: 'uploadSpeed',
  order: 'asc',
};
