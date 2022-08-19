

## v-scale-screen

大屏自适应容器组件，可用于大屏项目开发，实现屏幕自适应，可根据宽度自适应，高度自适应，和宽高等比例自适应，全屏自适应（会存在拉伸问题）

> 注：vue2请使用0.1.1版本，vue3请使用1.0.0以上版本

+ 仓库地址：[github](https://github.com/Alfred-Skyblue/v-scale-screen)
+ 国内地址：[gitee](https://gitee.com/yuan_fangY/v-scale-screen)
### 图例

![图例](./src/assets/scale_screen.gif)






### 安装

```bash
npm install v-scale-screen@0.1.1
# or 
yarn add v-scale-screen@0.1.1
```
> 注：vue2请使用0.1.1版本、vue2请使用0.1.1版本、vue2请使用0.1.1版本，重要的事情说三遍

#### vue2


在vue2中我们使用插件方式导出，故而需要 Vue.use() 进行注册
```js
// main.js
import Vue from "vue";
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
> 注：使用时请将 `body` 样式设置为 `overflow: hidden;`
> 注：使用时请将 `body` 样式设置为 `overflow: hidden;`
> 注：使用时请将 `body` 样式设置为 `overflow: hidden;`

#### Vue3

我们在vue3中以组件方式导出
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
import { defineComponent } from "vue"
import VScaleScreen from 'v-scale-screen'

export default defineComponent({
  name:'Demo',
  components:{
    VScaleScreen
  }
})
</script>
```
> 注：使用时请将 `body` 样式设置为 `overflow: hidden;`
> 注：使用时请将 `body` 样式设置为 `overflow: hidden;`
> 注：使用时请将 `body` 样式设置为 `overflow: hidden;`
### API
| 属性         | 说明                                                                                     | 类型                               | 默认值                   |
|------------|----------------------------------------------------------------------------------------|----------------------------------|-----------------------|
| width      | 大屏宽度                                                                                   | Number                           | String                | 1920 |
| height     | 大屏高度                                                                                   | Number                           | String                | 1080 |
| autoScale  | 自适应配置，配置为boolean类型时，为启动或者关闭自适应，配置为对象时，若x为true，x轴产生边距，y为true时，y轴产生边距，启用fullScreen时此配置失效 | Boolean or {x:boolean,y:boolean} | true                     |
| delay      | 窗口变化防抖延迟时间                                                                             | Number                           | 500                   |
| fullScreen | 全屏自适应，启用此配置项时会存在拉伸效果，同时autoScale失效，非必要情况下不建议开启                                         | Boolean                          | false                 |

