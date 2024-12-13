import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/moov_money_api.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    shims: true,
    skipNodeModulesBundle: true
})