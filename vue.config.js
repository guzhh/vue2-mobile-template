const path = require('path');
const { defineConfig } = require('@vue/cli-service');
const CompressionPlugin = require('compression-webpack-plugin');
const packageJson = require('./package.json');

const productionGzipExtensions = ['js', 'css', 'png', 'jpg'];
const isProd = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  publicPath: `/${packageJson.name}/`, // publicPath, // 在文件引用路径前加前缀
  outputDir: packageJson.name, // 打包输出目录
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'));

    // 原svg规则覆盖了所有的svg图标，需要先将自己的svg排除，以应用新的sprite规则
    // src/assets/icons是我们将要存放svg的目录
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, 'src/assets/icons')) // 排除自定义svg目录
      .end();
    config.module
      .rule('icons') // 新规则
      .test(/\.svg$/)
      .include.add(path.join(__dirname, 'src/assets/icons')) // 新规则应用于我们存放svg的目录
      .end()
      .use('svg-sprite-loader') // 用sprite-loader接卸
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.resolve(__dirname, './src/assets/style/variable.less')}";`,
          },
        },
      },
    },
  },
  devServer: {
    port: 7788,
    // proxy: {
    //   [`${process.env.VUE_APP_API_BASE_URL}`]: {
    //     target: 'http://127.0.0.1:9100',
    //     ws: false,
    //     changeOrigin: true,
    //   },
    // },
  },
  configureWebpack: {
    plugins: (() => {
      if (!isProd) {
        return [];
      }
      return [
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`), // 匹配文件名
          threshold: 10240, // 对10K以上的数据进行压缩
          minRatio: 0.8,
          deleteOriginalAssets: false, // 是否删除源文件
        }),
      ];
    })(),
  },
});
