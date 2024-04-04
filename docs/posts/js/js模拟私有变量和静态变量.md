---
title: js模拟私有变量和静态变量
toc: true
keywords: 
 - js私有变量,js静态变量
tags:
  - javascript
categories:
  - javascript
date: 2024-01-23 13:01:21
---

这是一个js类的写法：

```javascript
class Router {
	constructor() {
		this.callBack = () => {};
	}

	beforeEach(callBack) {
		if (callBack instanceof Function) this.callBack = callBack;
	}

	push(to) {
		this.callBack('navigateTo', to);
	}

	redirectTo(to) {
		this.callBack('redirectTo', to);
	}

	reLaunch(to) {
		this.callBack('reLaunch', to);
	}

	switchTab(to) {
		this.callBack('switchTab', to);
	}

	back(delta) {
		// #ifdef H5
		history.back();
		// #endif
		// #ifndef H5
		uni.navigateBack({
			delta
		});
		// #endif
	}
}
export default new Router();
```

<!-- more -->

将这个类转换为函数形式可以是这样的：

```javascript
function createRouter() {

    let callBack = () => {};

    function beforeEach(cb) {
        if (typeof cb === 'function') callBack = cb;
    }

    function push(to) {
        callBack('navigateTo', to);
    }

    function redirectTo(to) {
        callBack('redirectTo', to);
    }

    function reLaunch(to) {
        callBack('reLaunch', to);
    }

    function switchTab(to) {
        callBack('switchTab', to);
    }

    function back(delta) {
        // #ifdef H5
        history.back();
        // #endif
        // #ifndef H5
        uni.navigateBack({
            delta
        });
        // #endif
    }

    return {
        beforeEach,
        push,
        redirectTo,
        reLaunch,
        switchTab,
        back
    };
}

const router = createRouter();
export default router;
```

其中的let callBack = () => {};的callback就是私有变量

## js函数的“私有变量”和“静态变量”

在JavaScript中，函数的"私有变量"和"静态变量"可以通过以下方式来定义：

1. **私有变量**: 这些是在函数内部定义的变量，不能从函数外部访问。它们只存在于函数的执行上下文中。

   ```javascript
   function myFunction() {
       let privateVar = "I'm private!";
       // 这里可以使用 privateVar，但是在函数外部不能访问它。
   }
   ```

2. **静态变量**: JavaScript函数没有像其他语言那样的内置静态变量。但你可**以使用函数的属性来模拟静态变量**。函数在JavaScript中是对象，所以你可以给它们添加属性。

   ```javascript
   function myFunction() {
       if (!myFunction.staticVar) {
           myFunction.staticVar = 1;
       } else {
           myFunction.staticVar++;
       }
       console.log(myFunction.staticVar);
   }
   
   myFunction();  // 输出: 1
   myFunction();  // 输出: 2
   ```

   在上面的例子中，`staticVar` 行为就像一个静态变量，因为它维持了它的值，即使在多次调用 `myFunction` 之间。

另一个模拟静态变量的方法是使用闭包：

```javascript
const myFunction = (function() {
    let staticVar = 0;
    return function() {
        staticVar++;
        console.log(staticVar);
    };
})();

myFunction();  // 输出: 1
myFunction();  // 输出: 2
```

在这个例子中，外部的自执行函数创建了一个闭包，使得内部的 `staticVar` 能够在多次调用 `myFunction` 之间保持它的值。

## prototype和“静态变量”

1. **myFunction.staticVar**:

   这种实际上是在函数对象 `myFunction` 上直接添加了一个属性。这是一个静态属性，可以直接通过函数名来访问它，但它与函数的实例无关。这是模拟静态变量的常见方法。

   ```javascript
   function myFunction() {}
   
   myFunction.staticVar = "I'm a static variable";
   
   console.log(myFunction.staticVar);  // 输出: "I'm a static variable"
   ```

2. **myFunction.prototype.staticVar**:

   表示向 `myFunction` 的原型添加一个属性。这意味着这个属性将被 `myFunction` 的所有实例所共享。当你创建一个新的实例并尝试访问这个属性时，如果该实例本身没有这个属性，它会查找原型链并找到它。

   ```javascript
   function myFunction() {}
   
   myFunction.prototype.staticVar = "I'm a prototype variable";
   
   const instance1 = new myFunction();
   const instance2 = new myFunction();
   
   console.log(instance1.staticVar);  // 输出: "I'm a prototype variable"
   console.log(instance2.staticVar);  // 输出: "I'm a prototype variable"
   
   instance1.staticVar = "Changed for instance1";
   console.log(instance1.staticVar);  // 输出: "Changed for instance1"
   console.log(instance2.staticVar);  // 仍然输出: "I'm a prototype variable"
   ```

   注意，当我们修改 `instance1` 的 `staticVar` 属性时，它实际上是在 `instance1` 上创建了一个新的属性，而原型上的属性仍然没有改变。因此，其他实例（如 `instance2`）的 `staticVar` 属性仍然指向原型上的值。

## 构造函数

在JavaScript中，函数可以用作构造函数来创建对象。当你使用 `new` 关键字调用函数时，该函数将作为构造函数执行。在构造函数内部，`this` 关键字引用新创建的对象。

以下是如何定义 `myFunction` 作为一个构造函数并使用它的示例：

```javascript
function MyFunction(param1, param2) {
    this.param1 = param1;
    this.param2 = param2;

    this.showParams = function() {
        console.log(this.param1, this.param2);
    };
}

// 使用 new 关键字创建一个新的对象
const obj = new MyFunction('value1', 'value2');
obj.showParams();  // 输出: value1 value2
```

在上面的代码中：

- `MyFunction` 是一个构造函数，它接受两个参数：`param1` 和 `param2`。
- 在构造函数内部，我们定义了一个方法 `showParams` 来显示这两个参数的值。
- 使用 `new MyFunction('value1', 'value2')` 创建了一个新的对象，并将构造函数中的 `param1` 和 `param2` 设置为 `value1` 和 `value2`。

注意，按照约定，构造函数的名称通常以大写字母开头，以区分它们和普通函数。所以，`MyFunction` 的首字母是大写的。

此外，为了避免在每次创建新对象时都为 `showParams` 分配新的内存，你可以将其移动到构造函数的原型上：

```javascript
function MyFunction(param1, param2) {
    this.param1 = param1;
    this.param2 = param2;
}

MyFunction.prototype.showParams = function() {
    console.log(this.param1, this.param2);
};

const obj = new MyFunction('value1', 'value2');
obj.showParams();  // 输出: value1 value2
```

这样，所有 `MyFunction` 的实例都会共享同一个 `showParams` 方法，而不是每个实例都有自己的复制。

## 函数私有变量 vs this

在 `myFunction` 函数中，使用 `let` 和 `this` 关键字定义变量的方式有本质上的不同：

1. **使用 `let` 定义的变量（`test1`）**:
   - `test1` 是一个局部变量，它只在 `myFunction` 函数的作用域内可见。它是一个块级作用域的变量，这意味着它的作用域限制在声明它的函数或代码块内。
   - 在函数外部无法访问 `test1`。
   - 如果 `myFunction` 被当作普通函数调用（即非构造函数调用），`test1` 将在函数执行结束后被销毁。
2. **使用 `this` 关键字定义的变量（`test2`）**:
   - `this.test2` 是将 `test2` 属性添加到 `this` 关键字引用的对象上。`this` 的值取决于如何调用 `myFunction`。
   - 如果 `myFunction` 作为构造函数使用（即使用 `new myFunction()`），`this` 将指向新创建的对象实例，`test2` 将成为这个新对象的一个属性。
   - 如果 `myFunction` 作为普通函数调用，`this` 的值取决于运行时上下文（在严格模式下，`this` 会是 `undefined`；在非严格模式下，它通常会是全局对象，例如 `window` 在浏览器环境中）。
   - `this.test2` 的值在函数执行结束后依然存在，只要 `this` 引用的对象依然存在。
