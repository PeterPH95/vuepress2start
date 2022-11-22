// 插件配置
import { searchPlugin } from '@vuepress/plugin-search'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'
// 看板娘 下面引入失败
// const live2d = module.require("vuepress-plugin-helper-live2d")

export default [
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
		'live2d', {
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
					width: 135, // 模型的长度(default: 135)
					height: 300, // 模型的高度(default: 300)
					hOffset: 65, //  水平偏移(default: 65)
					vOffset: 0, //  垂直偏移(default: 0)
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
]