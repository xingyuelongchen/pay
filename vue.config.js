
const config = require('./src/api/config');
// import config from './src/api'
if (process.env.NODE_ENV != 'development') {
    // builder时，更新版本号
    const json = require('./package.json');
    const fs = require('fs');
    let version = json.version.split('.');
    version[version.length - 1] = version[version.length - 1] * 1 + 1;
    json.version = version.join('.');
    fs.writeFileSync('./package.json', JSON.stringify(json, null, 4));
}
module.exports = {
    productionSourceMap: false, // 不生成.map映射文件
    publicPath: config.location.publicPath, // 部署目录
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].minify = false;
            return args;
        });
    },
    devServer: {
        // open: true, //自动弹出浏览器页面
        // host: "192.168.101.102",
        // host: 'localhost',
        // port: config.port,
        // https: true,   //是否使用https协议
        // hotOnly: true, //是否开启热更新
        proxy: {
            "/client": {
                target: config.axios.baseUrlDev,
                ws: true,
                changeOrigin: true
                // pathRewrite: {
                //     '^/api': '/homes'
                // }
            },
            "/statistics/": {
                target: config.axios.baseUrlDev,
                ws: true,
                changeOrigin: true
                // pathRewrite: {
                //     '^/api': '/homes'
                // }
            },
            "/uploads": {
                target: config.axios.baseUrlDev,
                ws: true,
                changeOrigin: true
            },
            "/admin": {
                target: config.axios.baseUrlDev,
                ws: true,
                changeOrigin: true
            },
            "/studyapi": {
                target: 'http://www.guangyizhou.cn',
                ws: true,
                changeOrigin: true
            }
        }
    }
};
