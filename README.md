# vue-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Multi-page
多页面配置
https://juejin.im/post/5c0b8d74f265da6115109d68#heading-26
https://juejin.im/post/5dd8a8c2518825731327f748
https://juejin.im/post/5d5b6c4651882503585c9c1a
https://cli.vuejs.org/zh/config/#pages

``` javascript
let path = require('path')
let glob = require('glob')
let mock = require('./src/mock/index.json');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
	let entries = {};
	glob.sync(globPath).forEach(function(entry) {
		var tmp = entry.split('/').splice(-3);
		entries[tmp[1]] = {
			entry: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index.js',
			template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + 'index.html',
			filename: tmp[1] + '.html'
		};
	});
	return entries;
}

let pages = getEntry('./src/pages/**?/*.html');

module.exports = {
	lintOnSave: false, 
	baseUrl: process.env.NODE_ENV === "production" ? 'https://www.baidu.com/' : '/',
	productionSourceMap: false,
	pages,
  before: app => {     
    app.get('/', (req, res, next) => {
      for(let i in pages){    //遍历项目链接
        res.write(`<a target="_self" href="/${i}">/${i}</a></br>`);
      }
      res.end()
    });
  },
	devServer: {
		index: '/', 
		open: process.platform === 'darwin',
		host: '',
		port: 9527,
		https: false,
		hotOnly: false,
		proxy: {
			'/xrf/': {
				target: 'http://reg.tool.hexun.com/',
				changeOrigin: true,
				pathRewrite: {
					'^/xrf': ''
				}
			},
		}, // 设置代理
		before: app => {     
			app.get('/', (req, res, next) => {
				for(let i in pages){
					res.write(`<a target="_self" href="/${i}">/${i}</a></br>`);
				}
				res.end()
			});
			app.get('/goods/list', (req, res, next) => {  //mock数据
				res.status(299).json(mock)
			})
		}
	},
	chainWebpack: config => {
		config.module
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.tap(options => {
				// 修改它的选项...
				options.limit = 100
				return options
			})
		Object.keys(pages).forEach(entryName => {
			config.plugins.delete(`prefetch-${entryName}`);
		});
		if(process.env.NODE_ENV === "production") {
			config.plugin("extract-css").tap(() => [{
				path: path.join(__dirname, "./dist"),
				filename: "css/[name].[contenthash:8].css"
			}]);
		}
	},
	configureWebpack: config => {
		//		if(process.env.NODE_ENV === "production") {
		//			config.output = {
		//				path: path.join(__dirname, "./dist"),
		//				filename: "js/[name].[contenthash:8].js"			
		//			};
		//		}
	}
}

```