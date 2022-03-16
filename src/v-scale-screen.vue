<!--
 * @Author: ptyang
 * @Date: 2022/3/14
 * @Description: 大屏自适应容器组件
-->
<template>
  <section class="screen-box">
    <div class="screen-wrapper" ref="screenWrapper">
      <slot></slot>
    </div>
  </section>
</template>
<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  reactive,
  ref,
} from '@vue/composition-api'
import { useEventListener, useDebounceFn, useMutationObserver } from '@vueuse/core'
interface IState {
  originalWidth: string | number
  originalHeight: string | number
  width?: string | number
  height?: string | number
}
type IAutoScale = boolean | {
  x?:boolean
  y?:boolean
}

export default defineComponent({
  name: 'VScaleScreen',
  props: {
    width:{
      type: [String, Number] as PropType<string | number>,
      default: 1920
    },
    height:{
      type: [String, Number] as PropType<string | number>,
      default: 1080
    },
    fullScreen:{
      type: Boolean as PropType<boolean>,
      default: false
    },
    autoScale: {
      type: [Object,Boolean] as PropType<IAutoScale>,
      default: true
    },
    delay:{
      type: Number as PropType<number>,
      default: 500
    }
  },
  setup(props){

    const state = reactive<IState>({
      width: 0,
      height: 0,
      originalWidth: 0,
      originalHeight: 0
    })
    const screenWrapper = ref<HTMLElement>()
    /**
     * 初始化大屏容器宽高
     */
    const initSize = () => {
      return new Promise<void>(resolve => {
        nextTick(() => {
          // region 获取大屏真实尺寸
          if (props.width && props.height) {
            state.width = props.width
            state.height = props.height
          } else {
            state.width = screenWrapper.value?.clientWidth
            state.height = screenWrapper.value?.clientHeight
          }
          // endregion

          // region 获取画布尺寸
          if (!state.originalHeight || !state.originalWidth) {
            state.originalWidth = window.screen.width
            state.originalHeight = window.screen.height
          }
          // endregion
          resolve()
        })
      })
    }

    /**
     * 更新大屏容器宽高
     */
    const updateSize = () => {
      if (state.width && state.height) {
        screenWrapper.value!.style.width = `${state.width}px`
        screenWrapper.value!.style.height = `${state.height}px`
      } else {
        screenWrapper.value!.style.width = `${state.originalWidth}px`
        screenWrapper.value!.style.height = `${state.originalHeight}px`
      }
    }

    const autoScale = (scale:number) => {
      if (!props.autoScale) return
      const domWidth = screenWrapper.value!.clientWidth
      const domHeight = screenWrapper.value!.clientHeight
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight
      // 宽度大于设计稿宽度时，按照比例居中显示
      screenWrapper.value!.style.transform = `scale(${scale},${scale})`
      // 宽度大于设计稿宽度时，按照比例居中显示
      let mx = Math.max((currentWidth - domWidth * scale) / 2, 0)
      let my = Math.max((currentHeight - domHeight * scale) / 2, 0)
      if (typeof props.autoScale === 'object') {
        !props.autoScale.x && (mx = 0)
        !props.autoScale.y && (my = 0)
      }
      screenWrapper.value!.style.margin = `${my}px ${mx}px`
    }
    const updateScale = () => {
      // 获取真实视口尺寸
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight
      // 获取大屏最终的宽高
      const realWidth = state.width || state.originalWidth
      const realHeight = state.height || state.originalHeight
      // 计算缩放比例
      const widthScale = currentWidth / +realWidth
      const heightScale = currentHeight / +realHeight
      // 若要铺满全屏，则按照各自比例缩放
      if (props.fullScreen){
        screenWrapper.value!.style.transform = `scale(${widthScale},${heightScale})`
        return false
      }
      // 按照宽高最小比例进行缩放
      const scale = Math.min(widthScale, heightScale)
      autoScale(scale)
    }

    const onResize = useDebounceFn(async () => {
      await initSize()
      updateSize()
      updateScale()
    }, props.delay)
    const initMutationObserver = () => {
      useMutationObserver(screenWrapper, () => {
        onResize()
      },{
        attributes:true,
        attributeFilter:['style'],
        attributeOldValue:true
      })
    }
    onMounted( () => {
      nextTick(async() => {
        await initSize()
        updateSize()
        updateScale()
        useEventListener('resize', onResize)
        initMutationObserver()
      })
    })


    return {  screenWrapper }
  }
})
//
</script>

<style scoped>
.screen-box {
  overflow: hidden;
  background-size: 100% 100%;
  background: #000;
  width: 100vw;
  height: 100vh;
}

.screen-box .screen-wrapper {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
  position: relative;
  overflow: hidden;
  z-index: 100;
  transform-origin: left top;
}
</style>
