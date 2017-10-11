;(function() {
  const { assign, keys } = Object

  function App() {
    const state = {
      loading: true,
      stats: null
    }

    const LEVEL_FACTOR = 0.025
    const calculateLevel = xps => Math.round(Math.floor(LEVEL_FACTOR * Math.sqrt(xps)))

    const transform = stats => {
      const languages = keys(stats.languages).reduce((acc, name) => {
        const item = stats.languages[name]
        return assign({}, acc, {
          [name]: assign({}, item, {
            name,
            level: calculateLevel(item.xps)
          })
        })
      }, {})

      return assign({}, stats, { languages })
    }

    const oninit = _ => {
      m.request({ url: 'https://codestats.net/api/users/kcjpop' }).then(stats => {
        state.loading = false
        state.stats = transform(stats)
      })
    }

    const getTop10 = items =>
      keys(items)
        .map(name => items[name])
        .sort((a, b) => b.level - a.level)
        .filter(item => ['Find Results', 'Plain text'].includes(item.name) === false)
        .slice(0, 10)

    const view = _ => {
      if (state.loading) return 'Loading...'
      const top10 = getTop10(state.stats.languages)

      return [
        m(
          '.flex.items-center',
          m('h1.f2', 'I write'),
          m('a.ml3[href="https://codestats.net/users/kcjpop"][target=_blank]', 'via CodeStats')
        ),
        m(
          'table.w-100',
          top10.map(lang =>
            m(
              'tr',
              m('td.w-30.code.dark-green', lang.name),
              m('td.w-15.code', `+${lang.new_xps}`),
              m('td.w-15.code', `LVL ${lang.level}`),
              m('td.w-15.code', `${lang.xps} XP`)
            )
          )
        )
      ]
    }

    return { view, oninit }
  }
  window.onload = () => {
    const dom = document.getElementById('js-home')
    dom && m.mount(dom, App)
  }
})()
