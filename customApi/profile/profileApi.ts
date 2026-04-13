import type { ApiParamsType, BaseApiResponseType } from '@/types/customApi/baseApi';
import type { SailorType } from '@/types/entities';
import { PROFILE_RULES } from '@/configs/forms/validations/profile';
import SERVER_METHODS from '@/configs/server/methods';
import { API_CACHE_KEYS } from '../cacheKeys';
import BaseApi from '../baseApi';

class ProfileApi extends BaseApi {
  private baseUrl: string;

  constructor(params: ApiParamsType) {
    super(params);

    this.baseUrl = `${process.env.API_BASE_URL}/profile`;
  }

  private validators = {
    create: (): this => {
      if (!this.requestBody) {
        this.fieldsError = 'Invalid fields provided.';
        return this;
      }

      const { firstName, lastName } = this.requestBody;

      const firstNameToCheck = firstName?.toString().trim();
      const lastNameToCheck = lastName?.toString().trim();

      if (
        !firstNameToCheck ||
        !lastNameToCheck ||
        firstNameToCheck.length < PROFILE_RULES.firstName.minLength ||
        firstNameToCheck.length > PROFILE_RULES.firstName.maxLength ||
        lastNameToCheck.length < PROFILE_RULES.lastName.minLength ||
        lastNameToCheck.length > PROFILE_RULES.lastName.maxLength
      ) {
        this.fieldsError = 'Invalid fields provided.';
        return this;
      }

      return this;
    }
  };

  validateFields(api: string): this {
    this.validators[api as keyof typeof this.validators]();
    return this;
  }

  async create () {
    const response = await this.execute({
      endpoint: `${this.baseUrl}/me`,
      method: SERVER_METHODS.PUT
    });

    return response;
  }

  async getMySailors (userId: string): Promise<BaseApiResponseType<SailorType[]>> {
    return await this.execute<SailorType[]>({
      endpoint: `${this.baseUrl}/me/sailors`,
      method: SERVER_METHODS.GET,
      entityFetchTag: `${API_CACHE_KEYS.MY_SAILORS}-${userId}`
    });
  }
}

export default ProfileApi;