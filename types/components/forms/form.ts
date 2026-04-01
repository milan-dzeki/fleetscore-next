import type { FormType } from '@/types/forms';

export interface ServerResponseStateType<D> {
  loading: boolean;
  error: string | null;
  success: boolean | null;
  data: D | null;
  message: string | null;
}

export type PrepopulateFormFnType = (() => Promise<FormType | {
  error: string;
}> | FormType)