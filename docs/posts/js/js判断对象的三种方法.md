---
title: js判断对象的三种方法
toc: true
keywords: 
 - js,js对象判断
tags:
  - javascript
categories:
  - javascript
date: 2024-01-23 21:01:21
---

1. **使用 `typeof` 和 `null` 检查**:

   `typeof` 运算符对于对象（包括函数和数组）都会返回 `'object'`。但是，`null` 也被认为是一个对象类型，所以需要额外检查。

   ```javascript
   function isObject(value) {
       return value !== null && typeof value === 'object';
   }
   ```

2. **使用 `Object.prototype.toString.call()`**:

   这是一个更精确的方法，可以区分对象、数组、函数和null。

   ```javascript
   function isObject(value) {
       return Object.prototype.toString.call(value) === '[object Object]';
   }
   ```

   使用这种方法，只有普通对象会返回 `true`。如果你希望数组和函数也被认为是对象，你可以进一步修改这个函数。

   <!-- more -->

3. **使用 `instanceof`**:

   这个方法可以检查一个对象是否是另一个对象的实例。但是，由于JavaScript的原型继承，这种方法可能不总是很准确。

   ```javascript
   function isObject(value) {
       return value instanceof Object;
   }
   ```

   注意：这会对任何从 `Object` 构造函数或任何其他构造函数（如 `Array`、`Function`）派生出来的对象返回 `true`。

在大多数情况下，第二种方法 (`Object.prototype.toString.call()`) 是最准确和最常用的。但选择哪种方法取决于你的具体需求和你希望如何定义"对象"。
