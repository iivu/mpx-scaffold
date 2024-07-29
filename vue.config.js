const { defineConfig } = require('@vue/cli-service');

const { projectConfig } = require('./configs');

module.exports = defineConfig({
  outputDir: `dist/${process.env.MPX_CURRENT_TARGET_MODE}`,
  pluginOptions: {
    mpx: {
      plugin: {
        srcMode: 'wx',
        hackResolveBuildDependencies: ({ files, resolveDependencies }) => {
          const path = require('path');
          const packageJSONPath = path.resolve('package.json');
          if (files.has(packageJSONPath)) files.delete(packageJSONPath);
          if (resolveDependencies.files.has(packageJSONPath)) {
            resolveDependencies.files.delete(packageJSONPath);
          }
        },
        defs: {
          __APP_MODE__: process.env.APP_MODE,
          __APP_API_PREFIX: projectConfig.apiPrefix,
          __APP_CDN__: projectConfig.cdn,
        },
      },
      loader: {},
      unocss: {},
      urlLoader: {
        name: 'img/[name][hash].[ext]',
        publicPath: projectConfig.cdn,
        limit: '1024',
        publicPathScope: 'all',
        outputPathCDN: './cdn-assets',
      },
    },
  },
  /**
   * 如果希望node_modules下的文件时对应的缓存可以失效，
   * 可以将configureWebpack.snap.managedPaths修改为 []
   */
  configureWebpack(config) {},
});
