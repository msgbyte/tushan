import type { AuthProvider } from '../types';
import { defaultAuthStorageKey } from './const';

interface CreateAuthProviderOptions {
  /**
   * key which store in localStorage
   *
   * @default "tushan:auth"
   */
  authStorageKey?: string;

  /**
   * Login url
   *
   * @example "/api/login"
   */
  loginUrl: string;
}

export function createAuthProvider(
  options: CreateAuthProviderOptions
): AuthProvider {
  const { authStorageKey = defaultAuthStorageKey, loginUrl } = options;

  const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
      const request = new Request(loginUrl, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
      });

      try {
        const response = await fetch(request);
        const auth = await response.json();
        localStorage.setItem(authStorageKey, JSON.stringify(auth));
      } catch {
        throw new Error('Login Failed');
      }
    },
    logout: () => {
      localStorage.removeItem(authStorageKey);
      return Promise.resolve();
    },
    checkAuth: () => {
      const auth = localStorage.getItem(authStorageKey);
      if (auth) {
        try {
          const obj = JSON.parse(auth);
          if (obj.expiredAt && Date.now() < obj.expiredAt) {
            return Promise.resolve();
          }
        } catch (err) {}
      }

      return Promise.reject();
    },
    checkError: (error) => {
      const status = error.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem(authStorageKey);
        return Promise.reject();
      }

      // other error code (404, 500, etc): no need to log out
      return Promise.resolve();
    },
    getIdentity: () => {
      const { username } = JSON.parse(
        localStorage.getItem(authStorageKey) ?? '{}'
      );
      if (!username) {
        return Promise.reject();
      }

      return Promise.resolve({
        id: username,
        fullName: username,
      });
    },
    getPermissions: () => Promise.resolve(''),
  };

  return authProvider;
}
