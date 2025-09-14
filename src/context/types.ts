
export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  signup: (name: string, email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
 errors: string[];
}
export interface UserErrors {
  username?: string;
  email?: string;
  password?: string;
}