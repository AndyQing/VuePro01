const path = require('path')
//导入在内存中生成HTML页面的插件
//只要是插件，一定要放到plugins节点中去
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: path.join(__dirname, './src/main.js'),//入口
    output: {//出口
        //输出文件的相关配置
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        /*
            1. 自动在内存中根据指定页面生成一个内存的页面
            2. 自动把打包好的bundle.js 追加到页面中去
        */
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),  //指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
            filename: 'index.html'   //指定生成页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //配置.css文件的第三方loader规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, //配置处理.less文件的第三方loader规则 
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=13958&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader
            // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串;
            //如果 图片小于给定的 limit 值，则会被转为 base64的字符串
            // 不添加name=，则默认把引用图片名改成hash值（32位）。name=[name].[ext]代表之前叫什么名，现在就叫什么名//[ext]代表文件后缀名。
            // 不建议用原来名称，因为图片相当于放在了根路径，不同文件夹下的相同文件名，会有冲突。[hash:8]代表截取hash值的前8位
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader   
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法  
            { test: /\.vue$/, use: 'vue-loader'},
        ]
    },
    resolve: {
        alias: {//修改vue被导入时候的包的路径
            'vue$': 'vue/dist/vue.js'
        }
    }
}