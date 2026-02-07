import type {
  ApiParamsType,
  BaseApiRawResponseType,
  BaseApiResponseType,
  RefreshTokenResponseType,
  SignupResponseType
} from '@/types/customApi/baseApi';
import type { LoginApiResponseType } from '@/types/customApi/authApi';
import type { ProfileApiResponseType } from '@/types/customApi/profileApi';
import SERVER_METHODS from '@/configs/server/methods';
import { SIGNUP_RULES } from '@/configs/forms/validations/signup';
import { emailPattern } from '@/utils/inputValidators';
import ROUTE_PATHS from '@/configs/routePaths';
import BaseApi from '../baseApi';

class AuthApi extends BaseApi {
  private baseUrl: string;

  constructor (params: ApiParamsType) {
    super(params);

    this.baseUrl = `${process.env.API_BASE_URL}/auth`;
  }

  private validators = {
    signup: (): this => {
      if (!this.requestBody) {
        this.fieldsError = 'Invalid fields.';
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
        this.fieldsError = 'Invalid fields.';
        return this;
      }

      return this;
    },
    login: (): this => {
      if (!this.requestBody) {
        this.fieldsError ='Invalid fields.';
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
        this.fieldsError = 'Invalid fields.';
        return this;
      }

      return this;
    },
    forgotPassword: (): this => {
      if (!this.requestBody) {
        this.fieldsError = 'Invalid fields.';
        return this;
      }

      const { email } = this.requestBody;

      const emailToCheck = email?.toString().trim();

      if (!emailToCheck || !emailPattern.test(emailToCheck)) {
        this.fieldsError = 'Invalid fields.';
        return this;
      }

      return this;
    },
    resetPassword: (): this => {
      if (!this.requestBody) {
        this.fieldsError = 'Invalid fields.';
        return this;
      }
      
      const { token, password, passwordConfirm } = this.requestBody;

      const tokenToCheck = token?.toString().trim();
      const passwordToCheck = password?.toString().trim();
      const passwordConfirmToCheck = passwordConfirm?.toString().trim();

      if (
        !tokenToCheck ||
        !passwordToCheck ||
        passwordToCheck.length < SIGNUP_RULES.password.minLength ||
        passwordToCheck.length > SIGNUP_RULES.password.maxLength ||
        !passwordConfirmToCheck ||
        passwordConfirmToCheck !== password
      ) {
        this.fieldsError = 'Invalid fields.';
        return this;
      }

      return this;
    }
  };
  
  validateFields(api: string): this {
    this.validators[api as keyof typeof this.validators]();
    return this;
  }

  async signup (locale: string): Promise<BaseApiResponseType<SignupResponseType>> {
    if (this.fieldsError) {
      return {
        success: false,
        statusCode: 400,
        message: this.fieldsError
      };
    }
    
    const response = await this.execute<SignupResponseType>({
      endpoint: `${this.baseUrl}/register`,
      method: SERVER_METHODS.POST
    });

    return {
      success: response.success,
      statusCode: response.statusCode,
      message: response.message,
      redirectUrl: `/${locale}${ROUTE_PATHS.ONBOARDING.emailSent}`,
      data: {
        email: this.requestBody!.email
      }
    };
  }

  async login (): Promise<BaseApiResponseType<LoginApiResponseType>> {
    if (this.fieldsError) {
      return {
        success: false,
        statusCode: 400,
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
      statusCode: response.statusCode,
      message: response.message,
      data: {
        accessToken: response.data.accessToken,
        expiresAt: response.data.expiresAt
      },
      rawHeaders: response.rawHeaders
    };
  }

  async refreshToken (): Promise<BaseApiResponseType<RefreshTokenResponseType>> {
    const response = await this.execute<RefreshTokenResponseType>({
      endpoint: `${this.baseUrl}/refresh`,
      method: SERVER_METHODS.POST
    });

    console.log('refresh token message', response.message)
    if (!response.success) {
      return response;
    }
    return {
      success: response.success,
      statusCode: response.statusCode,
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
      statusCode: response.statusCode,
      message: response.message,
      data: response.data,
      // redirectUrl: response.data.profileCreated
      //   ? ROUTE_PATHS.HOME.root
      //   : ROUTE_PATHS.ONBOARDING.createProfile
    }
  }

  async resendVerificationEmail () {
    return await this.execute<BaseApiRawResponseType>({
      endpoint: `${this.baseUrl}/resend-verification`,
      method: SERVER_METHODS.POST
    });
  }

  async forgotPassword () {
    return await this.execute<BaseApiRawResponseType>({
      endpoint: `${this.baseUrl}/forgot-password`,
      method: SERVER_METHODS.POST
    });
  }

  async resetPassword () {
    return await this.execute<BaseApiRawResponseType>({
      endpoint: `${this.baseUrl}/reset-password`,
      method: SERVER_METHODS.POST
    });
  }
}

export default AuthApi;