# ElementPlus颜色工具

#### 使用：

```ts
function themeColorChange(color: string) {
  const appDom = document.getElementById("app");
  appDom.style.setProperty("--el-color-primary", color);
  appDom.style.setProperty("--el-color-primary-dark-2", ColorTool.darken(color, 0.2));
  for (let c = 1; c <= 9; c++) {
    appDom.style.setProperty(`--el-color-primary-light-${c}`, ColorTool.lighten(color, c / 10));
  }
  appDom.style.setProperty(`--el-color-primary-darken-1`, ColorTool.darken(color, 0.1));
}
```

#### 工具实现：

```ts
class ColorTool {
  //hex颜色转rgb颜色
  static HexToRgb(str: string) {
    str = str.replace('#', '');
    const hxs: any = str.match(/../g);
    for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
    return hxs;
  }
  //rgb颜色转hex颜色
  static RgbToHex(a: number, b: number, c: number) {
    const hexs = [a.toString(16), b.toString(16), c.toString(16)];
    for (let i = 0; i < 3; i++) {
      if (hexs[i].length == 1) hexs[i] = '0' + hexs[i];
    }
    return '#' + hexs.join('');
  }
  //加深
  static darken(color: string, level: number) {
    const rgbc = this.HexToRgb(color);
    for (let i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
    return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
  }
  //变淡
  static lighten(color: string, level: number) {
    const rgbc = this.HexToRgb(color);
    for (let i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]);
    return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
  }
}
```

#### 效果：

`element`的`css`变量分`9`个层级，循环使用`darken`和`lighten`函数，传入不同`level`，获得`9`个不同色阶的色值

<div style="display: flex; column-gap: 6px">
  <div style="width: 40px; height: 40px; background: #53a7ff"></div>
  <div style="width: 40px; height: 40px; background: #66b1ff"></div>
  <div style="width: 40px; height: 40px; background: #79bbff"></div>
  <div style="width: 40px; height: 40px; background: #8cc4ff"></div>
  <div style="width: 40px; height: 40px; background: #9fceff"></div>
  <div style="width: 40px; height: 40px; background: #b2d8ff"></div>
  <div style="width: 40px; height: 40px; background: #c5e1ff"></div>
  <div style="width: 40px; height: 40px; background: #d8ebff"></div>
  <div style="width: 40px; height: 40px; background: #ebf5ff"></div>
</div>