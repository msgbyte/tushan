import { Client as MinioClient } from 'minio';

const minioUrl = process.env.MINIO_URL;
const user = process.env.MINIO_USER;
const pass = process.env.MINIO_PASS;
const pathStyle =
  process.env.MINIO_PATH_STYLE === 'VirtualHosted' ? false : true;

if (!minioUrl) {
  throw new Error('Mark sure MINIO_URL has been set');
}

const [endPoint, port] = minioUrl.split(':');

export const minioClient = new MinioClient({
  endPoint,
  port: Number(port),
  useSSL: false,
  accessKey: user,
  secretKey: pass,
  pathStyle: pathStyle,
});
