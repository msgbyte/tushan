import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { Plugin, normalizePath } from 'vite';
import os from 'os';

export interface ManifestPluginConfig {
  omitInputs?: string[];
  manifestName?: string;
}

export interface PluginManifest {
  url: string;
  inputs: {
    [key: string]: string;
  };
}

const MANIFEST_NAME = 'manifest.dev';

const createSimplifyPath = (root: string, base: string) => (path: string) => {
  path = normalizePath(path);

  if (root !== '/' && path.startsWith(root)) {
    path = path.slice(root.length);
  }

  if (path.startsWith(base)) {
    path = path.slice(base.length);
  }

  if (path[0] === '/') {
    path = path.slice(1);
  }

  return path;
};

export const devManifestPlugin = ({
  omitInputs = [],
  manifestName = MANIFEST_NAME,
}: ManifestPluginConfig = {}): Plugin => ({
  name: 'dev-manifest',

  configureServer(server) {
    const { config, httpServer } = server;

    if (!config.env.DEV || !config.build.manifest) {
      return;
    }

    httpServer?.once('listening', () => {
      const { root: _root, base } = config;
      const root = normalizePath(_root);
      const protocol = config.server.https ? 'https' : 'http';
      const host = resolveHost(config.server.host);
      const port = config.server.port;
      const url = `${protocol}://${host}:${port}${base}`;
      const manifest: PluginManifest = {
        url,
        inputs: {},
      };
      const inputOptions = config.build.rollupOptions?.input ?? {};
      const simplifyPath = createSimplifyPath(root, base);

      config.server.origin = `${protocol}://${host}:${port}`;

      if (typeof inputOptions === 'string') {
        manifest.inputs['main'] = simplifyPath(inputOptions);
      } else if (Array.isArray(inputOptions)) {
        for (const name of inputOptions) {
          if (omitInputs.includes(name)) continue;

          manifest.inputs[name] = simplifyPath(name);
        }
      } else {
        for (const [name, path] of Object.entries(inputOptions)) {
          if (omitInputs.includes(name)) continue;

          manifest.inputs[name] = simplifyPath(path);
        }
      }

      const outputDir = path.resolve(config.root, config.build.outDir);
      mkdirSync(outputDir, { recursive: true });
      writeFileSync(
        path.resolve(outputDir, `${manifestName}.json`),
        JSON.stringify(manifest, null, '\t')
      );
    });
  },
});

/**
 * Resolve host if is passed as `true`
 *
 * Copied from https://github.com/vitejs/vite/blob/d4dcdd1ffaea79ecf8a9fc78cdbe311f0d801fb5/packages/vite/src/node/logger.ts#L197
 */
export function resolveHost(host?: string | boolean): string {
  if (!host) return 'localhost';

  if (host === true) {
    const nInterface = Object.values(os.networkInterfaces())
      .flatMap((nInterface) => nInterface ?? [])
      .filter(
        (detail) =>
          detail &&
          detail.address &&
          // Node < v18
          ((typeof detail.family === 'string' && detail.family === 'IPv4') ||
            // Node >= v18
            (typeof detail.family === 'number' && detail.family === 4))
      )
      .filter((detail) => {
        return detail.address !== '127.0.0.1';
      })[0];

    if (!nInterface) return 'localhost';

    return nInterface.address;
  }

  return host;
}
