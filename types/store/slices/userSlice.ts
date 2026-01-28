export interface UserSliceIntialStateType {
  data: {
    authenticated: boolean;
    email: string;
    firstName: string | null;
    lastName: string | null;
    emailVerified: boolean;
    profileCreated: boolean;
  } | null;
}