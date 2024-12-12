import { TariffService } from '../src/api-service/tariff-service';
import { TariffManager } from '../main';
import {
  MOCK_FILTER_OPTIONS,
  MOCK_SORT_OPTIONS,
  MOCK_TARIFFS,
} from './mock-test-data';

jest.mock('../src/api-service/tariff-service', () => ({
  TariffService: {
    getTariffData: jest.fn(),
  },
}));

describe('tariff-manager', () => {
  let tariffManager: TariffManager;

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = `
      <div id="list"></div>
      <div id="filter"></div>
      <div id="sort"></div>
    `;

    (TariffService.getTariffData as jest.Mock).mockResolvedValue(MOCK_TARIFFS);

    tariffManager = new TariffManager();
  });

  it('should fetch tariffs and display them', async () => {
    await tariffManager['getTariffs']();

    const list = document.getElementById('list');
    expect(list?.children.length).toBe(2);
  });

  it('should filter tariffs based on the selected filter', () => {
    tariffManager.applyFilter(MOCK_FILTER_OPTIONS);

    expect(tariffManager['filteredTariffs']).toEqual([MOCK_TARIFFS[1]]);
  });

  it('should sort tariffs based on the selected sort option', () => {
    tariffManager['filteredTariffs'] = MOCK_TARIFFS;
    tariffManager.applySort(MOCK_SORT_OPTIONS);

    expect(tariffManager['displayedTariffs']).toEqual(MOCK_TARIFFS.reverse());
  });

  it('should populate filter and sort dropdowns', () => {
    tariffManager['populateDropdowns']();

    const filter = document.getElementById('filter');
    const sort = document.getElementById('sort');

    expect(filter?.getAttribute('options')).toBe(
      JSON.stringify(tariffManager['filterOptions'])
    );
    expect(sort?.getAttribute('options')).toBe(
      JSON.stringify(tariffManager['sortOptions'])
    );
  });

  it('should handle missing DOM elements gracefully', () => {
    document.body.innerHTML = ``;

    expect(() => tariffManager['initialize']()).not.toThrow();
  });
});
