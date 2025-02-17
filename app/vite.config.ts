import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
      proxy: {
        [env.VITE_API_URI]: {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  });
};
