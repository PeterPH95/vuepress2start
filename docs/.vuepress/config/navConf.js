// 导航栏配置
export default [
    { text: 'Home', link: '/' },
    { text: 'About', link: '/about' },
    { text: 'Algorithm', link: '/algorithm/' },
    {
      text: 'Guide',
      children: [
        {
          text: '基础',
          children: [
            { text: 'JavaScript', link: '/guide/JavaScript.md' },
            { text: 'CSS', link: '/guide/css.md' },
            { text: 'TypeScript', link: '/guide/TypeScript.md' },
            { text: 'Vue', link: '/guide/vue.md' },
          ]
        },
        {
          text: '扩展',
          children: [
            { text: 'VuePress', link: '/guide/VuePress.md' },
            { text: 'Deploy', link: '/guide/deploy.md' },
            { text: 'Webpack', link: '/guide/webpackTS.md' },
          ]
        }
      ]
    },
    {
      text: 'Tool',
      // ariaLabel: '指令',
      children: [
        {
          text: '必备',
          children: [
            { text: 'Git', link: '/tools/git.md' },
            { text: 'Npm', link: '/tools/npm.md' },
            { text: 'RegExp', link: '/tools/regExp.md' }
          ]
        },
        // {
        //   text: '扩展', items: []
        // }
      ],
    },
    { text: 'More🎉', link: '/news/' },
    { text: 'Github', link: 'https://github.com/PeterPH95/vuepress2start' },
]