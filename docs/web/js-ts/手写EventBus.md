# 手写EventBus

```js
class EventBus {
  constructor() {
    this.eventBus = {};
  }

  on(eventName, eventCallback, thisArg) {
    let handlers = this.eventBus[eventName];
    if (!handlers) {
      handlers = [];
      this.eventBus[eventName] = handlers;
    }
    handlers.push({ eventCallback, thisArg });
  }

  off(eventName, eventCallback) {
    const handlers = this.eventBus[eventName];
    if (!handlers) return;
    // 防止 [fn1, fn2, fn3, fn4, fn2] 这种情况，如果不拷贝新数组，最后一个 fn2 有可能删不掉
    const newHandlers = [...handlers];
    for (let i = 0; i < newHandlers.length; i++) {
      const handler = newHandlers[i];
      if (handler.eventCallback === eventCallback) {
        const index = handlers.indexOf(handler);
        handlers.splice(index, 1);
      }
    }
  }

  emit(eventName, ...payload) {
    const handlers = this.eventBus[eventName];
    if (!handlers) return;
    handlers.forEach((handler) => {
      handler.eventCallback.apply(handler.thisArg, payload);
    });
  }
}

/* ================== use ================== */

const eventBus = new EventBus();

// main.js
eventBus.on(
  'abc',
  function (value) {
    console.log('监听abc1', value, this);
  },
  { name: 'frank' }
);

const handleCallback = function () {
  console.log('监听abc2', this);
};
eventBus.on('abc', handleCallback, { name: 'frank' });

// utils.js
eventBus.emit('abc', 123);

// 移除监听
eventBus.off('abc', handleCallback);
eventBus.emit('abc', 123);

```