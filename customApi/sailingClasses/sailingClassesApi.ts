import type { ApiParamsType, BaseApiResponseType } from '@/types/customApi/baseApi';
import type { SailingClassType } from '@/types/entities';
import SERVER_METHODS from '@/configs/server/methods';
import BaseApi from '../baseApi';

class SailingClassesApi extends BaseApi {
  private baseUrl: string;

  constructor (params: ApiParamsType) {
    super(params);

    this.baseUrl = `${process.env.API_BASE_URL}/sailing-classes`;
  }

  async get (): Promise<BaseApiResponseType<SailingClassType[]>> {
    return await this.execute<SailingClassType[]>({
      endpoint: this.baseUrl,
      method: SERVER_METHODS.GET,
      entityFetchTag: 'sailing-nations'
    });
  }
}

export default SailingClassesApi;