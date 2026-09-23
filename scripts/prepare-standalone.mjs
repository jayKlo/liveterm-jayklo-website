import { cp } from 'node:fs/promises';

// Next.js leaves these assets out of its standalone output by default.
// Include them so npm start exercises the same server layout as Docker.
await Promise.all([
  cp(
    new URL('../public', import.meta.url),
    new URL('../.next/standalone/public', import.meta.url),
    { recursive: true },
  ),
  cp(
    new URL('../.next/static', import.meta.url),
    new URL('../.next/standalone/.next/static', import.meta.url),
    { recursive: true },
  ),
]);
