import express from 'express';
import ViteExpress from 'vite-express';

const app = express();

const port = Number(process.env.PORT || 3000);

app.get('/hello', (_, res) => {
  res.send('Hello Vite + React + TypeScript!');
});

if (process.env.NODE_ENV === 'production') {
  ViteExpress.config({
    mode: 'production',
  });
}

ViteExpress.listen(app, port, () =>
  console.log(
    `Server is listening on port ${port}, visit with: http://localhost:${port}`
  )
);
