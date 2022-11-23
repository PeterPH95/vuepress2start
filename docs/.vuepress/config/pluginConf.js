// 插件配置
import { searchPlugin } from '@vuepress/plugin-search'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'

export default [
	// 搜索插件
	searchPlugin({
		locales: {
			'/': {
			  placeholder: '搜索',
			}
		},
	}),
	// PWA
	pwaPlugin({ skipWaiting: true }),
	pwaPopupPlugin({
		locales: {
			'/': {
				message: '有新东西！',
				buttonText: '刷新',
			}
		},
	})
]