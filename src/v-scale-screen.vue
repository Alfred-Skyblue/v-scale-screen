<!--
 * @Author: ptyang
 * @Date: 2022/3/14
 * @Description: 大屏自适应容器组件
-->
<template>
  <section class="screen-box" :style="boxStyle">
    <div class="screen-wrapper" ref="screenWrapper" :style="wrapperStyle">
      <slot></slot>
    </div>
  </section>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'

type IAutoScale =
  | boolean
  | {
      x?: boolean
      y?: boolean
    }

/**
 * 防抖函数
 * @param {T} fn
 * @param {number} delay
 * @returns {() => void}
 */
function debounce<T>(fn: T, delay: number): () => void {
  let timer: NodeJS.Timeout
  return function (...args: any[]): void {
    if (timer) clearTimeout(timer)
    timer = setTimeout(
      () => {
        typeof fn === 'function' && fn.apply(null, args)
        clearTimeout(timer)
      },
      delay > 0 ? delay : 100
    )
  }
}

export default Vue.extend({
  name: 'VScaleScreen',
  props: {
    width: {
      type: [String, Number] as PropType<string | number>,
      default: 1920
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: 1080
    },
    fullScreen: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    autoScale: {
      type: [Object, Boolean] as PropType<IAutoScale>,
      default: true
    },
    delay: {
      type: Number as PropType<number>,
      default: 500
    },
    boxStyle: {
      type: Object,
      default: () => ({})
    },
    wrapperStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currentWidth: 0,
      currentHeight: 0,
      originalWidth: 0,
      originalHeight: 0,
      onResize: null as null | (() => void),
      observer: null as null | MutationObserver
    }
  },
  methods: {
    initSize() {
      return new Promise<void>(resolve => {
        this.$nextTick(() => {
          // region 获取大屏真实尺寸
          if (this.width && this.height) {
            this.currentWidth = this.width as number
            this.currentHeight = this.height as number
          } else {
            const screenWrapper = this.$refs['screenWrapper'] as HTMLElement
            this.currentWidth = screenWrapper?.clientWidth
            this.currentHeight = screenWrapper?.clientHeight
          }
          // endregion

          // region 获取画布尺寸
          if (!this.originalHeight || !this.originalWidth) {
            this.originalWidth = window.screen.width
            this.originalHeight = window.screen.height
          }
          // endregion
          resolve()
        })
      })
    },
    updateSize() {
      const screenWrapper = this.$refs['screenWrapper'] as HTMLElement
      if (this.currentWidth && this.currentHeight) {
        screenWrapper.style.width = `${this.currentWidth}px`
        screenWrapper.style.height = `${this.currentHeight}px`
      } else {
        screenWrapper.style.width = `${this.originalWidth}px`
        screenWrapper.style.height = `${this.originalHeight}px`
      }
    },
    handleAutoScale(scale: number) {
      if (!this.autoScale) return
      const screenWrapper = this.$refs['screenWrapper'] as HTMLElement
      const domWidth = screenWrapper.clientWidth
      const domHeight = screenWrapper.clientHeight
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight
      screenWrapper.style.transform = `scale(${scale},${scale})`
      let mx = Math.max((currentWidth - domWidth * scale) / 2, 0)
      let my = Math.max((currentHeight - domHeight * scale) / 2, 0)
      if (typeof this.autoScale === 'object') {
        // @ts-ignore
        !this.autoScale.x && (mx = 0)
        // @ts-ignore
        !this.autoScale.y && (my = 0)
      }
      screenWrapper.style.margin = `${my}px ${mx}px`
    },
    updateScale() {
      const screenWrapper = this.$refs['screenWrapper'] as HTMLElement
      // 获取真实视口尺寸
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight
      // 获取大屏最终的宽高
      const realWidth = this.currentWidth || this.originalWidth
      const realHeight = this.currentHeight || this.originalHeight
      // 计算缩放比例
      const widthScale = currentWidth / +realWidth
      const heightScale = currentHeight / +realHeight
      // 若要铺满全屏，则按照各自比例缩放
      if (this.fullScreen) {
        screenWrapper.style.transform = `scale(${widthScale},${heightScale})`
        return false
      }
      // 按照宽高最小比例进行缩放
      const scale = Math.min(widthScale, heightScale)
      this.handleAutoScale(scale)
    },
    initMutationObserver() {
      const screenWrapper = this.$refs['screenWrapper'] as HTMLElement
      const observer = (this.observer = new MutationObserver(() => {
        this.onResize?.()
      }))

      observer.observe(screenWrapper, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true
      })
    }
  },
  mounted() {
    this.onResize = debounce(async () => {
      await this.initSize()
      this.updateSize()
      this.updateScale()
    }, this.delay)
    this.$nextTick(async () => {
      await this.initSize()
      this.updateSize()
      this.updateScale()
      window.addEventListener('resize', this.onResize!)
      this.initMutationObserver()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize!)
    this.observer?.disconnect()
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
