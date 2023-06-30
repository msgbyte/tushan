import cloud from '@lafjs/cloud';
import type { FunctionContext } from '@lafjs/cloud';
import jwt from 'jsonwebtoken';
import qs from 'qs';
import {
  convertId,
  transToLafOrder,
  transToMongoId,
  virtualId,
} from './utils/common';
import { buildListFilter } from './utils/buildListFilter';
import type { TushanLiteConfig } from './types';

const db = cloud.database();

interface TushanJsonServerOptions {
  auth: {
    username: string;
    password: string;
    secret: string;
  };
  maxRows?: number;
  config: Partial<TushanLiteConfig>;
}

/**
 * Create Tushan Server in Laf context
 *
 * @example
 * __interceptor__
 *
 * import { createTushanJsonServerInterceptor } from 'tushan-laf-json-server'
 *
 * export default async function (ctx: FunctionContext) {
 *   try {
 *     return await createTushanJsonServerInterceptor(ctx as any, {
 *       auth: {
 *         username: 'your-username',
 *         password: "your-password",
 *         secret: "your-secret"
 *       },
 *       config: {
 *         resources: [
 *           {
 *             name: "test",
 *             fields: [
 *               {
 *                 name: "id",
 *                 type: "text"
 *               },
 *               {
 *                 name: "content",
 *                 type: "text",
 *               }
 *             ],
 *             action: {
 *               create: true,
 *               edit: true,
 *               delete: true
 *             }
 *           }
 *         ]
 *       }
 *     });
 *   } catch (err) {
 *     console.error(err)
 *   } finally {
 *     return true;
 *   }
 * }
 */
export async function createTushanJsonServerInterceptor(
  ctx: FunctionContext,
  options: TushanJsonServerOptions
) {
  const url = ctx.request?.url ?? '';

  if (!url.startsWith('/tushan')) {
    return true;
  }

  const path = url.replace('/tushan', '');

  if (path === '' || path === '/') {
    const host =
      (ctx.headers?.['x-forwarded-proto'] ?? 'https') +
      '://' +
      (ctx.headers?.['x-forwarded-host'] ?? ctx.headers?.['host']);

    ctx.response?.json({
      authProvider: {
        loginUrl: host + '/tushan/login',
      },
      dataProvider: {
        url: host + '/tushan',
      },
      ...options.config,
    });
    return false;
  }

  if (path === '/login') {
    // login
    login(ctx, options);
    return false;
  }

  // check token
  if (!checkTokenValid(ctx, options)) {
    // not pass
    return false;
  }

  const args = path.split('?')[0].split('/');
  const search = qs.parse(path.split('?')[1] ?? '');
  const body = ctx.body;
  const method = ctx.method;

  if (method === 'GET') {
    const [, model, id] = args;
    if (!id) {
      // list
      const filter = buildListFilter(search);
      const maxRows = options.maxRows ?? 100;

      let query = db.collection(model).where(filter);

      if (search._sort && search._order) {
        query = query.orderBy(
          transToMongoId(search._sort),
          transToLafOrder(search._order)
        );
      }

      if (search._start) {
        query = query.skip(
          parseInt(typeof search._start === 'string' ? search._start : '0')
        );
      }

      if (search._end) {
        query = query.limit(
          Math.min(
            parseInt(typeof search._end === 'string' ? search._end : '0') -
              (search._start
                ? parseInt(
                    typeof search._start === 'string' ? search._start : '0'
                  )
                : 0),
            maxRows
          )
        );
      } else {
        query = query.limit(maxRows);
      }

      const { data } = await query.get();
      const total = (await db.collection(model).where(filter).count()).total;
      ctx.response?.setHeader('X-Total-Count', total);
      ctx.response?.json(virtualId(data));
      return false;
    } else {
      // item
      const { data } = await db.collection(model).where({ _id: id }).getOne();

      ctx.response?.json(virtualId(data));
      return false;
    }
  } else if (method === 'POST') {
    // create
    const [, model] = args;
    const newData = convertId(body);
    const { id } = await db.collection(model).add(newData);

    ctx.response?.json({ ...newData, id });
    return false;
  } else if (method === 'PUT') {
    const [, model, id] = args;
    const updatedData = convertId(body);
    await db
      .collection(model)
      .where({
        _id: id,
      })
      .update(
        { ...updatedData },
        {
          merge: true,
        }
      );

    const { data } = await db.collection(model).where({ _id: id }).getOne();
    ctx.response?.json(data);
    return false;
  } else if (method === 'DELETE') {
    const [, model, id] = args;

    await db.collection(model).where({ _id: id }).remove();

    ctx.response?.json({ id });

    return false;
  }

  return false;
}

/**
 * Check Token is valid
 */
function checkTokenValid(
  ctx: FunctionContext,
  options: TushanJsonServerOptions
): boolean {
  const authorization = ctx.request?.headers.authorization;
  if (!authorization) {
    ctx.response?.status(401).end('Not found authorization in headers');
    return false;
  }

  const token = authorization.slice('Bearer '.length);

  const payload = jwt.verify(token, options.auth.secret);
  if (typeof payload === 'string') {
    ctx.response?.status(401).end('payload type error');
    return false;
  }
  if (payload.platform !== 'admin') {
    ctx.response?.status(401).end('Payload invalid');
    return false;
  }

  return true;
}

/**
 * Handle login
 */
function login(ctx: FunctionContext, options: TushanJsonServerOptions) {
  const { username, password } = ctx.body ?? {};

  if (!options.auth.username || !options.auth.password) {
    ctx.response
      ?.status(401)
      .end('Server not set options: auth.username, auth.password');
    return;
  }

  if (
    username === options.auth.username &&
    password === options.auth.password
  ) {
    // 用户名和密码都正确，返回token
    const token = jwt.sign(
      {
        username,
        platform: 'admin',
      },
      options.auth.secret,
      {
        expiresIn: '2h',
      }
    );

    ctx.response?.json({
      username,
      token: token,
      expiredAt: new Date().valueOf() + 2 * 60 * 60 * 1000,
    });
  } else {
    ctx.response?.status(401).end('username or password incorrect');
  }
}
