import { User } from './user.model';

export interface AuthResponse {
  authenticated: boolean;
  user: User | null;
} 