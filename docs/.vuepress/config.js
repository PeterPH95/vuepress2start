import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

import headConfig from "./config/headConf"
import navConfig from "./config/navConf"
import pluginConf from './config/pluginConf'

export default defineUserConfig({
  base: '/vuepress2start/',
  lang: 'zh-CN',
  title: '保持热爱',
  description: '我的vuepress@2.0.0的初体验',
  /* 头部网页配置 */
  head: headConfig,

  theme: defaultTheme({
    // 配置logo,默认在public下
    logo: '/images/logo.jpg',
    /* 配置导航栏 */ 
    navbar: navConfig,
    // 侧边栏设置
    sidebarDepth: 5,
    // 更新时间戳设置
    lastUpdatedText: '最近更新',
  }),

  /* 插件 */
  plugins: pluginConf,
})
