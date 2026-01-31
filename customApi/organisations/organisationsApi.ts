import type { ApiParamsType, BaseApiRawResponseType } from '@/types/customApi/baseApi';
import SERVER_METHODS from '@/configs/server/methods';
import BaseApi from '@/customApi/baseApi';

class OrganisationsApi extends BaseApi {
  private baseUrl: string;

  constructor (params: ApiParamsType) {
    super(params);

    this.baseUrl = `${process.env.API_BASE_URL}/organisations`;
  }

  private validators = {
    create: () => {
      if (!this.requestBody) {
        this.fieldsError = 'Can not create organisation with no info.';
        return this;
      }

      const { name } = this.requestBody;
      
      const nameToCheck = name?.toString().trim();

      if (!nameToCheck) {
        this.fieldsError = 'Organisation must have a name.';
        return this;
      }

      return this;
    }
  };

  validateFields(api: string): this {
    this.validators[api as keyof typeof this.validators]();
    return this;
  }

  async create (): Promise<BaseApiRawResponseType> {
    return await this.execute<BaseApiRawResponseType>({
      endpoint: this.baseUrl,
      method: SERVER_METHODS.POST
    });
  }
}

export default OrganisationsApi;