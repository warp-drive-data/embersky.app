import { defineConfig } from 'vite';
import {
  resolver,
  hbs,
  scripts,
  templateTag,
  optimizeDeps,
  compatPrebuild,
  assets,
  contentFor,
} from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';

const extensions = [
  '.mjs',
  '.gjs',
  '.js',
  '.mts',
  '.gts',
  '.ts',
  '.hbs',
  '.json',
];

export default defineConfig(({ mode }) => {
  const embroiderDeps = optimizeDeps();
  embroiderDeps.exclude = embroiderDeps.exclude ?? [];
  embroiderDeps.exclude.push('!data/workers/data-worker*');
  embroiderDeps.exclude.push('!*data/workers/data-worker');

  return {
    resolve: {
      extensions,
    },
    plugins: [
      hbs(),
      templateTag(),
      scripts(),
      resolver(),
      compatPrebuild(),
      assets(),
      contentFor(),

      babel({
        babelHelpers: 'runtime',
        extensions,
      }),
    ],
    optimizeDeps: embroiderDeps,
    server: {
      port: 4200,
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: 'index.html',
          ...(shouldBuildTests(mode)
            ? { tests: 'tests/index.html' }
            : undefined),
        },
      },
    },
  };
});

function shouldBuildTests(mode) {
  return mode !== 'production' || process.env.FORCE_BUILD_TESTS;
}
