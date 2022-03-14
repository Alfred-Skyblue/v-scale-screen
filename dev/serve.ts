import Vue, { VNode } from 'vue';
import Dev from './serve.vue';
import './index.css'
Vue.config.productionTip = false;

new Vue({
  render: (h): VNode => h(Dev),
}).$mount('#app');
