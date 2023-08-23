import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { adminAuth, auth, authSecret } from '../middleware/auth';
import { minioClient } from '../minio';

const router = Router();

router.post('/login', (req, res) => {
  if (!adminAuth.username || !adminAuth.password) {
    res.status(401).end('Server not set env: ADMIN_USER, ADMIN_PASS');
    return;
  }

  const { username, password } = req.body;

  if (username === adminAuth.username && password === adminAuth.password) {
    // 用户名和密码都正确，返回token
    const token = jwt.sign(
      {
        username,
        platform: 'admin',
      },
      authSecret,
      {
        expiresIn: '2h',
      }
    );

    res.json({
      username,
      token: token,
      expiredAt: new Date().valueOf() + 2 * 60 * 60 * 1000,
    });
  } else {
    res.status(401).end('username or password incorrect');
  }
});

router.get('/buckets', auth(), async (req, res) => {
  const buckets = await minioClient.listBuckets();

  res.header('X-Total-Count', String(buckets.length));

  res.json(buckets);
});

export { router as apiRouter };
