const proxy = require('http-proxy-middleware');
module.exports = {
 
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        clientLogLevel: 'debug',//使用内联模式时，DevTools中的控制台将显示消息，例如在重新加载之前，错误之前或启用热模块更换时。默认为info
        proxy: {
            '/apis':{
               target:'http://localhost:8103',
               changeOrigin:true,
               logLevel: 'debug',
               pathRewrite:{
                   '^/apis':'/'
               }
            }
        }
        //clientLogLevel:'silent' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'none' | 'warning',//使用内联模式时，DevTools中的控制台将显示消息，例如在重新加载之前，错误之前或启用热模块更换时。默认为info
        // proxy: {
        //     '/api':{
        //         target:'http://jsonplaceholder.typicode.com',
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '/api':''
        //         }
        //     }
        // }
    }
}