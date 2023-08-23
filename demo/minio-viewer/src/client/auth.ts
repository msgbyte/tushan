import { AuthProvider, createAuthProvider } from 'tushan';

export const authProvider: AuthProvider = createAuthProvider({
  loginUrl: '/api/login',
});
