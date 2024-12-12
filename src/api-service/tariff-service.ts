import { MOCK_TARIFF_DATA } from './mock-data';

export interface Tariff {
  id: number;
  title: string;
  downloadSpeed: number;
  uploadSpeed: number;
  price: number;
  benefits: string[];
}

export class TariffService {
  static async getTariffData(): Promise<Tariff[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_TARIFF_DATA);
      }, 1000);
    });
  }
}
