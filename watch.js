var watch = require('metalsmith-watch')
var serve = require('metalsmith-serve')

require('./src')
  .use(watch({
    paths: {
      '${source}/**/*': true,
      'layouts/**/*': '**/*'
    }
  }))
  .use(serve({
    port: 8081
  }))
  .build(function (err) {
    if (err) throw err
  })
