import { TariffService } from '../src/api-service/tariff-service';
import { MOCK_TARIFFS } from './mock-test-data';

jest.useFakeTimers();

describe('TariffService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return tariff data after a delay', async () => {
    jest.spyOn(TariffService, 'getTariffData').mockResolvedValue(MOCK_TARIFFS);

    const resultPromise = TariffService.getTariffData();

    jest.advanceTimersByTime(1000);

    await expect(resultPromise).resolves.toEqual(MOCK_TARIFFS);
  });

  it('should call getTariffData exactly once', async () => {
    const spy = jest
      .spyOn(TariffService, 'getTariffData')
      .mockResolvedValue([]);

    await TariffService.getTariffData();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
