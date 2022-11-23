// 导航栏配置
export default [
  { text: 'Home', link: '/' },
  { text: 'About', link: '/about' },
  { text: 'Algorithm', link: '/algorithm/' },
  { text: 'Guide', children: [
      { text: '基础', children: [
          { text: 'JavaScript', link: '/guide/JavaScript.md' },
          { text: 'CSS', link: '/guide/css.md' },
          { text: 'TypeScript', link: '/guide/TypeScript.md' },
          { text: 'Vue2', link: '/guide/vue.md' },
          { text: 'Vue3', link: '/guide/vue3.md' },
        ]
      },
      { text: '扩展', children: [
          { text: 'VuePress', link: '/guide/VuePress.md' },
          { text: 'Deploy', link: '/guide/deploy.md' },
          { text: 'Webpack', link: '/guide/webpackTS.md' },
        ]
      }
    ]
  },
  { text: 'Tool', children: [
      { text: '必备', children: [
          { text: 'Git', link: '/tools/git.md' },
          { text: 'Npm', link: '/tools/npm.md' },
          { text: 'RegExp', link: '/tools/regExp.md' }
        ]
      },
      { text: '数据库', children: [
          { text: 'SQL', link: '/tools/sql.md' }
        ]
      }
    ],
  },
  { text: 'More🎉', link: '/news/' },
  { text: 'Github', link: 'https://github.com/PeterPH95/vuepress2start' },
]