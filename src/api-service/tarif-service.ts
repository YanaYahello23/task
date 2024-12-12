import { MOCK_TARIF_DATA } from './mock-data';

interface Tarif {
  id: number;
  title: string;
  downloadSpeed: string;
  uploadSpeed: string;
  price: string;
}

export class TariffService {
  static async getTariffData(): Promise<Tarif[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_TARIF_DATA);
      }, 1000);
    });
  }
}
