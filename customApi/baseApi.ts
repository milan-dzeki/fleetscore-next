import SERVER_METHODS from '@/configs/server/methods';
import type {
  ApiHeadersType,
  ApiParamsType
} from '@/types/customApi/baseApi';
import type { BaseApiResponseType } from '@/types/customApi/baseApi';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

abstract class BaseApi {
  private headers: ApiHeadersType | null;
  protected formData: FormData | null;
  private requestBody: string | null;
  protected fieldsError: string | null;
  protected locale: string;
  protected cookieStore: ReadonlyRequestCookies | null;
  private customBody: { [field: string]: string } | null;

  constructor ({
    formData = null,
    locale,
    cookieStore = null,
    customBody = null
  }: ApiParamsType) {
    this.headers = null;
    this.formData = formData;
    this.requestBody = null;
    this.fieldsError = null;
    this.locale = locale;
    this.cookieStore = cookieStore;
    this.customBody = customBody;
  }

  abstract validateFields (api: string): this;

  setHeaders (params: {
    useDefaultHeaders: boolean;
    headers?: ApiHeadersType
  }): this {
    const { useDefaultHeaders, headers } = params;
    if (!useDefaultHeaders && !headers) {
      this.headers = null;

      return this;
    }
    
    this.headers = {
      ...(useDefaultHeaders ? {
        'Content-Type': 'application/json'
      } : {}),
      ...(headers ? headers : {})
    };

    return this;
  }

  setBody (): this {
    if (this.formData) {
      const data: Record<string, unknown> = {};

      const entries = Array.from(this.formData.entries());

      for (const [key, value] of entries) {
        if (typeof value === 'string') {
          data[key] = value.trim();
        } else {
          data[key] = value;
        }
      }

      this.requestBody = JSON.stringify(data);
    } else if (this.customBody) {
      this.requestBody = JSON.stringify(this.customBody);
    } 

    return this;
  }

  protected async execute <D>(params: {
    endpoint: string;
    method: typeof SERVER_METHODS[keyof typeof SERVER_METHODS];
    setCookies?: (() => void) | null;
    defaultErrorMsg: string;
  }): Promise<BaseApiResponseType<D>> {
    const {
      endpoint,
      method,
      setCookies,
      defaultErrorMsg
    } = params;

    try {
      const response = await fetch(endpoint, {
        method,
        ...(this.headers ? {
          headers: this.headers
        } : {}),
        ...(this.requestBody ? {
          body: this.requestBody
        } : {})
      });

      let data;

      try {
        data = await response.json();
      } catch {
        data = { message: defaultErrorMsg };
      }
      console.log('res', response);
      console.log('data', data);
      if (!response.ok) {
        return {
          success: false,
          message: data.message || data.data.message
        };
      }
      
      if (setCookies) {
        setCookies();
      }
      
      return {
        success: true,
        message: data.message || data.data.message,
        data: data.data || data
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Network error'
      };
    }
  }
}

export default BaseApi;