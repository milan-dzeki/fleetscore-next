export interface ServerResponseStateType<D> {
  loading: boolean;
  error: string | null;
  success: boolean | null;
  data: D | null;
  message: string | null;
}