---
title: NPM Workspaces简介
toc: true
keywords: 'workspaces,npm,npm包,packages.json,包依赖'
tags:
  - npm
  - workspaces
categories:
  - 前端基础
abbrlink: 923ed035
date: 2021-09-01 19:13:16
---

> npm在2020年10月发布的版本开始支持一个新功能：Workspaces


### Workspaces是什么？

`Workspaces`即工作区，可以帮我们管理包含多个`包（package）`的项目，这些项目（称为monorepo）可能包含多个`package.json`，而Workspaces可以方便的对这类项目进行管理。

<!-- more -->

### 举例说明
一个简单的多包依赖项目的例子如下：
```javascript
├── index.js
├── package.json
└── packages
    ├── packageA
    │   ├── index.js
    │   └── package.json # Dependencies: `vuepress`,`packageB`
    └── packageB
        ├── index.js
        └── package.json # Dependencies: `vuepress`, `packageA`
```

当我们在根目录运行`npm install` 或 `yarn install`的时候，npm会在根文件的`node_modules`下创建彼此的符号链接，以便package能够引入，如下：
```javascript
├── node_modules # 根文件 node_modules
│   ├── vuepress # 依赖的vuepress
│   ├── packageA # 符号链接包A
│   └── packageB # 符号链接包B
```
### 配置和使用

在根项目目录下的`packages.json`中配置`workspaces`关键字：
```javascript
"workspaces": [
    "packages/*",
  ],
```
子包中的`package.json`添加`dependencies`对其它包的依赖
然后运行npm，则可以在子包中非常方便的使用本地依赖库了。

### 其它用法

```javascript
# Run "test" script on all packages
npm run test --workspaces
npm run test  -ws

# Runs "test" only on packageA
npm run test --workspace packageA
npm run test -w packageB

# Install `lodash` on `packageA`
npm install lodash --workspace packageA

# Install `tap` on `packageB` as a dev dependency
npm install tap --workspace packageB --save-dev

# Install `packageA` on `packageB`
npm install packageA --workspace packageB

# Install `eslint` in all packages
npm install eslint --workspaces
```


### npm 工作区 与 Yarn 工作区
Yarn中也有命令来管理workspaces,
例如： 
```shell
yarn workspace <workspace> add <dependency>
```

### 使用 Lerna
使用 npm workspaces 和 yarn workspaces 虽然可以管理一些monorepos
但对于一些更大的项目来说，它包含更多的依赖树，这时可能就要使用类似[Lerna](https://github.com/lerna/lerna)这样的管理工具了。
Lerna 有很多命令来管理大型的monorepo。
在[VuePress](https://github.com/vuepress/vuepress-next)项目中结合使用了这两个功能，读者可以参考其用法。

### 参考
> [NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
[Getting Started with npm Workspaces](https://ruanmartinelli.com/posts/npm-7-workspaces-1)
[Vuepress repository](https://github.com/vuepress/vuepress-next)
