export interface ProfileApiResponseType {
  userId: number;
  authenticated: boolean;
  email: string;
  firstName: string | null;
  lastName: string | null;
  emailVerified: boolean;
  profileCreated: boolean;
}