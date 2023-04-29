import {
  CSSProperties,
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  reactive,
  ref
} from 'vue'

/**
 * 防抖函数
 * @param {Function} fn
 * @param {number} delay
 * @returns {() => void}
 */
function debounce(fn: Function, delay: number): () => void {
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

interface IState {
  originalWidth: string | number
  originalHeight: string | number
  width?: string | number
  height?: string | number
  observer: null | MutationObserver
}
type IAutoScale =
  | boolean
  | {
      x?: boolean
      y?: boolean
    }

export default defineComponent({
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
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    wrapperStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    bodyOverflowHidden: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots }) {
    let bodyOverflowHidden: string
    const state = reactive<IState>({
      width: 0,
      height: 0,
      originalWidth: 0,
      originalHeight: 0,
      observer: null
    })

    const styles: Record<string, CSSProperties> = {
      box: {
        overflow: 'hidden',
        backgroundSize: `100% 100%`,
        backgroundColor: `#000`,
        width: `100vw`,
        height: `100vh`
      },
      wrapper: {
        transitionProperty: `all`,
        transitionTimingFunction: `cubic-bezier(0.4, 0, 0.2, 1)`,
        transitionDuration: `500ms`,
        position: `relative`,
        overflow: `hidden`,
        zIndex: 100,
        transformOrigin: `left top`
      }
    }

    const el = ref<HTMLElement>()
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
            state.width = el.value?.clientWidth
            state.height = el.value?.clientHeight
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

    function initBodyStyle() {
      if (props.bodyOverflowHidden) {
        bodyOverflowHidden = document.body.style.overflow
        document.body.style.overflow = 'hidden'
      }
    }
    /**
     * 更新大屏容器宽高
     */
    const updateSize = () => {
      if (state.width && state.height) {
        el.value!.style.width = `${state.width}px`
        el.value!.style.height = `${state.height}px`
      } else {
        el.value!.style.width = `${state.originalWidth}px`
        el.value!.style.height = `${state.originalHeight}px`
      }
    }

    const autoScale = (scale: number) => {
      if (!props.autoScale) return
      const domWidth = el.value!.clientWidth
      const domHeight = el.value!.clientHeight
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight
      el.value!.style.transform = `scale(${scale},${scale})`
      let mx = Math.max((currentWidth - domWidth * scale) / 2, 0)
      let my = Math.max((currentHeight - domHeight * scale) / 2, 0)
      if (typeof props.autoScale === 'object') {
        !props.autoScale.x && (mx = 0)
        !props.autoScale.y && (my = 0)
      }
      el.value!.style.margin = `${my}px ${mx}px`
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
      if (props.fullScreen) {
        el.value!.style.transform = `scale(${widthScale},${heightScale})`
        return false
      }
      // 按照宽高最小比例进行缩放
      const scale = Math.min(widthScale, heightScale)
      autoScale(scale)
    }

    const onResize = debounce(async () => {
      await initSize()
      updateSize()
      updateScale()
    }, props.delay)
    const initMutationObserver = () => {
      const observer = (state.observer = new MutationObserver(() => {
        onResize()
      }))
      observer.observe(el.value!, {
        attributes: true,
        attributeFilter: ['style'],
        attributeOldValue: true
      })
    }
    onMounted(() => {
      initBodyStyle()
      nextTick(async () => {
        await initSize()
        updateSize()
        updateScale()
        window.addEventListener('resize', onResize)
        initMutationObserver()
      })
    })
    onUnmounted(() => {
      window.removeEventListener('resize', onResize)
      state.observer?.disconnect()
      if (props.bodyOverflowHidden) {
        document.body.style.overflow = bodyOverflowHidden
      }
    })

    return () => {
      return h(
        'div',
        {
          className: 'v-screen-box',
          style: { ...styles.box, ...props.boxStyle }
        },
        [
          h(
            'div',
            {
              className: 'screen-wrapper',
              style: { ...styles.wrapper, ...props.wrapperStyle },
              ref: el
            },
            slots.default?.()
          )
        ]
      )
    }
  }
})
