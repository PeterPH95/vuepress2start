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
	// PWA 莫名其妙好了？？要设置为 true
	pwaPlugin({ skipWaiting: false }),
	pwaPopupPlugin({
		locales: {
			'/': {
				message: '有新东西！',
				buttonText: '刷新',
			}
		},
	})
]