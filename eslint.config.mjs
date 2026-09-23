import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    rules: {
      'no-console': 'error',
      // Preserve the existing hook lint policy during the dependency upgrade.
      'react-hooks/exhaustive-deps': 'off',
    },
  },
]);
