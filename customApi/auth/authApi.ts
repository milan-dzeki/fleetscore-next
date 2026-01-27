import type { ApiParamsType, BaseApiRawResponseType, BaseApiResponseType } from '@/types/customApi/baseApi';
import BaseApi from '../baseApi';
import SERVER_METHODS from '@/configs/server/methods';
import { emailPattern } from '@/utils/inputValidators';
import { SIGNUP_RULES } from '@/configs/forms/validations/signup';
import { cookies } from 'next/headers';
import COOKIE_NAMES from '@/configs/server/auth/cookieNames';
import { LoginApiResponseType } from '@/types/customApi/authApi';
import { ProfileApiResponseType } from '@/types/customApi/profileApi';
import ROUTE_PATHS from '@/configs/routePaths';

const FIELD_ERRORS = {
  'en': 'Invalid fields',
  'sr-RS': 'Uneseni podaci su nevalidni'
};

class AuthApi extends BaseApi {
  private baseUrl: string;
  private cookieValue: string | null;

  constructor (params: ApiParamsType) {
    super(params);

    this.baseUrl = `${process.env.API_BASE_URL}/auth`;
    this.cookieValue = null;
  }

  private validators = {
    signup: (): this => {
      if (!this.formData) {
        this.fieldsError = FIELD_ERRORS[this.locale as keyof typeof FIELD_ERRORS];
        return this;
      }
      const email = this.formData.get('email')?.toString().trim();
      const password = this.formData.get('password')?.toString();
      const passwordConfirm = this.formData.get('passwordConfirm')?.toString();

      if (
        !email ||
        !emailPattern.test(email) ||
        !password ||
        password.length < SIGNUP_RULES.password.minLength ||
        password.length > SIGNUP_RULES.password.maxLength ||
        !passwordConfirm ||
        passwordConfirm !== password
      ) {
        this.fieldsError = FIELD_ERRORS[this.locale as keyof typeof FIELD_ERRORS];
        return this;
      }

      this.cookieValue = email;

      return this;
    },
    login: (): this => {
      if (!this.formData) {
        this.fieldsError = FIELD_ERRORS[this.locale as keyof typeof FIELD_ERRORS];
        return this;
      }

      const email = this.formData.get('email')?.toString().trim();
      const password = this.formData.get('password')?.toString();

      if (
        !email ||
        !emailPattern.test(email) ||
        !password
      ) {
        this.fieldsError = FIELD_ERRORS[this.locale as keyof typeof FIELD_ERRORS];
        return this;
      }

      return this;
    }
  };

  private cookieSetters = {
    setPendingVerifyEmail: () => {
      if (!this.cookieValue) {
        return;
      }

      const cookieStore = this.cookieStore || cookies();
      cookieStore.set(COOKIE_NAMES.VERIFY_EMAIL_PENDING, this.cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 1000,
        path: '/'
      });
    },
    setAccessToken: (accessToken: string, expiresAt: string) => {
      const cookieStore = this.cookieStore || cookies();

      cookieStore.set({
        name: COOKIE_NAMES.ACCESS_TOKEN,
        value: accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: new Date(expiresAt)
      });
    }
  };

  validateFields(api: string): this {
    this.validators[api as keyof typeof this.validators]();
    return this;
  }

  async signup (params: {
    defaultErrorMsg: string;
  }): Promise<BaseApiRawResponseType> {
    const { defaultErrorMsg } = params;
    if (this.fieldsError) {
      return {
        success: false,
        message: this.fieldsError
      };
    }
    return await this.execute({
      endpoint: `${this.baseUrl}/register`,
      method: SERVER_METHODS.POST,
      defaultErrorMsg,
      setCookies: this.cookieSetters.setPendingVerifyEmail
    });
  }

  async login (params: {
    defaultErrorMsg: string;
  }): Promise<BaseApiResponseType<{ accessToken: string; }>> {
    const { defaultErrorMsg } = params;
    if (this.fieldsError) {
      return {
        success: false,
        message: this.fieldsError
      };
    }
    const response = await this.execute<LoginApiResponseType>({
      endpoint: `${this.baseUrl}/login`,
      method: SERVER_METHODS.POST,
      defaultErrorMsg
    });

    if (!response.success) {
      return response;
    }

    this.cookieSetters.setAccessToken(
      response.data.accessToken,
      response.data.expiresAt
    );

    return {
      success: response.success,
      message: response.message,
      data: {
        accessToken: response.data.accessToken
      }
    };
  }

  async getProfile (params: {
    defaultErrorMsg: string;
  }): Promise<BaseApiResponseType<ProfileApiResponseType>> {
    const { defaultErrorMsg } = params;
    const response = await this.execute<ProfileApiResponseType>({
      endpoint: `${this.baseUrl}/me`,
      method: SERVER_METHODS.GET,
      defaultErrorMsg
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

  async resendVerificationEmail (params: {
    defaultErrorMsg: string;
  }) {
    const { defaultErrorMsg } = params;
    return await this.execute({
      endpoint: `${this.baseUrl}/resend-verification`,
      method: SERVER_METHODS.POST,
      defaultErrorMsg
    });
  }
}

export default AuthApi;