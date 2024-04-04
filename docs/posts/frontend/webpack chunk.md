---
title: webpack chunk
date: 2024-03-27 03:48:36
tags:
 - webpack
categories: frontend
---


## 动态查找入口文件

### 动态查找以 `index` 开头的 `.js` 文件

要查找 `src` 目录及其子目录下所有以 `index` 开头的 `.js` 文件，我们需要递归地遍历目录。这里是一个使用 Node.js 脚本来实现这个需求的示例：

```javascript
const fs = require('fs');
const path = require('path');

// 递归地查找文件
function findFiles(directory, pattern) {
  let results = [];
  const files = fs.readdirSync(directory, { withFileTypes: true });

  files.forEach((dirent) => {
    const fullPath = path.join(directory, dirent.name);
    if (dirent.isDirectory()) {
      results = [...results, ...findFiles(fullPath, pattern)]; // 递归查找
    } else if (pattern.test(dirent.name)) {
      results.push(fullPath);
    }
  });

  return results;
}

// 定义入口目录和匹配模式
const srcDirectory = path.resolve(__dirname, 'src');
const pattern = /^index.*\.js$/; // 匹配以 'index' 开头的 .js 文件

// 动态构建入口对象
const entryFiles = findFiles(srcDirectory, pattern);
const entry = entryFiles.reduce((entries, file) => {
  const name = file.replace(srcDirectory, '').replace(/^\/+/, '').replace(/\.js$/, '');
  entries[name] = file;
  return entries;
}, {});

// Webpack 配置
const webpackConfig = {
  entry: entry,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // 其他配置...
};
```

这段代码会递归地查找所有符合模式的文件，并为它们每一个构建一个入口。

### 默认的入口文件 `index.js` 输出为 `main.js`

当你没有在 webpack 配置中明确指定输出文件的名称时，webpack 使用默认的输出配置。在很多情况下，如果你的入口点是单一的且未指定输出文件名，webpack 会将这个入口点的输出文件命名为 `main.js`。这是因为 webpack 的默认入口键名是 `main`。

如果你想要自定义输出文件名，你可以在 `output` 配置的 `filename` 属性中使用占位符，如 `[name].js`，这样输出文件名就会基于入口点的键名。在上面的例子中，我们已经通过动态构建入口对象并设置 `filename: '[name].bundle.js'` 来实现了这一点，其中 `[name]` 会被替换成入口对象键名，从而控制输出文件的名称。

<!-- more -->

## chunk bundle的区别
在 webpack 的上下文中，"chunk" 和 "bundle" 是两个核心概念，它们在构建过程中扮演着不同的角色。理解它们之间的区别对于有效地使用 webpack 和优化你的构建输出非常重要。

### Chunk

"Chunk" 是 webpack 内部处理模块的一个中间步骤。在 webpack 处理你的应用程序时，它会从一个或多个入口点开始，解析你的项目中的模块依赖关系，这些模块被组织成了多个 chunk。Chunk 是模块的物理或逻辑集合，它们表示了如何将代码分割和组合在一起。

Chunk 有几种类型：

- **入口 Chunk（Entry Chunk）**：对应于一个入口点。它包含了从该入口点开始依赖的所有模块。
- **普通 Chunk（Normal Chunk）**：通过代码分割创建的 chunk，可以是由于动态导入（例如，使用 `import()`）或通过配置分割代码产生的。
- **运行时 Chunk（Runtime Chunk）**：包含了 webpack 的运行时和模块加载器的代码，负责加载和解析 chunk。
- **供应商 Chunk（Vendor Chunk）**：通常包含来自 `node_modules` 目录的第三方库。

### Bundle

"Bundle" 是 webpack 构建过程的最终产物，是将一个或多个 chunk 经过打包、优化和压缩后生成的文件。每个 bundle 文件都是可以直接在浏览器中加载的资源。简单来说，bundle 是最终被浏览器使用的代码文件，它可能包含了一个或多个 chunk 的代码。

### 区别

- **Chunk** 是 webpack 处理过程中的一个概念，它代表了代码的中间状态。Chunk 描述了不同的代码块如何被组织和分割，它是优化构建结果、实现代码分割和懒加载的关键。
- **Bundle** 是最终输出的文件，是可以在浏览器中直接使用的静态资源。每个 bundle 通常包含了一个或多个 chunk 的代码。

### 为什么这个区别重要

- **性能优化**：通过理解 chunk 和 bundle 的概念，你可以更好地控制代码的分割和加载，比如通过懒加载来减少初始加载时间，或者将第三方库代码分割到单独的 bundle 中以提高缓存利用率。
- **构建配置**：webpack 配置中的很多选项，如 `splitChunks` 和 `runtimeChunk`，都是围绕如何生成和管理 chunk 设计的。理解这些概念可以帮助你更有效地配置这些选项，从而优化构建输出。

总的来说，chunk 是 webpack 内部的代码组织单位，而 bundle 是最终给浏览器使用的输出文件。理解它们之间的区别和联系对于有效地使用 webpack 来说是非常重要的。

## chunks的几个值

在 webpack 的 `splitChunks` 配置中，`chunks` 选项决定了哪些 chunk 会被选中用于优化。设置为 `'all'` 意味着所有类型的 chunk（包括异步和非异步的）都将被考虑用于分割。这是一个重要的配置，因为它允许 webpack 对入口（initial）、异步（async）和所有导入的模块进行分割，从而优化整个项目的 chunk。

### `chunks: 'all'` 的具体含义：

- **`'async'`（默认值）**：仅分割那些动态导入的模块。这是用于按需加载时的默认行为。
- **`'initial'`**：仅分割那些初始加载时就需要的模块，即入口点开始的同步导入。
- **`'all'`**：无论模块是动态还是静态导入，都将进行分割。使用这个选项可以更细致地控制网页的加载时间，通过将第三方库（通常较大且不常改变）分割到独立的 bundle 中，来利用浏览器缓存和减少初始加载时间。

当设置为 `'all'` 时，结合 `cacheGroups` 配置，webpack 会更智能地决定如何最好地分割代码，以便于实现更有效的代码分割策略。例如，你可以将来自 `node_modules` 的代码分割到一个单独的 bundle 中，同时还可以决定哪些是你的应用代码中需要同步加载的部分，哪些是可以异步加载的部分，从而使得初始页面加载更快，同时提供按需加载的代码分割功能。

使用 `chunks: 'all'` 配置是优化大型应用加载性能的一个常见策略，它有助于实现精细的资源控制和更高效的浏览器缓存利用。

## commons chunk解析

这段配置定义了一个名为 `commons` 的 `cacheGroup`，它是 webpack 的 `splitChunks` 插件的一部分。`splitChunks` 插件用于优化代码，通过分割 chunks 来减少加载时间和提升缓存利用率。这个特定的 `commons` 配置旨在提取和分离那些跨多个入口 chunk 共享的模块。下面是这个配置每个选项的详细解释：

### `chunks: "initial"`

- 这个选项指定了插件应该选择哪些 chunks 来寻找共享的模块。设置为 `"initial"` 意味着只考虑初始加载时需要的 chunks（即那些通过入口点引入的同步加载模块），而不考虑异步加载的模块（如通过 `import()` 动态导入的模块）。

### `minChunks: 2`

- 这个选项指定了一个模块必须被多少个不同的 chunks 引用才能被提取到 `commons` chunk 中。设置为 `2` 意味着只有当一个模块至少被两个不同的入口 chunk 引用时，它才会被提取出来。这有助于避免单独为仅被一个入口使用的模块创建额外的 chunk，从而减小总体积。

### `maxInitialRequests: 5`

- 这个选项限制了每个入口点的初始页面加载时应该产生的最大请求数量。它是为了进一步控制 HTTP 请求的数量，提升页面加载性能。`5` 表示每个入口点在加载时，最多只能有 5 个并行的请求用于加载初始 chunks。

### `minSize: 0`

- 这个选项指定了被提取的模块的最小大小（以字节为单位）。设置为 `0` 意味着即使模块很小，也会被提取出来，如果它们满足其他条件（如 `minChunks`）。这有助于确保即使是非常小的共享模块也能被提取和重用，尽管这可能会导致生成更多的 chunks。

### 总结

这个 `commons` 配置通过识别和提取那些在初始加载时被两个或更多入口共享的模块，帮助减少重复代码和优化代码的加载。它特别关注于初始加载性能，通过限制请求数量和允许提取小模块来提升用户体验。这种配置对于有多个入口点并且有共享依赖的大型应用来说尤其有用。

## 使用`webpack-bundle-analyzer` 分析 bundle


- 使用 `webpack-bundle-analyzer` 插件来分析你的 bundle。这个工具可以帮助你可视化和理解你的 bundle 包含哪些模块，以及它们是如何被打包在一起的。
- 安装 `webpack-bundle-analyzer` 并在 webpack 配置中添加它，以查看详细的打包信息。

### 示例 `webpack-bundle-analyzer` 配置：

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // 其他配置...
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
};
```

运行 webpack 构建后，`webpack-bundle-analyzer` 将会在浏览器中打开一个包含你所有 bundle 详细信息的页面，从中你可以看到是否有 `lodash` 相关的 chunk 被创建，以及它们的大小和包含的模块。

### 结论

如果以上步骤仍未能解决问题，可能需要更具体地审查项目的整体配置和代码结构。有时候，问题的根源可能与特定的项目设置或者代码中不易察觉的细节有关。


## webpack.conf.js示例

```javascript
const path = require("path")
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // 其他配置...
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
};

// // 使用 glob 搜索所有以 'index' 开头的 js 文件
const entryFiles = glob.sync(path.resolve(__dirname, 'src/**/index*.js'));
const entries = entryFiles.reduce((entries, file) => {
  // 生成每个入口的键名，去掉 src/ 前缀并将斜杠替换为下划线
  // 这是为了确保键名的唯一性和文件名的有效性
  const entryKey = file
    .replace(path.resolve(__dirname, 'src/') + '/', '')
    .replace(/\.js$/, '')
    .replace(/\//g, '_');
  // console.log("entryKey", entryKey, "file", file)
  entries[entryKey] = file;
  return entries;
}, {});

console.log(entries)

// entries是个对象
module.exports = {
  entry: entries,
  // entry: "./src/index.js",
  mode: "development",
  devtool: false,
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: '[name].chunk.[contenthash].js', // 用于非入口的 chunk 文件
    path: path.join(__dirname, "./dist"),
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    // 使用 CleanWebpackPlugin
    new CleanWebpackPlugin(),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 2, 
          maxInitialRequests: 5,
          minSize:0, 
        },
        lodash: {
          // 可以分离出lodash
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          name: 'lodash',
          chunks: 'all',
        },
        vendors: {
          // 这里打开能分离出vendors-other
          // test: /[\\/]node_modules[\\/]/,
          // 现在这样无法分离出lodash之外的vendor（我index.js除了lodash还引用了moment），
          // 而是将moment放在了和index.js一起
          test:  /[\\/]node_modules[\\/](?!lodash)[\\/]/,
          name: 'vendor-other',
          chunks: 'all',
          enforce: true
        },
      },
      // chunks: 'all', // 这将会自动分割第三方库（node_modules里的库）和你的异步模块到不同的 chunk
    },
  },

};
```

```javascript

// src/a.js
export default 'a module';

// src/index.js
import name from './a'
import moment from 'moment';
import debounce from 'lodash/debounce'


console.log(_.join(['Hello', 'webpack'], ' '));
console.log("The current date and time is: ", moment().format('YYYY-MM-DD HH:mm:ss'));

console.log(name)
console.log(12)


// src/index-1.js

import name from './a'
console.log(name, "index-1")
```