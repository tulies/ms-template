// @babel/plugin-proposal-decorators
const {
  override,
  addDecoratorsLegacy,
  addLessLoader,
  fixBabelImports, //按需加载配置函数
  // disableEsLint,
  // addBundleVisualizer,
  addWebpackAlias,
  // adjustWorkbox
} = require("customize-cra");

const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const path = require("path");
const myPlugin = [
  new MonacoWebpackPlugin({
    // languages: ["javascript", "css", "html", "json"],
    languages: ["json"],
    features: ["coreCommands", "find"],
  }),
];
module.exports = override(
  // enable legacy decorators babel plugin
  addDecoratorsLegacy(),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    // style: "css",
    style: true, //自动打包相关的样式 默认为 style:'css'
  }),
  // addLessLoader(),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      // modifyVars: { "@primary-color": "#1DA57A" },
    },
  }),
  // disable eslint in webpack
  // disableEsLint()

  // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
  // process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

  // add an alias for "ag-grid-react" imports
  addWebpackAlias({
    // ["ag-grid-react$"]: path.resolve(__dirname, "src/shared/agGridWrapper.js"),
    "@": path.resolve(__dirname, "src"),
  }),

  // adjust the underlying workbox
  // adjustWorkbox(wb =>
  //   Object.assign(wb, {
  //     skipWaiting: true,
  //     exclude: (wb.exclude || []).concat("index.html")
  //   })
  // )

  (config) => {
    //暴露webpack的配置 config ,evn
    // 去掉打包生产map 文件
    // config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
    // if (process.env.NODE_ENV === "production") config.devtool = false;
    // if (process.env.NODE_ENV !== "development")
    config.plugins = [...config.plugins, ...myPlugin];
    //1.修改、添加loader 配置 :
    // 所有的loaders规则是在config.module.rules(数组)的第二项
    // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)
    // 修改 sass 配置 ，规则 loader 在第五项(具体看配置)
    // const loaders = config.module.rules.find((rule) =>
    //   Array.isArray(rule.oneOf)
    // ).oneOf;
    // loaders[5].use.push({
    //   loader: "sass-resources-loader",
    //   options: {
    //     resources: path.resolve(__dirname, "src/asset/base.scss"), //全局引入公共的scss 文件
    //   },
    // });

    return config;
  }
);
