const path = require('path')
const Metalsmith = require('metalsmith')
const asset = require('metalsmith-static')
const layouts = require('metalsmith-layouts')
const collections = require('metalsmith-collections')
const wordcount = require('metalsmith-word-count')
const markdown = require('metalsmith-markdown-remarkable')

const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = Metalsmith(__dirname)
  .source(path.resolve(__dirname, 'src/content'))
  .destination(OUTPUT_PATH)
  .use(
    asset({
      src: './src/assets',
      dest: '.',
    })
  )
  .use(
    collections({
      articles: {
        pattern: 'posts/*.md',
        sortBy: 'date',
        refer: false,
        reverse: true,
      },
    })
  )
  .use(
    markdown('full', {
      html: true,
      breaks: true,
      quotes: '“”‘’',
      langPrefix: 'language-',
      typographer: true,
    })
  )
  .use(wordcount())
  .use(
    layouts({
      engineOptions: {
        path: path.resolve(__dirname, 'layouts'),
      },
    })
  )
  .build(err => {
    if (err) throw err
  })
