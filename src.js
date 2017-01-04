var path = require('path')
var Metalsmith = require('metalsmith')
var asset = require('metalsmith-static')
var dates = require('metalsmith-date-formatter')
var layouts = require('metalsmith-layouts')
var markdown = require('metalsmith-markdown')
var permalinks = require('metalsmith-permalinks')
var collections = require('metalsmith-collections')
var stylus = require('metalsmith-stylus')

var OUTPUT_PATH = '_site'

module.exports = Metalsmith(__dirname)
  .source('src')
  .destination(OUTPUT_PATH)
  // Custom langPrefix option needed as markdown uses 'lang-' by default:
  .use(asset({
    src: 'assets',
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
      {key: 'date', format: 'DD/MM/YYYY'}
    ]
  }))
  .use(layouts({
    engine: 'handlebars',
    partials: 'layouts/el'
  }))
  .use(stylus({
    filename: path.join(__dirname, 'src/styles/index.styl')
  }))
