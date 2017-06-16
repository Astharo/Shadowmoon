import { resolve } from 'path';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import flow from 'rollup-plugin-flow';
import alias from 'rollup-plugin-alias';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import uglify from 'rollup-plugin-uglify';
// import { minify } from 'uglify-js-harmony';
import postcss from 'rollup-plugin-postcss';
import cssnext from 'postcss-cssnext';
import modules from 'postcss-modules';
import pxtorem from 'postcss-pxtorem';

const pkg = require('./package.json');

const banner = `
  /*!
   * ${pkg.name} v${pkg.version}
   * (c) 2017-Present ${pkg.author}
   * Released under the MIT license.
   */
`;

const cssExportMap = {};
const babelrcOptions = babelrc({
  addModuleOptions: false,
  findRollupPresets: true,
});

const output = {
  comments(node, comment) {
    const { type, value } = comment;
    return type === 'comment2' && value.indexOf(pkg.name) !== -1;
  },
};

const config = {
  entry: 'src/index.js',
  targets: [{
    dest: pkg.main,
    format: 'umd',
    moduleName: 'Shadowmoon',
    sourceMap: true,
    banner,
  }, {
    dest: pkg.module,
    format: 'es',
    sourceMap: true,
    banner,
  }],
  plugins: [
    flow(),
    postcss({
      sourceMap: true,
      plugins: [
        cssnext({
          // https://github.com/ai/browserslist#queries
          browsers: ['Android 2.3', 'Android >= 4', 'Chrome >= 16', 'Firefox >= 31', 'Explorer >= 9', 'iOS >= 7', 'Opera >= 12', 'Safari >= 7.1'],
        }),
        modules({
          getJSON(id, exportToken) {
            cssExportMap[id] = exportToken;
          },
        }),
        pxtorem({
          rootValue: 100,
          propWhiteList: [],
        })
      ],
      getExport(id) {
        return cssExportMap[id];
      }
    }),
    babel(Object.assign(babelrcOptions, {
      runtimeHelpers: true,
      exclude: ["node_modules/**"],
    })),
    alias({
      assets: resolve(__dirname, './src/assets'),
      config: resolve(__dirname, './src/config'),
      types: resolve(__dirname, './src/types'),
      utils: resolve(__dirname, './src/utils'),
      controls: resolve(__dirname, './src/controls'),
      'nagrand': resolve(__dirname, './src/externals'),
    }),
    nodeResolve(),
    commonjs(),
  ],
  external: [...Object.keys(pkg.dependencies), 'react', 'react-dom', 'prop-types'],
};

// if (process.env.MINIFY) {
//   config.plugins.push(uglify({ output }, minify));
// }

export default config;
