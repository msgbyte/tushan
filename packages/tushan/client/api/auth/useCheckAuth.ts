import { useLogout } from './useLogout';
import { useTushanContext } from '../../context/tushan';
import { Message } from '@arco-design/web-react';
import { defaultAuthParams } from './const';
import { useUserStore } from '../../store/user';
import { useEvent } from '../../hooks/useEvent';

export const useCheckAuth = (): CheckAuth => {
  const { authProvider } = useTushanContext();
  const logout = useLogout();
  const loginUrl = defaultAuthParams.loginUrl;

  const checkAuth = useEvent(
    (params: any = {}, logoutOnFailure = true, redirectTo = loginUrl) =>
      authProvider!
        .checkAuth(params)
        .then(() => {
          authProvider!.getIdentity?.().then((userIdentity) => {
            useUserStore.setState({
              userIdentity,
              isLogin: true,
            });
          });
        })
        .catch((error) => {
          if (logoutOnFailure) {
            logout(
              {},
              error && error.redirectTo != null ? error.redirectTo : redirectTo
            );

            Message.error('Please login to continue');
          }

          throw error;
        })
  );

  return authProvider ? checkAuth : checkAuthWithoutAuthProvider;
};

const checkAuthWithoutAuthProvider = () => Promise.resolve();

/**
 * Check if the current user is authenticated by calling authProvider.checkAuth().
 * Logs the user out on failure.
 *
 * @param {Object} params The parameters to pass to the authProvider
 * @param {boolean} logoutOnFailure Whether the user should be logged out if the authProvider fails to authenticate them. True by default.
 * @param {string} redirectTo The login form url. Defaults to '/login'
 * @param {boolean} disableNotification Avoid showing a notification after the user is logged out. false by default.
 *
 * @return {Promise} Resolved to the authProvider response if the user passes the check, or rejected with an error otherwise
 */
export type CheckAuth = (
  params?: any,
  logoutOnFailure?: boolean,
  redirectTo?: string
) => Promise<any>;
