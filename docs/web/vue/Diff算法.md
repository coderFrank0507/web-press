### v-for中的key是什么作用？

在使用`v-for`进行列表渲染时，我们通常会给元素或者组件绑定一个`key`属性。

这个key属性的作用有什么用？

- key属性主要用在Vue的虚拟`DOM算法`，在`新旧nodes`对比时辨识`VNodes`
- 如果`不使用key`，Vue会使用一种最大限度减少动态元素并且尽可能的尝试就地`修改/复用相同类型元素`的算法
- 而`使用key`时，它会基于key的变化`重新排列元素顺序`，并且会`移除/销毁key`不存在的元素



### Vue中对于列表的更新究竟是如何操作的？

- Vue事实上会对于有key和没有key会调用两个不同的方法
- 有key，那么就使用`patchKeyedChildren`方法
- 没有key，那么久使用`patchUnkeyedChildren`方法

源码截图：

![diff01](/vue/diff/diff01.jpg)



### patchUnkeyedChildren方法

没有`key`的情况相对简单，先看代码注释

![diff02](/vue/diff/diff02.jpg)

- 在没有key的情况下，Vue会对`新旧VNode`依次进行比较，对比Node的类型、内容等信息，当发现有两个Node不同时，变回使用`patch`方法进行更新
- 如果旧的VNodes的长度大于新的VNodes的长度，会直接移除旧的VNodes
- 反之则创建新的VNodes



### patchKeyedChildren方法

`patchKeyedChildren`方法相对复杂，一共分为五步，看代码注释：

![diff03](/vue/diff/diff03.jpg)

![diff04](/vue/diff/diff04.jpg)

![diff05](/vue/diff/diff05.jpg)

![diff06](/vue/diff/diff06.jpg)

![diff07](/vue/diff/diff07.jpg)

![diff08](/vue/diff/diff08.jpg)

![diff09](/vue/diff/diff09.jpg)