import type Router from '@koa/router';
import koaPassport from 'koa-passport';
import type { Strategy } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

koaPassport.serializeUser(function (user, done) {
  done(null, user);
});

koaPassport.deserializeUser(function (user, done) {
  done(null, user as any);
});

export interface AuthInfo {
  /**
   * 自定义策略
   */
  strategy?: Strategy;

  /**
   * 默认策略
   */
  local?: (username: string, password: string) => Promise<object>;
}

/**
 * 应用校验信息
 */
export function useAuth(router: Router, authInfo: AuthInfo) {
  if (authInfo.strategy) {
    koaPassport.use(authInfo.strategy);
  } else {
    if (!authInfo.local) {
      throw new Error('If not set auth.strategy, auth.local is required!');
    }

    koaPassport.use(
      new LocalStrategy((username, password, done) => {
        authInfo.local!(username, password)
          .then((user) => {
            done(null, user);
          })
          .catch((err) => {
            done(err, null);
          });
      })
    );
  }
  router.use(koaPassport.initialize());
  router.use(koaPassport.session());

  router.post('/api/login', async (ctx, next) => {
    return koaPassport.authenticate(
      authInfo.strategy?.name ?? 'local',
      (err, user) => {
        if (err) {
          console.error(err);
          ctx.body = { success: false, message: String(err) };
          ctx.throw(401);
        } else {
          ctx.body = { success: true, user };
          return ctx.login(user);
        }
      }
    )(ctx, next);
  });

  const loginUrl = (router.opts.prefix ?? '') + '/login';

  router.get('/logout', async (ctx) => {
    if (ctx.isAuthenticated()) {
      ctx.logout();
      ctx.redirect(loginUrl);
    } else {
      ctx.body = { code: 401, message: 'Unauthorized' };
      ctx.throw(401);
    }
  });

  // 鉴权
  router.use((ctx, next) => {
    if (!ctx.isAuthenticated()) {
      if (ctx.accepts('html') === 'html') {
        // 如果是请求html
        if (ctx.url === loginUrl) {
          return next();
        }

        ctx.redirect(loginUrl);
      } else {
        ctx.body = { code: 401, message: 'Unauthorized' };
        ctx.throw(401);
      }
      return;
    }

    return next();
  });
}
