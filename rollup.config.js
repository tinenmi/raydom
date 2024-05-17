let typescript = require('@rollup/plugin-typescript')
let { uglify } = require('rollup-plugin-uglify')

let isProduction = process.env.NODE_ENV !== 'development'

module.exports = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'iife',
    name: 'raydom',
  },
  plugins: [
    typescript(),
    !isProduction ? uglify({
      compress: {
        pure_funcs: [ 'console.log' ]
      },
      output: {
        comments: (node, comment) => {
          return comment.line === 1
        }
      }
    }) : {},
  ],
}
