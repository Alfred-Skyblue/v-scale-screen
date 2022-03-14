## v-scale-screen

大屏自适应容器组件，可用于大屏项目开发，实现屏幕自适应，可根据宽度自适应，高度自适应，和宽高等比例自适应，全屏自适应（会存在拉伸问题）

+ 仓库地址：[github](https://github.com/Alfred-Skyblue/v-scale-screen)
+ 国内地址：[gitee](https://gitee.com/yuan_fangY/v-scale-screen)
### 图例

![图例](./dev/assets/images/scale_screen.gif)

### 安装

```bash
npm install v-scale-screen --save
# or 
yarn add v-scale-screen
```

### 引入

```js
// main.js
import VScaleScreen from 'v-scale-screen'
Vue.use(VScaleScreen)
```

### 使用

```vue
<v-scale-screen width="1080" height="1920">
  
</v-scale-screen>
```


### API
| 属性        | 说明                                                                  | 类型              | 默认值                      |
|-----------|---------------------------------------------------------------------|-----------------|--------------------------|
| width     | 大屏宽度                                                                | Number \|String         | 1920 |
| height   | 大屏高度                                                     | Number \|String | 1080 |
| autoScale | 自适应配置，配置为boolean类型时，为启动或者关闭自适应，配置为对象时，若x为true，x轴产生边距，y为true时，y轴产生边距，启用fullScreen时此配置失效 | boolean\|{x:number,y:number} | true                     |
| delay     | 窗口变化防抖延迟时间                                                          | Number          | 500                      |
| fullScreen | 全屏自适应，启用此配置项时会存在拉伸效果，同时autoScale失效，非必要情况下不建议开启 | boolean | false |

