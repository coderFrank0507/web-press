# vue3.5 更新了哪些新功能

## 响应式 Props 解构

Vue 的响应系统基于属性访问跟踪状态的使用情况。例如，在计算属性或侦听器中访问`props.foo`时，`foo`属性将被跟踪为依赖项。

因此，在以下代码的情况下：

```js
const { foo } = defineProps(['foo']);

watchEffect(() => {
  // 在 3.5 之前只运行一次
  // 在 3.5+ 中在 "foo" prop 变化时重新执行
  console.log(foo);
});
```

在 3.4 及以下版本，`foo`是一个实际的常量，永远不会改变。在 3.5 及以上版本，当在同一个`<script setup>`代码块中访问由`defineProps`解构的变量时，Vue 编译器会自动在前面添加`props.`。因此，上面的代码等同于以下代码：

```js{5}
const props = defineProps(['foo'])

watchEffect(() => {
  // `foo` 由编译器转换为 `props.foo`
  console.log(props.foo)
})
```

此外，你可以使用 JavaScript 原生的默认值语法声明 props 默认值。这在使用基于类型的 props 声明时特别有用。

```ts
const { foo = 'hello' } = defineProps<{ foo?: string }>();
```

### 将解构的 props 传递到函数中

当我们将解构的 prop 传递到函数中时，例如：

```js
const { foo } = defineProps(['foo']);

watch(foo, /* ... */);
```

这并不会按预期工作，因为它等价于`watch(props.foo, ...)`——我们给`watch`传递的是一个值而不是响应式数据源。实际上，Vue 的编译器会捕捉这种情况并发出警告。

与使用`watch(() => props.foo, ...)`来侦听普通 prop 类似，我们也可以通过将其包装在 getter 中来侦听解构的 prop：

```js
watch(() => foo, /* ... */);
```

## useId()

用于为无障碍属性或表单元素生成每个应用内唯一的 ID。

- 类型

```ts
function useId(): string
```

- 示例

```vue
<script setup>
import { useId } from 'vue';

const id = useId();
</script>

<template>
  <form>
    <label :for="id">Name:</label>
    <input :id="id" type="text" />
  </form>
</template>
```

- 详细信息

`useId()`生成的每个 ID 在每个应用内都是唯一的。它可以用于为表单元素和无障碍属性生成 ID。在同一个组件中多次调用会生成不同的 ID；同一个组件的多个实例调用`useId()`也会生成不同的 ID。

`useId()`生成的 ID 在服务器端和客户端渲染之间是稳定的，因此可以安全地在 [SSR](https://cn.vuejs.org/guide/scaling-up/ssr) 应用中使用，不会导致激活不匹配。

如果同一页面上有多个 Vue 应用实例，可以通过`app.config.idPrefix`为每个应用提供一个 ID 前缀，以避免 ID 冲突。

## useTemplateRef()

返回一个浅层 ref，其值将与模板中的具有匹配 ref attribute 的元素或组件同步。

- 类型

```ts
function useTemplateRef<T>(key: string): Readonly<ShallowRef<T | null>>
```

- 示例

```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue';

const inputRef = useTemplateRef('input');

onMounted(() => {
  inputRef.value.focus();
})
</script>

<template>
  <input ref="input" />
</template>
```

## onWatcherCleanup()

注册一个清理函数，在当前侦听器即将重新运行时执行。只能在`watchEffect`作用函数或`watch`回调函数的同步执行期间调用 (即不能在异步函数的`await`语句之后调用)。

- 类型

```ts
function onWatcherCleanup(
  cleanupFn: () => void,
  failSilently?: boolean
): void
```

- 示例

```ts
import { watch, onWatcherCleanup } from 'vue';

watch(id, (newId) => {
  const { response, cancel } = doAsyncWork(newId);
  // 如果 `id` 变化，则调用 `cancel`，
  // 如果之前的请求未完成，则取消该请求
  onWatcherCleanup(cancel);
})
```

其实与`watch`的`callback`函数的第三个参数`onCleanup`的功能一致

```js
watch(id, async (newId, oldId, onCleanup) => {
  const { response, cancel } = doAsyncWork(newId);
  // 当 `id` 变化时，`cancel` 将被调用，
  // 取消之前的未完成的请求
  onCleanup(cancel);
  data.value = await response;
})
```