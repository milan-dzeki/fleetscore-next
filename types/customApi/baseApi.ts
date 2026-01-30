export interface ApiHeadersType {
  [name: string]: string;
}

export type ApiRequestBodyType = { [field: string]: string } | null;

export interface ApiParamsType {
  locale: string;
  requestBody?:ApiRequestBodyType;
  returnRawHeaders?: boolean;
}

export interface SignupResponseType {
  email: string;
}

export interface RefreshTokenResponseType {
  accessToken: string;
  expiresAt: string;
}

export interface BaseApiRawResponseType {
  success: boolean;
  statusCode: number;
  message: string;
  redirectUrl?: string;
  rawHeaders?: Headers;
}

export interface BaseApiResponseErrorType {
  success: false;
  message: string;
  statusCode: number;
  redirectUrl?: string;
}

export interface BaseApiResponseSuccessType<D = null> {
  success: true;
  statusCode: number;
  message: string;
  data: D;
  redirectUrl?: string;
  rawHeaders?: Headers;
}

export type BaseApiResponseType<D = null> = BaseApiResponseErrorType | BaseApiResponseSuccessType<D>;