export interface UserSliceIntialStateType {
  loading: boolean;
  error: string | null;
  data: {
    userId: number;
    authenticated: boolean;
    email: string;
    firstName: string | null;
    lastName: string | null;
    emailVerified: boolean;
    profileCreated: boolean;
  } | null;
}