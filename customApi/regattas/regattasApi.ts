import SERVER_METHODS from '@/configs/server/methods';
import BaseApi from '../baseApi';
import { ApiParamsType, BaseApiResponseType } from '@/types/customApi/baseApi';
import ROUTE_PATHS from '@/configs/routePaths';
import { RegattaType } from '@/types/entities';

class RegattasApi extends BaseApi {
  private baseUrl: string;
  
  constructor (params: ApiParamsType) {
    super(params);

    this.baseUrl = `${process.env.API_BASE_URL}/regattas`;
  }

  async create (locale: string): Promise<BaseApiResponseType<RegattaType>> {
    const response = await this.execute<RegattaType>({
      endpoint: this.baseUrl,
      method: SERVER_METHODS.POST,
      revalidateTagOnSuccess: 'regattas'
    });

    return {
      ...response,
      ...('data' in response && response.data.id ? {
        redirectUrl: `/${locale}${ROUTE_PATHS.REGATTAS.root}/${response.data.id}`
      } : {})
    };;
  }
}

export default RegattasApi;