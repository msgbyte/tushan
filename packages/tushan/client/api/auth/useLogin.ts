import { Message } from '@arco-design/web-react';
import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTushanContext } from '../../context/tushan';
import { useUserStore } from '../../store/user';
import { createSelector } from '../../utils/createSelector';
import { defaultAuthParams } from './const';

const useLogin = (): Login => {
  const { authProvider } = useTushanContext();
  const location = useLocation();
  const locationState = location.state as any;
  const navigate = useNavigate();
  const nextPathName = locationState && locationState.nextPathname;
  const nextSearch = locationState && locationState.nextSearch;
  const afterLoginUrl = defaultAuthParams.afterLoginUrl;
  const { setIsLogin } = useUserStore(createSelector('setIsLogin'));

  const login = useCallback(
    (params: any = {}, pathName?: string) =>
      authProvider!.login(params).then((ret: any) => {
        Message.clear();

        if (ret && ret.hasOwnProperty('redirectTo')) {
          if (ret) {
            navigate(ret.redirectTo);
          }
        } else {
          const redirectUrl = pathName
            ? pathName
            : nextPathName + nextSearch || afterLoginUrl;
          navigate(redirectUrl);
        }

        setIsLogin(true);

        return ret;
      }),
    [authProvider, navigate, nextPathName, nextSearch, afterLoginUrl]
  );

  const loginWithoutProvider = useCallback(() => {
    Message.clear();
    navigate(afterLoginUrl);
    return Promise.resolve();
  }, [navigate, afterLoginUrl]);

  return authProvider ? login : loginWithoutProvider;
};

/**
 * Log a user in by calling the authProvider.login() method
 *
 * @param {Object} params Login parameters to pass to the authProvider. May contain username/email, password, etc
 * @param {string} pathName The path to redirect to after login. By default, redirects to the home page, or to the last page visited after disconnection.
 *
 * @return {Promise} The authProvider response
 */
type Login = (params: any, pathName?: string) => Promise<any>;

export default useLogin;
