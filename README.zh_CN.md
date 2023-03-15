## v-scale-screen

大屏自适应容器组件，可用于大屏项目开发，实现屏幕自适应，可根据宽度自适应，高度自适应，和宽高等比例自适应，全屏自适应（会存在拉伸问题）

> 在 2.2.0 以上的版本中，我们同时支持 Vue>=v3或 Vue >=2.7，如果你的项目是vue2.6版本以下，那么使用1.x版本


- 仓库地址：[github](https://github.com/Alfred-Skyblue/v-scale-screen)
- 国内地址：[gitee](https://gitee.com/yuan_fangY/v-scale-screen)

### 图例

![图例](./src/assets/scale_screen.gif)

### 安装

```bash
npm install v-scale-screen
# or
yarn add v-scale-screen
```


#### vue2.6 版本

在 vue2 中我们使用插件方式导出，故而需要 Vue.use() 进行注册

```js
// main.js
import Vue from 'vue'
import VScaleScreen from 'v-scale-screen'

Vue.use(VScaleScreen)
```

```vue
<template>
  <v-scale-screen width="1920" height="1080">
    <div>
      <v-chart>....</v-chart>
      <v-chart>....</v-chart>
      <v-chart>....</v-chart>
      <v-chart>....</v-chart>
      <v-chart>....</v-chart>
    </div>
  </v-scale-screen>
</template>
```


#### Vue3 or Vue2.7 版本

// body 默认样式 overflow: hidden;
我们在 vue3 中以组件方式导出

```vue
<template>
  <v-scale-screen width="1920" height="1080">
    <div>
      <v-chart>....</v-chart>
      <v-chart>....</v-chart>
      <v-chart>....</v-chart>
      <v-chart>....</v-chart>
      <v-chart>....</v-chart>
    </div>
  </v-scale-screen>
</template>

<script>
import { defineComponent } from 'vue'
import VScaleScreen from 'v-scale-screen'

export default defineComponent({
  name: 'Demo',
  components: {
    VScaleScreen
  }
})
</script>
```

> 注：使用时请将 `body` 样式设置为 `overflow: hidden;`
> 注：使用时请将 `body` 样式设置为 `overflow: hidden;`
> 注：使用时请将 `body` 样式设置为 `overflow: hidden;`

### API

| 属性                 | 说明                                                                                                 | 类型                               | 默认值   |
|--------------------|----------------------------------------------------------------------------------------------------|----------------------------------|-------|
| width              | 大屏宽度                                                                                               | `Number` or `String`             | 1920  |
| height             | 大屏高度                                                                                               | `Number` or `String`             | 1080  |
| autoScale          | 自适应配置，配置为 boolean 类型时，为启动或者关闭自适应，配置为对象时，若 x 为 true，x 轴产生边距，y 为 true 时，y 轴产生边距，启用 fullScreen 时此配置失效 | Boolean or {x:boolean,y:boolean} | true  |
| delay              | 窗口变化防抖延迟时间                                                                                         | Number                           | 500   |
| fullScreen         | 全屏自适应，启用此配置项时会存在拉伸效果，同时 autoScale 失效，非必要情况下不建议开启                                                   | Boolean                          | false |
| boxStyle           | 修改容器样式，如居中展示时侧边背景色，符合 Vue 双向绑定 style 标准格式                                                          | Object                           | null  |
| wrapperStyle       | 修改自适应区域样式，符合 Vue 双向绑定 style 标准格式                                                                   | Object                           | null  |
| bodyOverflowHidden | 启用后body的样式会自动设置为 `overflow: hidden`                                                                  | Boolean                          | true  |
