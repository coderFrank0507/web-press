### 什么是生成器？

- 生成器是 ES6 中新增的一种函数控制、使用的方案，它可以让我们更加灵活的控制函数什么时候继续执行、暂停执行等。

- 平时我们会编写很多的函数，这些函数终止的条件通常是返回值或者发生了异常。

- 生成器函数也是一个函数，但是和普通的函数有一些区别：
  - 首先，生成器函数需要在`function`的后面加一个符号：`*`
  - 其次，生成器函数可以通过 yield 关键字来控制函数的执行流程：
  - 最后，生成器函数的返回值是一个 Generator（生成器）：
    - 生成器事实上是一种特殊的迭代器；
    - MDN：Instead, they return a special type of iterator, called a **Generator**.

### 生成器函数执行

- 我们发现上面的生成器函数`foo`的执行体压根没有执行，它只是返回了一个生成器对象。
  - 那么我们如何可以让它执行函数中的东西呢？调用`next`即可；
  - 我们之前学习迭代器时，知道迭代器的`next`是会有返回值的；
  - 但是我们很多时候不希望`next`返回的是一个`undefined`，这个时候我们可以通过`yield`来返回结果；

```js
function* foo() {
  console.log('函数开始执行~');
  const value1 = 100;
  console.log(value1);
  yield value1;

  const value2 = 200;
  console.log(value2);
  yield value2;

  const value3 = 300;
  console.log(value3);
  yield value3;

  console.log('函数结束执行');
}

const generator = foo();

console.log(generator.next()); // { value: 100, done: false }
console.log(generator.next()); // { value: 200, done: false }
console.log(generator.next()); // { value: 300, done: false }
console.log(generator.next()); // { value: undefined, done: true }
```

### 生成器传递参数 – next 函数

- 函数既然可以暂停来分段执行，那么函数应该是可以传递参数的，我们是否可以给每个分段来传递参数呢？
  - 答案是可以的；
  - 我们在调用`next`函数的时候，可以给它传递参数，那么这个参数会作为上一个`yield`语句的返回值；
  - 注意：也就是说我们是为本次的函数代码块执行提供了一个值；

```js
function* foo(initial) {
  console.log('函数开始执行~');
  const value1 = yield initial + 'aaa';
  const value2 = yield value1 + 'bbb';
  const value3 = yield value2 + 'ccc';
}

const generator = foo('frank');
const result1 = generator.next();
console.log('result1:', result1); // { value: 'frankaaa', done: false }
const result2 = generator.next(result1.value);
console.log('result2:', result2); // { value: 'frankaaabbb', done: false }
const result3 = generator.next(result2.value);
console.log('result3:', result3); // { value: 'frankaaabbbccc', done: false }
```

### 生成器提前结束 – return 函数

- 还有一个可以给生成器函数传递参数的方法是通过`return`函数：
  - `return`传值后这个生成器函数就会结束，之后调用`next`不会继续生成值了；

```js
function* foo() {
  const value1 = yield 'frank';
  console.log('value1:', value1);
  const value2 = yield value1;
  const value3 = yield value2;
}

const generator = foo();
console.log(generator.next()); // { value: 'frank', done: false }
console.log(generator.return(123)); // { value: 123, done: true }
console.log(generator.next()); // { value: undefined, done: true }
```

### 生成器抛出异常 – throw 函数

- 除了给生成器函数内部传递参数之外，也可以给生成器函数内部抛出异常：
  - 抛出异常后我们可以在生成器函数中捕获异常；
  - 但是在`catch`语句中不能继续`yield`新的值了，但是可以在`catch`语句外使用`yield`继续中断函数的执行；

```js
function* foo() {
  console.log('函数开始执行');

  try {
    yield 'frank';
  } catch (error) {
    console.log('内部捕获异常：', error);
  }

  yield 2222;

  console.log('函数结束执行');
}

const generator = foo();
const result = generator.next();
generator.throw('error message');

console.log(generator.next());
```

### 生成器替代迭代器

- 我们发现生成器是一种特殊的迭代器，那么在某些情况下我们可以使用生成器来替代迭代器：

```js
function* createArrayIterator(arr) {
  for (const item of arr) {
    yield item;
  }
}

const names = ['abc', 'cba', 'nba'];
const namesIterator = createArrayIterator(names);
console.log(namesIterator.next()); // { value: 'abc', done: false }
console.log(namesIterator.next()); // { value: 'cba', done: false }
console.log(namesIterator.next()); // { value: 'nba', done: false }
console.log(namesIterator.next()); // { value: undefined, done: true }
```

```js
function* createRangeIterator(start, end) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

const rangeIterator = createRangeIterator(10, 20);
console.log(rangeIterator.next()); // { value: 10, done: false }
console.log(rangeIterator.next()); // { value: 11, done: false }
console.log(rangeIterator.next()); // { value: 12, done: false }
console.log(rangeIterator.next()); // { value: 13, done: false }
```

- 事实上我们还可以使用`yield*`来生产一个可迭代对象：
  - 这个时候相当于是一种`yield`的语法糖，只不过会依次迭代这个可迭代对象，每次迭代其中的一个值；

```js
function* createArrayIterator(arr) {
  yield* arr;
}
```

### 自定义类迭代 – 生成器实现

- 在之前的自定义类迭代中，我们也可以换成生成器：

```js
class Classroom {
  constructor(name, address, initialStudent) {
    this.name = name;
    this.address = address;
    this.initialStudent = initialStudent;
  }

  push(student) {
    this.students.push(student);
  }

  *[Symbol.iterator]() {
    yield* this.students;
  }
}
```

### 对生成器的操作

- 既然生成器是一个迭代器，那么我们可以对其进行如下的操作：

```js
const namesIterator1 = createArrayIterator(names);
for (const item of namesIterator1) {
  console.log(item);
}

const namesIterator2 = createArrayIterator(names);
const set = new Set(namesIterator2);
console.log(set);

const namesIterator3 = createArrayIterator(names);
Promise.all(namesIterator3).then((res) => {
  console.log(res);
});
```

### 异步处理方案

- 需求：
  - 我们需要向服务器发送网络请求获取数据，一共需要发送三次请求；
  - 第二次的请求`url`依赖于第一次的结果；
  - 第三次的请求`url`依赖于第二次的结果；
  - 依次类推；

```js
function requestData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url);
    }, 2000);
  });
}
```

```js
function getData() {
  requestData('frank').then((res1) => {
    requestData(res1 + 'aaa').then((res2) => {
      requestData(res2 + 'bbb').then((res3) => {
        console.log('res3:', res3);
      });
    });
  });
}
```

```js
function getData() {
  requestData('frank')
    .then((res1) => {
      return requestData(res1 + 'aaa');
    })
    .then((res2) => {
      return requestData(res2 + 'bbb');
    })
    .then((res3) => {
      console.log('res3:', res3);
    });
}
```

### Generator 方案

- 但是上面的代码其实看起来也是阅读性比较差的，有没有办法可以继续来对上面的代码进行优化呢？

```js
function* getData() {
  const res1 = yield requestData('frank');
  const res2 = yield requestData(res1 + 'aaa');
  const res3 = yield requestData(res2 + 'bbb');
  const res4 = yield requestData(res3 + 'ccc');
  console.log(res4);
}
```

```js
const generator = getData();
generator.next().value.then((res) => {
  generator.next().value.then((res) => {
    generator.next().value.then((res) => {
      generator.next(res);
    });
  });
});
```

### 自动执行 generator 函数

- 目前我们的写法有两个问题：

  - 第一，我们不能确定到底需要调用几层的`Promise`关系；
  - 第二，如果还有其他需要这样执行的函数，我们应该如何操作呢？

- 所以，我们可以封装一个工具函数 execGenerator 自动执行生成器函数：

```js
function execGenerator(genFn) {
  const generator = genFn();
  function exec(res) {
    const result = generator.next(res);
    if (result.done) return result.value;
    result.value.then((res) => {
      exec(res);
    });
  }
  exec();
}
```
