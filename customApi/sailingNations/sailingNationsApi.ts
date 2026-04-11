import type { ApiParamsType, BaseApiResponseType } from '@/types/customApi/baseApi';
import type { SailingNationType } from '@/types/entities';
import BaseApi from '../baseApi';
import SERVER_METHODS from '@/configs/server/methods';

class SailingNationsApi extends BaseApi {
  private baseUrl: string;

  constructor (params: ApiParamsType) {
    super(params);

    this.baseUrl = `${process.env.API_BASE_URL}/sailing-nations`;
  }

  async get (): Promise<BaseApiResponseType<SailingNationType[]>> {
    return await this.execute<SailingNationType[]>({
      endpoint: this.baseUrl,
      method: SERVER_METHODS.GET
    });
  }
}

export default SailingNationsApi;