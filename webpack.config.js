const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html'
})

module.exports = {
  mode: 'development',
  // 有两个可选值development和production
  entry: path.join(__dirname,'./src/index.js'),      // 指定入口文件,__dirname代表根目录
  devServer: {
    static: {
        directory: path.join(__dirname,'./'),
        watch: true
    }
  },
  output: {
    path: path.join(__dirname,'./dist'),  // 输出文件的存放路径
    filename: 'bundle.js' // 指定文件名以创建
  },      // 指定出口文件
  plugins: [htmlPlugin, new VueLoaderPlugin()],
  module: {
    rules: [
      {test: /\.css$/,use: ['style-loader','css-loader','postcss-loader']},
      {test: /\.less$/,use: ['style-loader','css-loader','less-loader']},
      {test: /\.scss$/,use: ['style-loader','css-loader','scss-loader']},
      {test: /\.(jpg|png|gif|webp|bmp|ttf|eot|svg|woff|woff2)$/,
      type: 'javascript/auto',
      use: {
        loader: 'url-loader',
        options: {
          name: 'img/[name]_[hash:6].[ext]',
          esModule: false
        }
      }},
      {test: /\.js$/,use: 'babel-loader',exclude: /node_modules/ },
      {test: /\.vue$/, loader: 'vue-loader'}
    ]
  }
}
