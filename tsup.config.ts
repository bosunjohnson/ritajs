import type { Options } from 'tsup';
import { defineConfig } from 'tsup';
import { esbuildPluginVersionInjector } from 'esbuild-plugin-version-injector';

const opts: Options = {
  name: "rita",
  entry: { rita: 'src/rita.js' },
  outDir: 'dist',
  watch: false,
  clean: true,
  minify: false,
  sourcemap: true,
  dts: false,
  bundle: true,
  target: 'es2020',
  metafile: false, // toggle for stats: https://esbuild.github.io/analyze/
  esbuildPlugins: [esbuildPluginVersionInjector()],
  outExtension({ format }) { return { js: `.js` } },
}

const esm: Options = {
  format: ['esm'],
  ...opts,
}

const cjs: Options = {
  format: ['cjs'],
  ...opts,
  platform: "node",
  cjsInterop: true,
  splitting: true,
  outExtension({ format }) { return { js: `.cjs` } },
}

const iife: Options = {
  format: ['iife'],
  ...opts,
  minify: true,
  platform: "browser",
  globalName: "RiTa",
  outExtension({ format }) { return { js: `.min.js` } },
  footer: { js: "window.RiTa = RiTa.default" }
}

const testEsm: Options = {
  format: ['esm'],
  platform: "node",
  name: "test",
  entry: ['test/[^i]*.js'],
  outDir: 'test/dist',
  watch: false,
  clean: false,
  minify: false,
  sourcemap: false,
  dts: false,
  bundle: false,
}

export default defineConfig([esm, cjs, iife, testEsm]);
