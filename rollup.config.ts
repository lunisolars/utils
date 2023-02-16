import { defineConfig } from 'rollup'
import del from 'rollup-plugin-delete'
import ts from 'rollup-plugin-typescript2'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'
import fs from 'fs'

const pkg = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf8' }))

const input = 'src/index.ts'
const rollupConfig = [
  defineConfig({
    input,
    output: [
      {
        format: 'cjs',
        file: pkg.main,
        exports: 'named',
        footer: 'module.exports = Object.assign(exports?.default ?? {}, exports);',
        sourcemap: true
      },
      {
        format: 'es',
        file: pkg.module,
        sourcemap: true
      }
    ],
    plugins: [del({ targets: ['dist/*', 'locale/*'] }), ts(), terser()]
  }),
  defineConfig({
    input,
    output: {
      file: pkg.types,
      format: 'es'
    },
    plugins: [dts()]
  })
]

export default rollupConfig
