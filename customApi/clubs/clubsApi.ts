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

  async get (sailingNationId?: string): Promise<BaseApiResponseType<ClubType[]>> {
    return await this.execute<ClubType[]>({
      endpoint: `${this.baseUrl}${sailingNationId ? `?sailingNationId=${sailingNationId}` : ''}`,
      method: SERVER_METHODS.GET,
      entityFetchTag: 'clubs'
    });
  }

  async getById (id: string | number): Promise<BaseApiResponseType<ClubType>> {
    return await this.execute<ClubType>({
      endpoint: `${this.baseUrl}/${id}`,
      method: SERVER_METHODS.GET,
      entityFetchTag: `clubs-${id}`
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

  async update (id: string): Promise<BaseApiResponseType<ClubType>> {
    const response = await this.execute<ClubType>({
      endpoint: `${this.baseUrl}/${id}`,
      method: SERVER_METHODS.PUT,
      revalidateTagOnSuccess: `clubs-${id}`
    });

    return response;
  }

  async delete (id: string, locale: string) {
    const response = await this.execute({
      endpoint: `${this.baseUrl}/${id}`,
      method: SERVER_METHODS.DELETE,
      revalidateTagOnSuccess: 'clubs'
    });

    return {
      ...response,
      redirectUrl: `/${locale}${ROUTE_PATHS.CLUBS.root}`
    };
  }
}

export default ClubsApi;