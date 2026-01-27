export interface UserSliceIntialStateType {
  user: {
    authenticated: boolean;
    email: string;
    firstName: string | null;
    lastName: string | null;
    emailVerified: boolean;
    profileCreated: boolean;
  } | null;
}