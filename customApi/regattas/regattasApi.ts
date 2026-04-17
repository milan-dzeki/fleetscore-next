import SERVER_METHODS from '@/configs/server/methods';
import BaseApi from '../baseApi';
import { ApiParamsType, BaseApiResponseType } from '@/types/customApi/baseApi';
import ROUTE_PATHS from '@/configs/routePaths';
import { RegattaRegistrationType, RegattaType } from '@/types/entities';

class RegattasApi extends BaseApi {
  private baseUrl: string;
  
  constructor (params: ApiParamsType) {
    super(params);

    this.baseUrl = `${process.env.API_BASE_URL}/regattas`;
  }

  async get (): Promise<BaseApiResponseType<RegattaType[]>> {
    return await this.execute<RegattaType[]>({
      endpoint: this.baseUrl,
      method: SERVER_METHODS.GET,
      entityFetchTag: 'regattas'
    });
  }

  async getById (id: string): Promise<BaseApiResponseType<RegattaType>> {
    return await this.execute<RegattaType>({
      endpoint: `${this.baseUrl}/${id}`,
      method: SERVER_METHODS.GET,
      entityFetchTag: `regattas-${id}`
    });
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
    };
  }

  async update (id: string): Promise<BaseApiResponseType<RegattaType>> {
    const response = await this.execute<RegattaType>({
      endpoint: `${this.baseUrl}/${id}`,
      method: SERVER_METHODS.PUT,
      revalidateTagOnSuccess: `regattas-${id}`
    });

    return response;
  }

  async delete (id: string, locale: string) {
    const response = await this.execute({
      endpoint: `${this.baseUrl}/${id}`,
      method: SERVER_METHODS.DELETE,
      revalidateTagOnSuccess: 'regattas'
    });

    return {
      ...response,
      redirectUrl: `/${locale}${ROUTE_PATHS.REGATTAS.root}`
    };
  }

  async getRegistrations (regattaId: string): Promise<BaseApiResponseType<RegattaRegistrationType[]>> {
    return await this.execute<RegattaRegistrationType[]>({
      endpoint: `${this.baseUrl}/${regattaId}/registrations`,
      method: SERVER_METHODS.GET,
      entityFetchTag: `regatta-${regattaId}-registrations`
    });
  }

  async registerToRegatta (regattaId: string, locale: string) {
    const response = await this.execute({
      endpoint: `${this.baseUrl}/${regattaId}/registrations`,
      method: SERVER_METHODS.POST,
      revalidateTagOnSuccess: `regatta-${regattaId}-registrations`
    });

    return {
      ...response,
      redirectUrl: `/${locale}${ROUTE_PATHS.REGATTAS.root}/${regattaId}/registrations`
    };
  }

  async editRegattaRegistration (regattaId: string, registrationId: string) {
    return await this.execute({
      endpoint: `${this.baseUrl}/${regattaId}/registrations/${registrationId}`,
      method: SERVER_METHODS.PUT,
      revalidateTagOnSuccess: `regatta-${regattaId}-registrations`
    });
  }
}

export default RegattasApi;