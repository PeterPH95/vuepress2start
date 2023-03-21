// 导航栏配置
export default [
  { text: '首页', link: '/' },
  { text: '导航', link: '/Guide.md' },
  { text: '性能优化', children: [
    {text: '浏览器', link: '/performance/browser.md'}
  ] },
  { text: '算法', children: [
    {text: '算法', link: '/algorithm/algorithm.md'},
    {text: 'JS手写', link: '/algorithm/JS.md'}
  ] },
  { text: '前端', children: [
      { text: '基础', children: [
          { text: 'JavaScript', link: '/guide/JavaScript.md' },
          { text: 'CSS', link: '/guide/css.md' },
          { text: 'TypeScript', link: '/guide/TypeScript.md' },
          { text: 'Vue2', link: '/guide/vue.md' },
          { text: 'Vue3', link: '/guide/vue3.md' },
          { text: 'Vue3视频笔记', link: '/guide/vue3_guigu.md' },
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
  { text: '基础', children: [
      { text: '必备', children: [
          { text: 'Git', link: '/tools/git.md' },
          { text: 'Npm', link: '/tools/npm.md' },
          { text: 'RegExp', link: '/tools/regExp.md' }
        ]
      },
      { text: '数据库', children: [
          { text: 'SQL', link: '/tools/sql.md' }
        ]
      },
      { text: '计算机基础', children: [
          { text: 'More', link: '/tools/more.md' }
        ]
      }
    ],
  },
  { text: '更多🎉', link: '/news/' },
  { text: 'Github', link: 'https://github.com/PeterPH95/vuepress2start' },
]