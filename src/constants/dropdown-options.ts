export interface SortOption {
  value: string;
  label: string;
  key: string;
  order: string;
}

export interface FilterOption {
  value: string;
  label: string;
  key: string;
  operator: 'gte' | 'lte';
  threshold: number;
}

export const FILTER_OPTIONS: FilterOption[] = [
  {
    value: 'upload>=100',
    label: 'Upload >= 100 Mbit/s',
    key: 'uploadSpeed',
    operator: 'gte',
    threshold: 100,
  },
  {
    value: 'upload<=100',
    label: 'Upload <= 100 Mbit/s',
    key: 'uploadSpeed',
    operator: 'lte',
    threshold: 100,
  },
  {
    value: 'download>=100',
    label: 'Download >= 100 Mbit/s',
    key: 'downloadSpeed',
    operator: 'gte',
    threshold: 100,
  },
  {
    value: 'download<=100',
    label: 'Download <= 100 Mbit/s',
    key: 'downloadSpeed',
    operator: 'lte',
    threshold: 100,
  },
  {
    value: 'price>=250',
    label: 'Price >= 250 €',
    key: 'price',
    operator: 'gte',
    threshold: 250,
  },
  {
    value: 'price<=250',
    label: 'Price <= 250 €',
    key: 'price',
    operator: 'lte',
    threshold: 250,
  },
];

export const SORT_OPTIONS: SortOption[] = [
  {
    value: 'price:asc',
    label: 'Price: Ascending',
    key: 'price',
    order: 'asc',
  },
  {
    value: 'price:desc',
    label: 'Price: Descending',
    key: 'price',
    order: 'desc',
  },
  {
    value: 'speedUpload:asc',
    label: 'Upload Speed: Ascending',
    key: 'uploadSpeed',
    order: 'asc',
  },
  {
    value: 'speedUpload:desc',
    label: 'Upload Speed: Descending',
    key: 'uploadSpeed',
    order: 'desc',
  },
  {
    value: 'speedDownload:asc',
    label: 'Download Speed: Ascending',
    key: 'downloadSpeed',
    order: 'asc',
  },
  {
    value: 'speedDownload:desc',
    label: 'Download Speed: Descending',
    key: 'downloadSpeed',
    order: 'desc',
  },
  {
    value: 'title:asc',
    label: 'Title: Ascending',
    key: 'title',
    order: 'asc',
  },
  {
    value: 'title:desc',
    label: 'Title: Descending',
    key: 'title',
    order: 'desc',
  },
];
