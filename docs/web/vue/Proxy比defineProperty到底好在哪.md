### 对比原因

都说`vue3`的`Proxy`的效率要远远高于`vue2`的`defineProperty`，但是为什么呢？今天就从源码的角度来分析一下。

### 分析

首先我们要想一下，`vue`的响应式系统到底是为了什么？

其实就是当我们读到某个对象的属性的时候，`vue`要知道这个`读`的动作，然后在这之间做一些别的事情。当给对象的属性重新赋值的时候，`vue`也要知道这个`赋值`的动作，再在这之间插上一脚，做一些事情。

但是我们平时对对象的操作，`读取：obj.a`，`赋值：obj.a = 1`，都是直接就操作完成，`vue`监听不到这些动作，所以就需要把`读取`和`赋值`分别变成一个**函数**（getter 和 setter），那么在将来操作对象属性的时候，就可以执行对应的函数了。

在`ES6`之前，没有别的办法，只能通过`defineProperty`来实现

```js
const obj = { a: 1, b: 2 };

let v = obj.a;

Object.defineProperty(obj, 'a', {
  get() {
    console.log('读取属性 a');
    return v;
  },
  set(val) {
    if (val !== v) {
      console.log('属性 a 被更改');
      v = val;
    }
  }
});
```

由于`vue2`是针对属性的监听，那么他就必须要`深度遍历`对象里边的每一个属性;

### vue2 的基本实现

```js
function _isObject(v) {
  return typeof v === 'object' && v !== null;
}

function observe(obj) {
  for (const k in obj) {
    let v = obj[k];
    if (_isObject(v)) {
      observe(v);
    }

    Object.defineProperty(obj, k, {
      get() {
        console.log('读取属性 ', k);
        // do something
        return v;
      },
      set(val) {
        if (val !== v) {
          console.log(k, ' 被更改');
          // do something
          v = val;
        }
      }
    });
  }
}

observe(obj);
```

然而这种做法有一些先天的缺陷：

- 在进行`深度遍历`的时候，会造成性能上有一定的损失；
- 当`observe`执行完毕之后，再`新增`的属性就监听不到了，当然也包括属性的`删除`。

---

### vue3 的基本实现

而到了`vue3`里面，他不再监听没个属性，**而是直接监听整个对象**，那很多事情就变得简单了。

```js
const obj = { a: 1, b: 2 };

function observe(obj) {
  const proxyObj = new Proxy(obj, {
    get(target, k) {
      let v = target[k];
      if (_isObject(v)) {
        v = observe(v);
      }
      console.log(k, '读取');
      return v;
    },
    set(target, k, val) {
      let v = target[k];
      if (target[k] !== val) {
        console.log(k, '被更改');
        target[k] = val;
      }
    },
    deleteProperty() {
      console.log('监听到属性的删除');
    }
  });

  return proxyObj;
}

const newObj = observe(obj);
```

`Proxy`还有很多监听回调，具体可以查看[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy)

由于不是监听的属性，所以也就**不再需要进行`深度遍历`的动作**了，也由于监听了整个对象，那么这个对象的属性的 增加 和 删除 自然也能监听的到了。所以在创建组件实例的时候，`vue3`的效率会比`vue2`高出很多。

::: tip
在上面代码的`第7行`，我们发现是一个`递归`的动作，但是要注意，这个递归并不是一开始就执行，而是当我们读到某一个属性，发现是对象的时候才会去执行，所以并不会对`vue组件实例`创建时有什么影响。
:::
