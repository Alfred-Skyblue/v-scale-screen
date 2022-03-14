import _Vue, { PluginObject } from 'vue';
import VueCompositionAPI from '@vue/composition-api'

_Vue.use(VueCompositionAPI)
// Import vue component
import component from '@/v-scale-screen.vue';

// Define typescript interfaces for installable component
type InstallableComponent = typeof component & PluginObject<any>;

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
export default /*#__PURE__*/((): InstallableComponent => {
  // Assign InstallableComponent type
  const installable = component as unknown as InstallableComponent;

  // Attach install function executed by Vue.use()
  installable.install = (Vue: typeof _Vue) => {
    Vue.component('VScaleScreen', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
