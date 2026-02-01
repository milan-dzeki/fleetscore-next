import type {
  ApiHeadersType,
  ApiParamsType,
  ApiRequestBodyType
} from '@/types/customApi/baseApi';
import type { BaseApiResponseType } from '@/types/customApi/baseApi';
import SERVER_METHODS from '@/configs/server/methods';

abstract class BaseApi {
  private headers: ApiHeadersType | null;
  protected locale: string;
  protected requestBody: ApiRequestBodyType;
  protected searchParams: string | null;
  protected fieldsError: string | null;
  private returnRawHeaders: boolean;

  constructor ({
    locale,
    requestBody = null,
    searchParams = null,
    returnRawHeaders = false
  }: ApiParamsType) {
    this.headers = null;
    this.requestBody = null;
    this.searchParams = searchParams;
    this.fieldsError = null;
    this.locale = locale;
    this.requestBody = requestBody;
    this.returnRawHeaders = returnRawHeaders;
  }

  abstract validateFields (api: string): this;

  setHeaders (params: {
    useDefaultHeaders: boolean;
    headers?: ApiHeadersType;
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

  removeReqBodyFieldsAfterValidation (fieldNames: string[]): this {
    if (!this.requestBody) {
      return this;
    }

    const transformedReqBody = { ...this.requestBody };

    for (const field in transformedReqBody) {
      if (fieldNames.includes(field)) {
        delete transformedReqBody[field];
      }
    }

    this.requestBody = transformedReqBody;
    return this;
  }

  protected async execute <D>(params: {
    endpoint: string;
    method: typeof SERVER_METHODS[keyof typeof SERVER_METHODS];
  }): Promise<BaseApiResponseType<D>> {
    const { endpoint, method } = params;

    try {
      const response = await fetch(`${endpoint}${this.searchParams || ''}`, {
        method,
        ...(this.headers ? {
          headers: this.headers
        } : {}),
        ...(method !== SERVER_METHODS.GET && this.requestBody ? {
          body: JSON.stringify(this.requestBody)
        } : {})
      });
      
      let data;

      try {
        data = await response.json();
      } catch {
        data = { message: 'Network error' };
      }

      if (!response.ok) {
        return {
          success: false,
          statusCode: response.status,
          message: data.message || data.data.message
        };
      }

      return {
        success: true,
        statusCode: response.status,
        message: data.message || data.data.message,
        data: data.data || data,
        ...(this.returnRawHeaders ? {
          rawHeaders: response.headers
        } : {})
      };
    } catch (error: unknown) {
      return {
        success: false,
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Network error'
      };
    }
  }
}

export default BaseApi;