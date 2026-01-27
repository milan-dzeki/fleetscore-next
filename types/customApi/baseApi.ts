import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export interface ApiHeadersType {
  [name: string]: string;
}

export interface ApiParamsType {
  formData?: FormData | null;
  locale: string;
  cookieStore?: ReadonlyRequestCookies | null;
  customBody?: { [field: string]: string } | null;
}

export interface BaseApiRawResponseType {
  success: boolean;
  message: string;
  redirectUrl?: string;
}

export interface BaseApiResponseErrorType {
  success: false;
  message: string;
  redirectUrl?: string;
}

export interface BaseApiResponseSuccessType<D = null> {
  success: true;
  message: string;
  redirectUrl?: string;
  data: D;
}

export type BaseApiResponseType<D = null> = BaseApiResponseErrorType | BaseApiResponseSuccessType<D>;