import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'dist/esm/index.js',
  output: [
    {
      file: 'dist/plugin.js',
      format: 'iife',
      name: 'Capacitor3KakaoLogin',
      globals: {
        '@capacitor/core': 'capacitorExports',
        'dist/esm/assets/kakao.js': 'self',
      },
      context: 'null',
      sourcemap: true,
      inlineDynamicImports: true,
    },
    {
      file: 'dist/plugin.cjs.js',
      format: 'cjs',
      sourcemap: true,
      inlineDynamicImports: true,
    },
  ],
  plugins: [
    commonjs({
      namedExports: {
        'dist/esm/assets/kakao.js': ['init'],
      },
    }),
  ],
  external: ['@capacitor/core'],
};
