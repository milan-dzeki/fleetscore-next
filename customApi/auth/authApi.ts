import type {
  ApiParamsType,
  BaseApiResponseType,
  RefreshTokenResponseType,
  SignupResponseType
} from '@/types/customApi/baseApi';
import BaseApi from '../baseApi';
import SERVER_METHODS from '@/configs/server/methods';
import { emailPattern } from '@/utils/inputValidators';
import { SIGNUP_RULES } from '@/configs/forms/validations/signup';
import { LoginApiResponseType } from '@/types/customApi/authApi';
import { ProfileApiResponseType } from '@/types/customApi/profileApi';
import ROUTE_PATHS from '@/configs/routePaths';

const FIELD_ERRORS = {
  'en': 'Invalid fields',
  'sr-RS': 'Uneseni podaci su nevalidni'
};

class AuthApi extends BaseApi {
  private baseUrl: string;

  constructor (params: ApiParamsType) {
    super(params);

    this.baseUrl = `${process.env.API_BASE_URL}/auth`;
  }

  private validators = {
    signup: (): this => {
      if (!this.requestBody) {
        this.fieldsError = FIELD_ERRORS[this.locale as keyof typeof FIELD_ERRORS];
        return this;
      }
      
      const { email, password, passwordConfirm } = this.requestBody;

      const emailToCheck = email?.toString().trim();
      const passwordToCheck = password?.toString().trim();
      const passwordConfirmToCheck = passwordConfirm?.toString().trim();

      if (
        !emailToCheck ||
        !emailPattern.test(emailToCheck) ||
        !passwordToCheck ||
        passwordToCheck.length < SIGNUP_RULES.password.minLength ||
        passwordToCheck.length > SIGNUP_RULES.password.maxLength ||
        !passwordConfirmToCheck ||
        passwordConfirmToCheck !== password
      ) {
        this.fieldsError = FIELD_ERRORS[this.locale as keyof typeof FIELD_ERRORS];
        return this;
      }

      return this;
    },
    login: (): this => {
      if (!this.requestBody) {
        this.fieldsError = FIELD_ERRORS[this.locale as keyof typeof FIELD_ERRORS];
        return this;
      }

      const { email, password } = this.requestBody;

      const emailToCheck = email?.toString().trim();
      const passwordToCheck = password?.toString().trim();

      if (
        !emailToCheck ||
        !emailPattern.test(emailToCheck) ||
        !passwordToCheck
      ) {
        this.fieldsError = FIELD_ERRORS[this.locale as keyof typeof FIELD_ERRORS];
        return this;
      }

      return this;
    }
  };
  
  validateFields(api: string): this {
    this.validators[api as keyof typeof this.validators]();
    return this;
  }

  async signup (): Promise<BaseApiResponseType<SignupResponseType>> {
    if (this.fieldsError) {
      return {
        success: false,
        message: this.fieldsError
      };
    }
    
    const response = await this.execute({
      endpoint: `${this.baseUrl}/register`,
      method: SERVER_METHODS.POST
    });

    return {
      success: response.success,
      message: response.message,
      data: {
        email: this.requestBody!.email
      }
    };
  }

  async login (): Promise<BaseApiResponseType<LoginApiResponseType>> {
    if (this.fieldsError) {
      return {
        success: false,
        message: this.fieldsError
      };
    }
    const response = await this.execute<LoginApiResponseType>({
      endpoint: `${this.baseUrl}/login`,
      method: SERVER_METHODS.POST
    });

    if (!response.success) {
      return response;
    }

    return {
      success: response.success,
      message: response.message,
      data: {
        accessToken: response.data.accessToken,
        expiresAt: response.data.expiresAt
      },
      rawHeaders: response.rawHeaders
    };
  }

  async refreshToken () {
    const response = await this.execute<RefreshTokenResponseType>({
      endpoint: `${this.baseUrl}/refresh`,
      method: SERVER_METHODS.POST
    });

    if (!response.success) {
      return response;
    }

    return {
      success: response.success,
      message: response.message,
      data: {
        accessToken: response.data.accessToken,
        expiresAt: response.data.expiresAt
      },
      rawHeaders: response.rawHeaders
    };
  }

  async getProfile (): Promise<BaseApiResponseType<ProfileApiResponseType>> {
    const response = await this.execute<ProfileApiResponseType>({
      endpoint: `${this.baseUrl}/me`,
      method: SERVER_METHODS.GET
    });

    if (!response.success) {
      return response;
    }

    return {
      success: true,
      message: response.message,
      data: response.data,
      redirectUrl: response.data.profileCreated
        ? ROUTE_PATHS.HOME.root
        : ROUTE_PATHS.ONBOARDING.createProfile
    }
  }

  async resendVerificationEmail () {
    return await this.execute({
      endpoint: `${this.baseUrl}/resend-verification`,
      method: SERVER_METHODS.POST
    });
  }
}

export default AuthApi;