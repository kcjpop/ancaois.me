const path = require('path')
const Metalsmith = require('metalsmith')
const asset = require('metalsmith-static')
const dates = require('metalsmith-date-formatter')
const layouts = require('metalsmith-layouts')
const markdown = require('metalsmith-markdown')
const permalinks = require('metalsmith-permalinks')
const collections = require('metalsmith-collections')

const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = Metalsmith(__dirname)
  .source(path.resolve(__dirname, 'src/content'))
  .destination(OUTPUT_PATH)
  .use(asset({
    src: './src/assets',
    dest: '.'
  }))
  .use(collections({
    lastArticles: {
      pattern: 'posts/*.md',
      sortBy: 'date',
      refer: false,
      reverse: true
    }
  }))
  .use(markdown({ langPrefix: 'language-' }))
  .use(permalinks({
    pattern: ':language/:slug'
  }))
  .use(dates({
    dates: [
      { key: 'date', format: 'DD/MM/YYYY' }
    ]
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: path.resolve(__dirname, 'src/layouts'),
    partials: path.resolve(__dirname, 'src/layouts/el')
  }))
