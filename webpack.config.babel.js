import glob from 'glob';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';

//──────────────────────────────────────────────────────────────────────────────
// Functions
//──────────────────────────────────────────────────────────────────────────────
const dict = arr => Object.assign(...arr.map(([k, v]) => ({ [k]: v })));
// const toStr = v => JSON.stringify(v, null, 4);

//──────────────────────────────────────────────────────────────────────────────
// Constants
//──────────────────────────────────────────────────────────────────────────────
const CONTEXT = path.resolve(__dirname, 'src');

const FILES = glob.sync('src/**/*.es');
// console.log(`FILES:${toStr(FILES)}`); //process.exit();

const LIB_ENTRY = dict(FILES.map(k => [
	k.replace(`src/`, '').replace(/\.[^.]*$/, ''), // name
	`.${k.replace('src', '')}` // source relative to context
]));
// console.log(`LIB_ENTRY:${toStr(LIB_ENTRY)}`); process.exit();

const ENTRY = './index';

const MODULE = {
  rules: [{
    test: /\.es$/,
    use: [{
      loader: 'babel-loader',
      options: {
        babelrc: false, // The .babelrc file should only be used to transpile config files.
        comments: false,
        compact: false,
        minified: false,
        plugins: [
          'array-includes',
          '@babel/plugin-proposal-export-default-from',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-transform-object-assign'
        ],
        presets: [['@babel/preset-env',{
          useBuiltIns: false // false means polyfill not required runtime
        }]]
      } // options
    }] // use
  }] // rules
};

const RESOLVE = {
  extensions: ['.es', '.js']
};

const DIST_DIR = path.join(__dirname, 'dist');
const LIB_DIR = path.join(__dirname, 'lib');

//──────────────────────────────────────────────────────────────────────────────
// Default export
//──────────────────────────────────────────────────────────────────────────────
export default [{
  context: CONTEXT,
  entry: LIB_ENTRY,
  mode: 'production',
  module: MODULE,
  output: {
    path: LIB_DIR,
    filename: '[name].js'
  },
  plugins: [
    new CleanWebpackPlugin(LIB_DIR, {
      verbose: true
    })
  ],
  resolve: RESOLVE
}, {
  context: CONTEXT,
  entry: ENTRY,
  mode: 'production',
  module: MODULE,
  output: {
    path: DIST_DIR,
    filename: 'index.js'
  },
  plugins: [
    new CleanWebpackPlugin(DIST_DIR, {
      verbose: true
    })
  ],
  resolve: RESOLVE
}];
