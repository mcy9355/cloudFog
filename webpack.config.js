var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var plugins = [
    new webpack.optimize.CommonsChunkPlugin(
        {
            name: ['zepto'],   // 将公共模块提取
            filename: 'common.js',
            minChunks: Infinity // 提取所有entry公用依赖的模块
        }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
        //$: 'jquery',
        //jQuery: 'jquery',
        //'window.jQuery': 'jquery',
        //'window.$': 'jquery',
        $: 'zepto',
        zepto: 'zepto',
        'window.zepto': 'zepto',
        'window.$': 'zepto'
    }),
    new webpack.IgnorePlugin(/src\/libs\/*/),
    new ExtractTextPlugin('[name].[contenthash:9].css')
];
module.exports = {
    cache: true,
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    // 页面入口文件配置
    entry: {
        whd: 'webpack/hot/dev-server',
        client: 'webpack-dev-server/client?http://localhost:8080',
        'base-url':'./src/js/base-url.js',
        'index': './src/js/index.js',
        'login': './src/js/login.js',
        'mine': './src/js/mine.js',
        'share': './src/js/share.js',
        'together': './src/js/together.js',
        'cloud-config': './src/js/cloud-config.js',
        'opera-log': './src/js/opera-log.js',
        'opera-queue': './src/js/opera-queue.js',
        'system-config': './src/js/system-config.js',
        'authority-manage': './src/js/authority-manage.js',
    },
    // 插件项
    plugins: plugins,
    // 入口文件输出配置
    output: {
        path: __dirname + '/dist/js',
        filename: '[name].js',
        //publicPath: './js/'
        publicPath: '/static/js/m/'
    },
    module: {
        // 加载器配置
        loaders: [
            {test: /\.css$/, loader: 'style!css-loader'},
            {test: /\.js$/, loader: 'babel?presets[]=es2015'},
            {test: /\.less$/, loader: 'style!css!less?sourceMap'},
            {test: /\.(gif|png|jpg|jpeg)$/, loader: 'url?limit=8192&name=images/[name].[ext]'},
            {test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'url'}
        ]
    },
    // 其他解决方案配置
    resolve: {
        root: __dirname,
        extensions: ['', '.js', '.json', '.less'],
        alias: {
            baseURL: 'src/js/base-url.js',
            zepto: 'src/lib/n-zepto.js',
            sm: 'src/lib/smui/sm.min.js',
            smextend: 'src/lib/smui/sm-extend.min.js',
            smPicker: 'src/lib/smui/sm-city-picker.min.js',
            webuploader: 'src/lib/webuploader/js/webuploader.min.js',
        }
    },
    externals: {
        //'$': 'jquery'
        '$': 'zepto'
    }
};
