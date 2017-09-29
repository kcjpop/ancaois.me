const watch = require('metalsmith-watch')
const serve = require('metalsmith-serve')

require('./src')
  .use(watch({
    paths: {
      'src/**/*': '**/*'
    }
  }))
  .use(serve({ port: 8081 }))
  .build(err => {
    if (err) throw err
  })
