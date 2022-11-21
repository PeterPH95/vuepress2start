import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'
// 看板娘 下面引入失败
// import { live2d } from "vuepress-plugin-helper-live2d";

export default defineUserConfig({
  base: '/vuepress2start/',
  lang: 'zh-CN',
  title: '保持热爱',
  description: '我的vuepress@2.0.0的初体验',
  head: [
    ['meta', { name: "author", content: "风满楼" }],
    ['meta', { name: "keywords", content: "vuepress@2.0.0练习，个人博客部署，将火揉成风，热烈而温柔" }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],

  theme: defaultTheme({
    // 配置logo,默认在public下
    logo: '/images/logo.jpg',
    // 配置导航栏
    navbar: [
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
    ],
    // 侧边栏设置
    sidebarDepth: 5,
    // 更新时间戳设置
    lastUpdatedText: '最近更新',
  }),
  /* 插件 */
  plugins: [
    // 搜索插件
    searchPlugin({
      // 配置项
    }),
    // PWA
    pwaPlugin({
      // 配置项
    }),
    pwaPopupPlugin({
      locales: {
        '/': {
          message: '有新东西！',
          buttonText: '刷新',
        }
      },
    }),
    // 看板娘设置
    [ 
      'vuepress-plugin-helper-live2d', {
      // 是否开启控制台日志打印(default: false)
      log: false,
      live2d: {
        // 是否启用(关闭请设置为false)(default: true)
        enable: true,
        // 模型名称(default: hibiki)>>>取值请参考：
        // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
        model: 'hibiki',
        display: {
          position: "right", // 显示位置：left/right(default: 'right')
          width: 203, // 模型的长度(default: 135)
          height: 450, // 模型的高度(default: 300)
          hOffset: 70, //  水平偏移(default: 65)
          vOffset: 70, //  垂直偏移(default: 0)
        },
        mobile: {
          show: false // 是否在移动设备上显示(default: false)
        },
        react: {
          opacity: 0.8 // 模型透明度(default: 0.8)
        }
      }
      }
    ]
  ],
})
