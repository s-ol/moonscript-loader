moonscript-loader
=================
`moonscript-loader` is a webpack4 loader for compiling [MoonScript][moonscript] to [Lua][lua].
It is intended to be used with [fengari.io][fengari]/[fengari-loader][fengari-loader] (but if you find another way to run Lua go ahead).

## Example Setup

This is just an example setup - webpack is very flexible.
Don't assume any of these extra dependencies are necessary.

install dependencies:

    touch package.json && npm i --save-dev webpack webpack-dev-server fengari-loader fengari-web moonscript-loader html-webpack-plugin

set up your webpack config (`webpack.config.js`):

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './toast.moon',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.moon$/,
        use: [
          'fengari-loader',
          'moonscript-loader',
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
}
```

write some Moonscript (`toast.moon`):
```moonscript
window = js.global

y = (x) -> x * 2
window.console\log y 14
```

run everything and visit http://localhost:8080 :)

    node_modules/.bin/webpack-dev-server -w

[moonscript]: https://moonscript.org/
[lua]: https://www.lua.org/
[fengari]: https://fengari.io/
[fengari-loader]: https://github.com/fengari-lua/fengari-loader
