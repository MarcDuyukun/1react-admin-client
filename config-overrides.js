// const { override, fixBabelImports} = require('customize-cra');

// module.exports = function override(config, env) {
//   // do stuff with the webpack config...
//   return config;
// };
// module.exports = override(
//   fixBabelImports('import', {//配置babel-plugin-import
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     style: 'css',//自动打包相关的css 写true是是加载less 写‘css’加载css
//   }),
// );
const { override, fixBabelImports,addLessLoader,addBabelPlugins} = require('customize-cra');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
module.exports = override(
  addLessLoader(),
  ...addBabelPlugins( // 支持装饰器
    [
      '@babel/plugin-proposal-decorators',
      { legacy: true}
    ]
  ),
  fixBabelImports('import', {//配置babel-plugin-import
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',//自动打包相关的css 写true是是加载less 写‘css’加载css
  }),
);

