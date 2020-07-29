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
const path = require("path");

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
  })

  // adjust the underlying workbox
  // adjustWorkbox(wb =>
  //   Object.assign(wb, {
  //     skipWaiting: true,
  //     exclude: (wb.exclude || []).concat("index.html")
  //   })
  // )
);
