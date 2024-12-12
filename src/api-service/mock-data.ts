import { Tariff } from './tariff-service';

export const MOCK_TARIFF_DATA: Tariff[] = [
  {
    id: 1,
    title: 'Tariff Name A',
    downloadSpeed: 16,
    uploadSpeed: 8,
    price: 123.45,
    benefits: [
      'Tariff benefit 1',
      'Tariff benefit 2',
      'Tariff benefit 3',
      'Tariff benefit 4',
    ],
  },
  {
    id: 2,
    title: 'Tariff Name B',
    downloadSpeed: 32,
    uploadSpeed: 16,
    price: 150.52,
    benefits: [
      'Tariff benefit 1',
      'Tariff benefit 2',
      'Tariff benefit 3',
      'Tariff benefit 4',
    ],
  },
  {
    id: 3,
    title: 'Tariff Name C',
    downloadSpeed: 100,
    uploadSpeed: 50,
    price: 345.12,
    benefits: [
      'Tariff benefit 1',
      'Tariff benefit 2',
      'Tariff benefit 3',
      'Tariff benefit 4',
    ],
  },
  {
    id: 4,
    title: 'Tariff Name D',
    downloadSpeed: 250,
    uploadSpeed: 125,
    price: 451.23,
    benefits: [
      'Tariff benefit 1',
      'Tariff benefit 2',
      'Tariff benefit 3',
      'Tariff benefit 4',
    ],
  },
  {
    id: 5,
    title: 'Tariff Name E',
    downloadSpeed: 500,
    uploadSpeed: 250,
    price: 512.34,
    benefits: [
      'Tariff benefit 1',
      'Tariff benefit 2',
      'Tariff benefit 3',
      'Tariff benefit 4',
    ],
  },
];
