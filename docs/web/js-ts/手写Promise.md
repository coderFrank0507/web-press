# 手写 Promise

#### 什么是 Promise？

Promise 其实有两层含义，一个是`Promise A+`规范，一个是`ES6 Promise`。

::: tip
`Promise A+`指的是社区规范，它的出现要早于`ES6 Promise`，目的是为了解决回调地狱，以及异步实现不统一的问题。

官方地址 [点击进入](https://promisesaplus.com/)
:::

**`Promise A+`的官方解释基本可以概括为：**

- `Promise`就是一个带有`then`方法的东西，可以是`对象`，也可以是`方法`。例如`jQuery`中的`$.ajax()`返回的`Promise`就是它自己实现的一个`Promise`
- 只要你的代码满足规范，就可以和其他满足规范的代码进行`互操作`

**`ES6 Promise`:**

- `ES6`中增加了一个`Promise`的构造函数，其实这也是对`Promise A+`规范的实现。
- 在这基础上还增加了`catch`，`finally`等其它一些`静态方法`

#### 自定义实现

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function runMicrotasks(fn) {
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(fn);
  } else if (typeof process === 'function' && typeof process.nextTick === 'function') {
    process.nextTick(fn);
  } else if (typeof MutationObserver === 'function') {
    const text = document.createTextNode('');
    const observer = new MutationObserver(fn);
    observer.observe(text, { characterData: true });
    text.data = '1';
  } else {
    setTimeout(fn);
  }
}

function isPromiseLike(obj) {
  return typeof obj?.then === 'function';
}

class MyPromise {
  #state = PENDING;
  #value;
  #handlers = [];

  constructor(executor) {
    const resolve = (val) => {
      this.#setState(FULFILLED, val);
    };
    const reject = (reason) => {
      this.#setState(REJECTED, reason);
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  #setState(state, value) {
    if (this.#state !== PENDING) return;
    this.#value = value;
    this.#state = state;

    this.#runTask();
  }

  #runTask() {
    runMicrotasks(() => {
      if (this.#state !== PENDING) {
        this.#handlers.forEach((cb) => cb());
        this.#handlers = [];
      }
    });
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push(() => {
        try {
          const cb = this.#state === FULFILLED ? onFulfilled : onRejected;
          const res = typeof cb === 'function' ? cb(this.#value) : this.#value;
          if (isPromiseLike(res)) {
            res.then(resolve, reject);
          } else {
            resolve(res);
          }
        } catch (error) {
          reject(error);
        }
      });

      this.#runTask();
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (res) => {
        onFinally();
        return res;
      },
      (err) => {
        onFinally();
        throw err;
      }
    );
  }
}

const p = new MyPromise((resolve, reject) => {
  reject(1);
});

p.catch((err) => {
  console.log('err', err);
  return 2;
}).then((res) => {
  console.log(res);
});

// (async () => {
//   const res = await p;
//   console.log('await', res);
// })();

// const p1 = p.then(() => {
//   return new MyPromise((resolve) => {
//     resolve(2);
//   });
// });

// p1.then((res) => {
//   console.log('p1', res);
// });

console.log('end');

// p.then((res) => {
//   console.log('第二个', res);
// });
```
