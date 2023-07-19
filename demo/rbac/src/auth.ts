import { AuthProvider } from 'tushan';

export const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    if (username !== 'tushan' || password !== 'tushan') {
      return Promise.reject();
    }

    localStorage.setItem('username', username);
    localStorage.setItem('permissions', JSON.stringify(['admin', 'user']));
    return Promise.resolve();
  },
  logout: () => {
    localStorage.removeItem('username');
    localStorage.removeItem('permissions');
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('username');
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  getIdentity: () =>
    Promise.resolve({
      id: 'user',
      fullName: 'John Doe',
    }),
  getPermissions: () => {
    const raw = localStorage.getItem('permissions');

    if (!raw) {
      return Promise.reject();
    }

    return JSON.parse(raw);
  },
};
