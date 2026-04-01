import type { ApiParamsType, BaseApiResponseType } from '@/types/customApi/baseApi';
import type { ClubType } from '@/types/entities';
import SERVER_METHODS from '@/configs/server/methods';
import BaseApi from '@/customApi/baseApi';
import ROUTE_PATHS from '@/configs/routePaths';

class ClubsApi extends BaseApi {
  private baseUrl: string;

  constructor (params: ApiParamsType) {
    super(params);

    this.baseUrl = `${process.env.API_BASE_URL}/clubs`;
  }

  async get (): Promise<BaseApiResponseType<ClubType[]>> {
    return await this.execute<ClubType[]>({
      endpoint: this.baseUrl,
      method: SERVER_METHODS.GET,
      entityFetchTag: 'clubs'
    });
  }

  async create (locale: string): Promise<BaseApiResponseType<ClubType>> {
    const response = await this.execute<ClubType>({
      endpoint: this.baseUrl,
      method: SERVER_METHODS.POST,
      revalidateTagOnSuccess: 'clubs'
    });

    return {
      ...response,
      ...('data' in response && response.data.id ? {
        redirectUrl: `/${locale}${ROUTE_PATHS.CLUBS.root}/${response.data.id}`
      } : {})
    };
  }
}

export default ClubsApi;