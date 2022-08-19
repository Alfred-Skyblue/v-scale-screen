declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<
    {
      width: number
    },
    {},
    any
  >
  export default component
}
